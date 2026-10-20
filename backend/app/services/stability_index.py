# Placeholder for Python script
from typing import List, Dict
import networkx as nx
from app.algorithms.dynamic_rsi import DynamicRSI
from app.algorithms.historical_drift import HistoricalDrift
from app.algorithms.volatility import RequirementVolatility
from app.algorithms.conflict_severity import ConflictSeverity


class RequirementStabilityIndex:

    def __init__(self, graph: nx.DiGraph):
        self.graph = graph
        self.drsi_engine = DynamicRSI()
        self.drift_engine = HistoricalDrift()
        self.volatility_engine = RequirementVolatility()
        self.conflict_engine = ConflictSeverity()

    def calculate_stability(self, requirements: List[Dict], db_session = None) -> List[Dict]:
        """
        Calculate Requirement Stability Index (RSI) using DynamicRSI
        """

        results = []

        for req in requirements:

            requirement_id = req["requirement_id"]

            # Calculate dependency confidence from graph weights
            incoming_weights = [self.graph.edges[u, v].get("weight", 0.8) for u, v in self.graph.in_edges(requirement_id)]
            outgoing_weights = [self.graph.edges[u, v].get("weight", 0.8) for u, v in self.graph.out_edges(requirement_id)]
            all_weights = incoming_weights + outgoing_weights
            dependency_confidence = sum(all_weights) / len(all_weights) if all_weights else 0.80

            # Fallback to sensible defaults
            volatility = 0.12
            historical_drift = 0.18
            conflict_severity = 0.31

            if db_session:
                try:
                    from app.database.schema import RequirementHistory, RequirementMetrics
                    # Count of modifications
                    mod_count = db_session.query(RequirementHistory).filter_by(requirement_id=requirement_id).count()
                    volatility = self.volatility_engine.calculate(mod_count, 100) # Assuming 100 project days

                    # Calculate drift from history if it exists
                    history_items = db_session.query(RequirementHistory).filter_by(requirement_id=requirement_id).all()
                    if history_items:
                        last_item = history_items[-1]
                        historical_drift = self.drift_engine.calculate(last_item.old_requirement, last_item.new_requirement)
                    else:
                        historical_drift = 0.0
                        
                    conflict_severity = 0.0
                except Exception:
                    pass

            semantic_consistency = round(1.0 - historical_drift, 3)
            if semantic_consistency < 0:
                semantic_consistency = 0.0

            stability = self.drsi_engine.calculate(
                semantic_consistency=semantic_consistency,
                dependency_confidence=dependency_confidence,
                volatility=volatility,
                conflict_severity=conflict_severity,
                historical_drift=historical_drift
            )

            results.append({
                "requirement_id": requirement_id,
                "description": req["description"],
                "module": req["module"],
                "stability_score": stability,
                "risk_level": self.get_risk_level(stability),
                "stability_status": self.drsi_engine.classify(stability),
                "metrics": {
                    "semantic_consistency": semantic_consistency,
                    "dependency_confidence": dependency_confidence,
                    "volatility": volatility,
                    "historical_drift": historical_drift,
                    "conflict_severity": conflict_severity
                }
            })

            # Save/Update metrics in database if session is active
            if db_session:
                try:
                    from app.database.schema import RequirementMetrics as DBRequirementMetrics
                    db_metric = db_session.query(DBRequirementMetrics).filter_by(requirement_id=requirement_id).first()
                    if not db_metric:
                        db_metric = DBRequirementMetrics(requirement_id=requirement_id)
                        db_session.add(db_metric)
                    
                    db_metric.semantic_consistency = semantic_consistency
                    db_metric.dependency_confidence = dependency_confidence
                    db_metric.volatility = volatility
                    db_metric.historical_drift = historical_drift
                    db_metric.conflict_severity = conflict_severity
                    db_metric.dynamic_rsi = stability
                    db_metric.stability_status = self.drsi_engine.classify(stability)
                    db_session.commit()
                except Exception:
                    db_session.rollback()

        return results

    def get_risk_level(self, stability):

        if stability >= 0.80:
            return "Low"

        elif stability >= 0.60:
            return "Medium"

        return "High"