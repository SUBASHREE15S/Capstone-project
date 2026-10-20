# Placeholder for Python script
import re
from typing import List, Dict

try:
    import spacy
    nlp = spacy.load("en_core_web_sm")
except Exception:
    nlp = None


def extract_requirements(text: str) -> List[Dict]:
    """
    Extract software requirements from SRS text.
    Returns a list of structured requirements.
    """

    requirements = []

    # Split document into lines and clean them
    lines = text.split("\n")
    clean_lines = [line.strip() for line in lines if line.strip()]

    # Patterns for Requirement IDs: REQ-001, REQ001, R-001, R001, etc.
    id_pattern = r"^(REQ-\d+|REQ\d+|R-\d+|R\d+)"

    i = 0
    while i < len(clean_lines):
        line = clean_lines[i]

        match = re.match(id_pattern, line, re.IGNORECASE)
        if match:
            requirement_id = match.group(1)
            # Remove the ID part from the line to see if the description is on the same line
            remainder = line[len(requirement_id):].strip(" :.-")

            if remainder:
                description = remainder
                i += 1
            else:
                # The description is on the next line
                if i + 1 < len(clean_lines):
                    description = clean_lines[i + 1]
                    i += 2
                else:
                    description = ""
                    i += 1

            module = detect_module(description)
            actor = detect_actor(description)
            priority = detect_priority(description)

            requirements.append(
                {
                    "requirement_id": requirement_id,
                    "description": description,
                    "module": module,
                    "actor": actor,
                    "priority": priority
                }
            )
        else:
            i += 1

    return requirements


def detect_module(description: str) -> str:
    """
    Predict module based on keywords.
    """

    text = description.lower()

    if any(word in text for word in ["login", "register", "password", "otp", "authentication"]):
        return "Authentication"

    elif any(word in text for word in ["payment", "invoice", "billing"]):
        return "Payment"

    elif any(word in text for word in ["dashboard", "report", "analytics"]):
        return "Dashboard"

    elif any(word in text for word in ["admin", "user management"]):
        return "Admin"

    elif any(word in text for word in ["profile", "account"]):
        return "Profile"

    else:
        return "General"


def detect_actor(description: str) -> str:
    """
    Detect primary actor.
    """

    text = description.lower()

    if "admin" in text:
        return "Admin"

    if "user" in text:
        return "User"

    return "System"


def detect_priority(description: str) -> str:
    """
    Estimate priority.
    """

    text = description.lower()

    high_keywords = [
        "login",
        "payment",
        "authentication",
        "security",
        "password"
    ]

    medium_keywords = [
        "dashboard",
        "report",
        "profile"
    ]

    if any(word in text for word in high_keywords):
        return "High"

    elif any(word in text for word in medium_keywords):
        return "Medium"

    else:
        return "Low"