import pandas as pd
from sklearn.ensemble import RandomForestClassifier


class RequirementEvolutionPredictor:

    def __init__(self):

        self.model = RandomForestClassifier(
            n_estimators=200,
            random_state=42
        )

    def train(self, dataset):

        X = dataset[[
            "semantic_consistency",
            "dependency_confidence",
            "volatility",
            "historical_drift",
            "conflict_severity"
        ]]

        y = dataset["changed"]

        self.model.fit(X, y)

    def predict(

            self,

            semantic_consistency,

            dependency_confidence,

            volatility,

            historical_drift,

            conflict_severity):

        sample=[[
            semantic_consistency,
            dependency_confidence,
            volatility,
            historical_drift,
            conflict_severity
        ]]

        probability=self.model.predict_proba(sample)[0][1]

        return round(probability,3)
