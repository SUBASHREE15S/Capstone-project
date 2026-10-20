class RequirementHealth:

    def calculate(
        self,
        dynamic_rsi,
        semantic,
        dependency,
        business,
        conflict,
        drift,
        prediction
    ):

        health = (

            0.25 * dynamic_rsi +

            0.20 * semantic +

            0.15 * dependency +

            0.15 * business +

            0.10 * (1 - conflict) +

            0.10 * (1 - drift) +

            0.05 * (1 - prediction)

        )

        health = round(min(max(health, 0), 1), 2)

        if health >= 0.90:
            status = "Excellent"

        elif health >= 0.75:
            status = "Healthy"

        elif health >= 0.60:
            status = "Stable"

        elif health >= 0.40:
            status = "Risky"

        else:
            status = "Critical"

        return {

            "health_score": health,

            "health_percentage": round(health * 100, 2),

            "status": status

        }
