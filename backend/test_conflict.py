import sys
import os

sys.path.append(os.path.join(os.path.dirname(os.path.abspath(__file__)), "app"))

from algorithms.conflict_propagation import ConflictPropagation
from algorithms.impact_score import ImpactScore
from algorithms.resolution_priority import ResolutionPriority
from algorithms.adaptive_dependency_graph import AdaptiveDependencyGraph


requirements=[

"User Login",

"Authentication",

"Payment",

"Invoice",

"Notification"

]

graph_engine=AdaptiveDependencyGraph()

graph_engine.build_graph(requirements)

graph=graph_engine.get_graph()

engine=ConflictPropagation(graph)

affected=engine.propagate(

"User Login"

)

impact_engine=ImpactScore()

priority_engine=ResolutionPriority()

for req in affected:

    impact=impact_engine.calculate(

        req["impact_probability"],

        dependency_count=4,

        volatility=0.2,

        business_priority=0.9

    )

    priority=priority_engine.recommend(

        impact,

        severity=1.3

    )

    print(req)

    print("Impact:",impact)

    print("Priority:",priority)

    print("-------------------")
