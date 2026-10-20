import math


class DynamicRSI:

    def __init__(self):
        pass

    def calculate(
            self,
            semantic_consistency,
            dependency_confidence,
            volatility,
            conflict_severity,
            historical_drift):

        numerator = (
            semantic_consistency *
            dependency_confidence
        )

        denominator = (
            1 +
            volatility +
            conflict_severity +
            historical_drift
        )

        drsi = numerator / denominator

        return round(drsi, 4)

    def classify(self, drsi):

        if drsi >= 0.80:
            return "Highly Stable"

        elif drsi >= 0.60:
            return "Stable"

        elif drsi >= 0.40:
            return "Moderately Stable"

        elif drsi >= 0.20:
            return "Unstable"

        else:
            return "Highly Unstable"
