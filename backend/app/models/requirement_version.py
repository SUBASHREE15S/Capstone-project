from dataclasses import dataclass

@dataclass
class RequirementVersion:

    requirement_id:int

    version:int

    requirement_text:str

    semantic_consistency:float

    dependency_confidence:float

    historical_drift:float

    volatility:float

    conflict_severity:float

    predicted_change_probability:float
