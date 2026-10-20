# Placeholder for Python script
from typing import Dict, List
from app.services.dependency_graph import RequirementDependencyGraph


class ImpactPredictionEngine:

    def __init__(self, graph: RequirementDependencyGraph):
        self.graph = graph

    def predict_impact(self,
                       requirement_id: str,
                       new_requirement: str) -> Dict:
        """
        Predict the impact of a changed requirement.
        """

        # Get affected requirements
        affected_requirements = self.graph.get_affected_requirements(
            requirement_id
        )

        # Always include the modified requirement
        affected_requirements.append(requirement_id)

        # Remove duplicates
        affected_requirements = list(set(affected_requirements))

        # Determine affected modules
        affected_modules = self.get_affected_modules(
            affected_requirements
        )

        # Calculate risk
        risk_score = self.calculate_risk(
            len(affected_requirements),
            len(affected_modules)
        )

        # Estimate effort
        effort = self.estimate_effort(risk_score)

        return {
            "affected_requirements": affected_requirements,
            "affected_modules": affected_modules,
            "risk_score": risk_score,
            "estimated_effort": effort
        }

    def get_affected_modules(
            self,
            affected_requirements: List[str]):

        modules = set()

        for req in affected_requirements:

            if req in self.graph.graph.nodes:

                node = self.graph.graph.nodes[req]

                modules.add(node["module"])

        return list(modules)

    def calculate_risk(
            self,
            total_requirements,
            total_modules):

        score = (total_requirements * 15) + (total_modules * 20)

        if score > 100:
            score = 100

        return score

    def estimate_effort(self, risk):

        if risk >= 80:
            return "High"

        elif risk >= 50:
            return "Medium"

        return "Low"


# ----------------------------------------------------
# Helper function used by FastAPI
# ----------------------------------------------------

_graph_engine = None


def initialize_graph(graph):
    """
    Initialize graph once during startup.
    """
    global _graph_engine
    _graph_engine = ImpactPredictionEngine(graph)


def predict_impact(requirement_id, new_requirement):
    """
    Function called by impact.py API
    """

    if _graph_engine is None:

        return {
            "affected_requirements": [],
            "affected_modules": [],
            "risk_score": 0,
            "estimated_effort": "Unknown"
        }

    return _graph_engine.predict_impact(
        requirement_id,
        new_requirement
    )