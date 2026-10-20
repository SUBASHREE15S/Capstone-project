from collections import deque

class RippleEngine:

    def __init__(self, graph):
        self.graph = graph

    def simulate(self, start_requirement):

        visited = set()

        queue = deque()

        ripple = []

        queue.append((start_requirement, 0, 1.0))

        visited.add(start_requirement)

        while queue:

            node, level, weight = queue.popleft()

            ripple.append({

                "requirement": node,

                "level": level,

                "weight": round(weight, 2)

            })

            for neighbour in self.graph.successors(node):

                if neighbour not in visited:

                    visited.add(neighbour)

                    # Get the edge weight between the current node and the neighbour
                    edge_weight = self.graph.edges[node, neighbour].get("weight", 1.0)

                    queue.append(

                        (
                            neighbour,
                            level + 1,
                            edge_weight
                        )

                    )

        return ripple
