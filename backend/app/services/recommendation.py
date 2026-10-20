# Placeholder for Python script
from typing import List


class RecommendationEngine:

    def __init__(self):
        pass

    def generate_recommendations(
        self,
        requirement_id: str,
        changed_requirement: str,
        affected_modules: List[str],
        conflict_detected: bool,
        risk_score: int
    ) -> List[str]:
        """
        Generate recommendations based on the requirement analysis.
        """

        recommendations = []

        # -----------------------------------
        # Risk-based recommendations
        # -----------------------------------

        if risk_score >= 80:
            recommendations.append(
                "Perform complete regression testing."
            )
            recommendations.append(
                "Review architecture before implementation."
            )

        elif risk_score >= 50:
            recommendations.append(
                "Perform integration testing."
            )

        else:
            recommendations.append(
                "Perform unit testing."
            )

        # -----------------------------------
        # Conflict-based recommendations
        # -----------------------------------

        if conflict_detected:
            recommendations.append(
                "Review conflicting requirements with stakeholders."
            )
            recommendations.append(
                "Update Software Requirement Specification (SRS)."
            )

        # -----------------------------------
        # Module-specific recommendations
        # -----------------------------------

        module_actions = {
            "Authentication": [
                "Update authentication module.",
                "Modify login APIs.",
                "Validate user credentials."
            ],
            "Database": [
                "Review database schema.",
                "Update affected tables."
            ],
            "Dashboard": [
                "Update dashboard UI.",
                "Verify dashboard widgets."
            ],
            "Payment": [
                "Revalidate payment workflow.",
                "Retest payment gateway."
            ],
            "Admin": [
                "Verify admin permissions.",
                "Update admin dashboard."
            ],
            "Profile": [
                "Update profile management APIs."
            ]
        }

        for module in affected_modules:

            if module in module_actions:
                recommendations.extend(module_actions[module])

        # -----------------------------------
        # General recommendations
        # -----------------------------------

        recommendations.append(
            "Update project documentation."
        )

        recommendations.append(
            "Notify QA team."
        )

        recommendations.append(
            "Review Requirement Stability Index."
        )

        recommendations.append(
            "Review Requirement Dependency Graph."
        )

        # Remove duplicates

        recommendations = list(dict.fromkeys(recommendations))

        return recommendations


# ---------------------------------------------------
# Helper function used by FastAPI
# ---------------------------------------------------

_engine = RecommendationEngine()


def generate_recommendations(
    requirement_id,
    changed_requirement,
    affected_modules,
    conflict_detected,
    risk_score
):

    return _engine.generate_recommendations(
        requirement_id,
        changed_requirement,
        affected_modules,
        conflict_detected,
        risk_score
    )