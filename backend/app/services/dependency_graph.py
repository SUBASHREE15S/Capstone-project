# Placeholder for Python script
import networkx as nx
from typing import List, Dict
from app.algorithms.adaptive_dependency_graph import AdaptiveDependencyGraph


class RequirementDependencyGraph(AdaptiveDependencyGraph):

    def __init__(self):
        super().__init__()

    def build_graph(self, requirements: List[Dict]):
        """
        Build dependency graph from extracted requirements.
        """

        # Add nodes
        for req in requirements:
            self.graph.add_node(
                req["requirement_id"],
                description=req["description"],
                module=req["module"],
                actor=req["actor"],
                priority=req["priority"]
            )

        if not requirements:
            return self.graph

        # Batch encode descriptions for high performance
        from sklearn.metrics.pairwise import cosine_similarity
        descriptions = [req["description"] for req in requirements]
        embeddings = self.similarity_engine.model.encode(descriptions)

        # Add edges based on semantic dependency rules using pre-computed embeddings
        for i in range(len(requirements)):
            for j in range(i + 1, len(requirements)):

                req1 = requirements[i]
                req2 = requirements[j]

                # Map priority to a numeric value for the confidence formula
                priority_map = {
                    "High": 0.9,
                    "Medium": 0.8,
                    "Low": 0.7
                }
                priority_val = priority_map.get(req2["priority"], 0.7)

                emb1 = embeddings[i].reshape(1, -1)
                emb2 = embeddings[j].reshape(1, -1)
                semantic_score = float(cosine_similarity(emb1, emb2)[0][0])

                confidence = self.confidence_engine.calculate(
                    semantic_score,
                    0.8,
                    priority_val
                )

                if confidence > 0.65:
                    self.graph.add_edge(
                        req1["requirement_id"],
                        req2["requirement_id"],
                        dependency="Semantic Dependency",
                        weight=confidence
                    )

        return self.graph

    def get_dependencies(self):

        dependencies = []

        for source, target, data in self.graph.edges(data=True):

            dependencies.append(
                {
                    "source": source,
                    "target": target,
                    "type": data.get("dependency", "Semantic Dependency"),
                    "weight": data.get("weight", 1.0)
                }
            )

        return dependencies

    def get_affected_requirements(self, requirement_id: str):
        """
        Find all dependent requirements.
        """

        affected = list(nx.descendants(self.graph, requirement_id))

        return affected

    def get_graph_statistics(self):

        return {
            "total_requirements": self.graph.number_of_nodes(),
            "total_dependencies": self.graph.number_of_edges(),
            "isolated_requirements": list(nx.isolates(self.graph))
        }