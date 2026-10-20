import networkx as nx

class RequirementInfluence:

    def __init__(self, graph):
        self.graph = graph

    def calculate(self):

        influence_data = []

        total_nodes = max(len(self.graph.nodes()), 1)

        # Handle edge case where graph is empty to prevent NetworkX crashes
        if len(self.graph.nodes()) == 0:
            return influence_data

        # Calculate centralities safely
        try:
            centrality_map = nx.degree_centrality(self.graph)
        except Exception:
            centrality_map = {node: 0.0 for node in self.graph.nodes()}

        try:
            pagerank_map = nx.pagerank(self.graph)
        except Exception:
            # Fallback if pagerank convergence fails
            pagerank_map = {node: 1.0 / total_nodes for node in self.graph.nodes()}

        try:
            betweenness_map = nx.betweenness_centrality(self.graph)
        except Exception:
            betweenness_map = {node: 0.0 for node in self.graph.nodes()}

        for node in self.graph.nodes():

            # Incoming dependencies
            in_degree = self.graph.in_degree(node)

            # Outgoing dependencies
            out_degree = self.graph.out_degree(node)

            # Centrality metrics
            centrality = centrality_map.get(node, 0.0)
            pagerank = pagerank_map.get(node, 0.0)
            betweenness = betweenness_map.get(node, 0.0)

            influence_score = (

                0.30 * centrality +

                0.30 * pagerank +

                0.20 * betweenness +

                0.20 * ((in_degree + out_degree) / total_nodes)

            )

            influence_score = round(influence_score * 100, 2)

            influence_data.append({

                "requirement_id": node,

                "in_degree": in_degree,

                "out_degree": out_degree,

                "centrality": round(centrality, 2),

                "pagerank": round(pagerank, 2),

                "betweenness": round(betweenness, 2),

                "influence_score": influence_score

            })

        influence_data.sort(

            key=lambda x: x["influence_score"],

            reverse=True

        )

        return influence_data
