import matplotlib.pyplot as plt
import networkx as nx
import os


class GraphVisualizer:

    @staticmethod
    def draw(graph):

        pos = nx.spring_layout(graph)

        weights = nx.get_edge_attributes(
            graph,
            'weight'
        )

        plt.figure(figsize=(12,8))

        nx.draw_networkx(
            graph,
            pos,
            with_labels=True,
            node_size=2500,
            font_size=9
        )

        nx.draw_networkx_edge_labels(
            graph,
            pos,
            edge_labels=weights
        )

        plt.title("Adaptive Requirement Dependency Graph")

        # Save figure to file so it is viewable
        backend_dir = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
        output_dir = os.path.join(backend_dir, "graphs")
        os.makedirs(output_dir, exist_ok=True)
        save_path = os.path.join(output_dir, "adaptive_graph.png")
        plt.savefig(save_path)
        print(f"Saved graph visualization to {save_path}")

        try:
            plt.show()
        except Exception as e:
            print(f"Could not show plot interactively (normal in headless environments): {e}")
