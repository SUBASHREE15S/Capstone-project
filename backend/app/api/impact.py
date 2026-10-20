# Placeholder for Python script
from fastapi import APIRouter, HTTPException
from pydantic import BaseModel

from app.services.impact_prediction import predict_impact

router = APIRouter()


class ChangeRequest(BaseModel):
    requirement_id: str
    new_requirement: str


@router.post("/impact")
async def predict_requirement_impact(change: ChangeRequest):
    """
    Predict the impact of a changed requirement.
    """

    try:
        result = predict_impact(
            change.requirement_id,
            change.new_requirement
        )

        return {
            "status": "success",
            "change_request": {
                "requirement_id": change.requirement_id,
                "new_requirement": change.new_requirement
            },
            "prediction": result
        }

    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=str(e)
        )