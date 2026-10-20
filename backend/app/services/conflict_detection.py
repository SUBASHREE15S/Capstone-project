# Placeholder for Python script
from typing import Dict
import re


class ConflictDetectionEngine:

    def __init__(self):
        pass

    def detect_conflicts(
        self,
        requirement_id: str,
        existing_requirement: str,
        new_requirement: str
    ) -> Dict:
        """
        Detect conflicts between existing and new requirements.
        """

        existing = existing_requirement.lower()
        new = new_requirement.lower()

        conflict_detected = False
        conflict_type = "No Conflict"
        severity = "Low"
        description = "No conflicts detected."

        # Detect contradictory words
        opposite_pairs = [
            ("enable", "disable"),
            ("allow", "deny"),
            ("required", "optional"),
            ("mandatory", "optional"),
            ("email", "without email"),
            ("password", "passwordless"),
            ("manual", "automatic"),
            ("online", "offline")
        ]

        for word1, word2 in opposite_pairs:

            if (word1 in existing and word2 in new) or \
               (word2 in existing and word1 in new):

                conflict_detected = True
                conflict_type = "Requirement Conflict"
                severity = "High"
                description = (
                    f"Conflict detected between '{word1}' and '{word2}'."
                )
                break

        # Detect module conflict
        if not conflict_detected:

            old_module = self.detect_module(existing)
            new_module = self.detect_module(new)

            if old_module != new_module:

                conflict_detected = True
                conflict_type = "Module Conflict"
                severity = "Medium"
                description = (
                    f"Requirement moved from "
                    f"{old_module} module to {new_module} module."
                )

        affected_modules = list(
            set([
                self.detect_module(existing),
                self.detect_module(new)
            ])
        )

        recommendation = self.generate_recommendation(
            conflict_detected,
            severity
        )

        return {
            "conflict_detected": conflict_detected,
            "conflict_type": conflict_type,
            "severity": severity,
            "description": description,
            "affected_modules": affected_modules,
            "recommendation": recommendation
        }

    def detect_module(self, text):

        if re.search(r'login|register|password|otp|authentication', text):
            return "Authentication"

        if re.search(r'payment|billing|invoice', text):
            return "Payment"

        if re.search(r'dashboard|report', text):
            return "Dashboard"

        if re.search(r'admin', text):
            return "Admin"

        if re.search(r'profile|account', text):
            return "Profile"

        return "General"

    def generate_recommendation(self, conflict, severity):

        if not conflict:
            return "No action required."

        if severity == "High":
            return (
                "Review requirement with stakeholders before implementation."
            )

        if severity == "Medium":
            return (
                "Verify module dependencies and update documentation."
            )

        return "Minor review recommended."


# -------------------------------------------------------
# Helper Function for FastAPI API
# -------------------------------------------------------

_engine = ConflictDetectionEngine()


def detect_conflicts(
    requirement_id,
    existing_requirement,
    new_requirement
):
    return _engine.detect_conflicts(
        requirement_id,
        existing_requirement,
        new_requirement
    )