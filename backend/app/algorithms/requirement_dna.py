import networkx as nx

class RequirementDNA:

    def __init__(self, graph):
        self.graph = graph

    def calculate_complexity(self, description):

        words = len(description.split())

        conditions = 0

        keywords = [
            "if",
            "when",
            "unless",
            "while",
            "after",
            "before",
            "until",
            "otherwise"
        ]

        for word in description.lower().split():
            if word in keywords:
                conditions += 1

        score = (words / 30) + (conditions * 0.1)

        return round(min(score, 1.0), 2)


    def business_criticality(self, priority):

        priority = priority.lower()

        if priority == "high":
            return 0.90

        elif priority == "medium":
            return 0.60

        else:
            return 0.30


    def dependency_score(self, requirement_id):

        if requirement_id not in self.graph:

            return 0.0

        degree = (
            self.graph.in_degree(requirement_id)
            +
            self.graph.out_degree(requirement_id)
        )

        total = max(len(self.graph.nodes) - 1, 1)

        return round(min(degree / total, 1.0), 2)


    def generate(
            self,
            requirements,
            semantic_consistency,
            historical_drift,
            conflict_severity):

        dna = []

        for req in requirements:

            dependency = self.dependency_score(
                req["requirement_id"]
            )

            complexity = self.calculate_complexity(
                req["description"]
            )

            business = self.business_criticality(
                req["priority"]
            )

            dna.append({

                "requirement_id":
                    req["requirement_id"],

                "description":
                    req["description"],

                "semantic_score":
                    semantic_consistency,

                "dependency_score":
                    dependency,

                "conflict_score":
                    conflict_severity,

                "volatility_score":
                    historical_drift,

                "complexity_score":
                    complexity,

                "business_criticality":
                    business,

                "priority":
                    req["priority"]

            })

        return dna
