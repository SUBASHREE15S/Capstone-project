# Placeholder for Python script
from fastapi import APIRouter, HTTPException
from pydantic import BaseModel

from app.services.conflict_detection import detect_conflicts

router = APIRouter()


class ConflictRequest(BaseModel):
    requirement_id: str
    existing_requirement: str
    new_requirement: str


@router.post("/conflict")
async def check_requirement_conflict(request: ConflictRequest):
    """
    Detect conflicts between an existing requirement
    and a newly proposed requirement.
    """

    try:
        result = detect_conflicts(
            request.requirement_id,
            request.existing_requirement,
            request.new_requirement
        )

        return {
            "status": "success",
            "requirement_id": request.requirement_id,
            "conflict_analysis": result
        }

    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=str(e)
        )