class ExplainableHealth:

    def generate(
        self,
        health,
        semantic,
        dependency,
        conflict,
        drift,
        prediction
    ):

        explanation = []

        if semantic > 0.8:
            explanation.append(
                "Semantic consistency is high."
            )
        else:
            explanation.append(
                "Semantic consistency is low."
            )

        if dependency > 0.7:
            explanation.append(
                "Dependency confidence is strong."
            )
        else:
            explanation.append(
                "Dependency confidence is weak."
            )

        if conflict < 0.3:
            explanation.append(
                "Conflict severity is low."
            )
        else:
            explanation.append(
                "Conflict severity is high."
            )

        if drift < 0.3:
            explanation.append(
                "Historical drift is low."
            )
        else:
            explanation.append(
                "Historical drift is increasing."
            )

        if prediction < 0.5:
            explanation.append(
                "Future change probability is low."
            )
        else:
            explanation.append(
                "Future change probability is high."
            )

        explanation.append(
            f"Overall Health Score is {health}%."
        )

        return explanation
