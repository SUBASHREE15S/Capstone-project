class ExplainabilityEngine:

    def generate_explanation(
        self,
        requirement,
        semantic_consistency,
        dependency_confidence,
        volatility,
        historical_drift,
        conflict_severity,
        drsi,
        change_probability
    ):
        explanations = []

        if semantic_consistency < 0.80:
            explanations.append(
                f"Semantic consistency is low ({semantic_consistency:.2f}), indicating the requirement meaning has shifted."
            )
        else:
            explanations.append(
                f"Semantic consistency is high ({semantic_consistency:.2f}), showing consistent definition."
            )

        if dependency_confidence > 0.80:
            explanations.append(
                f"High dependency confidence ({dependency_confidence:.2f}) suggests it is tightly coupled with other requirements."
            )

        if volatility > 0.30:
            explanations.append(
                f"High requirement volatility ({volatility:.2f}) indicates frequent updates."
            )

        if conflict_severity > 0.30:
            explanations.append(
                f"Significant conflict severity ({conflict_severity:.2f}) detected during validation checks."
            )

        if change_probability > 0.70:
            explanations.append(
                f"Future change probability is high ({change_probability:.2f}), making it critical to monitor."
            )

        return explanations
