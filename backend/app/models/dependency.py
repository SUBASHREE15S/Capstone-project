# Placeholder for Python script
from pydantic import BaseModel


class DependencyBase(BaseModel):
    source_requirement: str
    target_requirement: str
    dependency_type: str


class DependencyCreate(DependencyBase):
    pass


class DependencyResponse(DependencyBase):
    id: int

    class Config:
        from_attributes = True