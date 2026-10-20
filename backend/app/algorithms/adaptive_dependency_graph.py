import networkx as nx

try:
    from app.AI_ENGINE.semantic_similarity import SemanticSimilarity
    from app.algorithms.dependency_confidence import DependencyConfidence
except ImportError:
    try:
        from AI_ENGINE.semantic_similarity import SemanticSimilarity
        from algorithms.dependency_confidence import DependencyConfidence
    except ImportError:
        import sys
        import os
        sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
        from AI_ENGINE.semantic_similarity import SemanticSimilarity
        from algorithms.dependency_confidence import DependencyConfidence


class AdaptiveDependencyGraph:

    def __init__(self):

        self.graph = nx.DiGraph()

        self.similarity_engine = SemanticSimilarity()

        self.confidence_engine = DependencyConfidence()

    def add_requirement(self, requirement):

        self.graph.add_node(requirement)

    def build_graph(self, requirements):

        for req in requirements:
            self.add_requirement(req)

        for i in range(len(requirements)):
            for j in range(i + 1, len(requirements)):

                similarity = self.similarity_engine.similarity(
                    requirements[i],
                    requirements[j]
                )

                confidence = self.confidence_engine.calculate(
                    similarity,
                    historical_score=0.90,
                    priority=0.95
                )

                if confidence > 0.65:

                    self.graph.add_edge(
                        requirements[i],
                        requirements[j],
                        weight=round(confidence, 3)
                    )

    def update_requirement(self, old_req, new_req):

        if old_req not in self.graph:
            return

        neighbors = list(self.graph.successors(old_req))

        self.graph.remove_node(old_req)

        self.graph.add_node(new_req)

        for neighbor in neighbors:

            similarity = self.similarity_engine.similarity(
                new_req,
                neighbor
            )

            confidence = self.confidence_engine.calculate(
                similarity,
                0.90,
                0.95
            )

            if confidence > 0.65:

                self.graph.add_edge(
                    new_req,
                    neighbor,
                    weight=confidence
                )

    def get_graph(self):

        return self.graph
