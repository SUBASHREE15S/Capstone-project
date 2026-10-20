import networkx as nx

class ConflictPropagation:

    def __init__(self, graph):

        self.graph = graph

    def propagate(self, changed_requirement):

        affected = []

        queue = [(changed_requirement,1.0)]

        visited = set()

        while queue:

            node,probability = queue.pop(0)

            if node in visited:
                continue

            visited.add(node)

            affected.append({

                "requirement":node,

                "impact_probability":round(probability,3)

            })

            if node in self.graph:
                for neighbor in self.graph.successors(node):

                    # Use weight if it exists, otherwise default to 0.8
                    weight = self.graph[node][neighbor].get("weight", 0.8)

                    queue.append(
                        (
                            neighbor,
                            probability*weight
                        )
                    )

        return affected
