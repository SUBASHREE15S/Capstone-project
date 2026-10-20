import sys
import os
import pandas as pd

# Add app to search path
sys.path.append(os.path.join(os.path.dirname(os.path.abspath(__file__)), "app"))

from AI_ENGINE.evolution_predictor import RequirementEvolutionPredictor

dataset = pd.read_csv(
    "database/requirement_history.csv"
)

predictor = RequirementEvolutionPredictor()

predictor.train(dataset)

probability = predictor.predict(
    semantic_consistency=0.72,
    dependency_confidence=0.84,
    volatility=0.32,
    historical_drift=0.26,
    conflict_severity=0.31
)

print("Future Change Probability:", probability)
