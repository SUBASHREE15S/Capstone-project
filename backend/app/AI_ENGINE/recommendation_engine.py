class RecommendationEngine:

    def recommend(
        self,
        drsi,
        probability,
        propagation_score
    ):
        recommendations = []

        if drsi < 0.60:
            recommendations.append("Review requirement stability with stakeholders.")

        if probability > 0.60:
            recommendations.append("Freeze requirement changes in the current sprint to avoid volatility.")

        if propagation_score > 0.50:
            recommendations.append("Review dependent requirement modules to prevent cascading impacts.")

        if not recommendations:
            recommendations.append("No critical actions required at this time.")

        return recommendations
