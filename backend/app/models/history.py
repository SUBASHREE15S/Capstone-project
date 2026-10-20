# Placeholder for Python script
from pydantic import BaseModel


class RequirementHistoryBase(BaseModel):
    requirement_id: str
    old_requirement: str
    new_requirement: str
    change_date: str


class RequirementHistoryCreate(RequirementHistoryBase):
    pass


class RequirementHistoryResponse(RequirementHistoryBase):
    id: int

    class Config:
        from_attributes = True