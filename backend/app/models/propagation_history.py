from dataclasses import dataclass

@dataclass
class PropagationHistory:

    requirement:str

    impacted_requirement:str

    probability:float

    timestamp:str

    impact_score:float

    resolution_priority:str
