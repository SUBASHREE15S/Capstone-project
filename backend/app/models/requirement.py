# Placeholder for Python script
from pydantic import BaseModel
from typing import Optional


class RequirementBase(BaseModel):
    requirement_id: str
    description: str
    module: Optional[str] = None
    stability_score: Optional[float] = 0.0


class RequirementCreate(RequirementBase):
    pass


class RequirementResponse(RequirementBase):
    id: int

    class Config:
        from_attributes = True