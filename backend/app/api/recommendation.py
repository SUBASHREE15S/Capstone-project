# Placeholder for Python script
from fastapi import APIRouter, HTTPException
from pydantic import BaseModel

from app.services.recommendation import generate_recommendations

router = APIRouter()


class RecommendationRequest(BaseModel):
    requirement_id: str
    changed_requirement: str
    affected_modules: list[str]
    conflict_detected: bool
    risk_score: int


@router.post("/recommendation")
async def get_recommendations(request: RecommendationRequest):
    """
    Generate recommendations based on requirement change analysis.
    """

    try:
        recommendations = generate_recommendations(
            requirement_id=request.requirement_id,
            changed_requirement=request.changed_requirement,
            affected_modules=request.affected_modules,
            conflict_detected=request.conflict_detected,
            risk_score=request.risk_score
        )

        return {
            "status": "success",
            "requirement_id": request.requirement_id,
            "recommendations": recommendations
        }

    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=str(e)
        )