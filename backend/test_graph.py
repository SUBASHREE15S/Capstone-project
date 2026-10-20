import sys
import os

# Ensure the app folder is in the search path for imports
sys.path.append(os.path.join(os.path.dirname(os.path.abspath(__file__)), "app"))

from algorithms.adaptive_dependency_graph import AdaptiveDependencyGraph
from utils.graph_visualizer import GraphVisualizer

requirements = [

    "User shall login using OTP",

    "Customer authentication using mobile verification",

    "User can reset password",

    "Admin approves payment",

    "Customer payment verification"

]

graph_engine = AdaptiveDependencyGraph()

graph_engine.build_graph(requirements)

graph = graph_engine.get_graph()

GraphVisualizer.draw(graph)
