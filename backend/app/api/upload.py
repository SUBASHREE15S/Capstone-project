# Placeholder for Python script
from fastapi import APIRouter, UploadFile, File, HTTPException
from fastapi.responses import JSONResponse
import os
import shutil
from pathlib import Path
from app.config import UPLOAD_FOLDER as UPLOAD_DIR

router = APIRouter()


@router.post("/upload")
async def upload_srs(file: UploadFile = File(...)):
    """
    Upload an SRS document (PDF, DOCX, TXT)
    """

    allowed_extensions = [".pdf", ".docx", ".txt"]

    extension = Path(file.filename).suffix.lower()

    if extension not in allowed_extensions:
        raise HTTPException(
            status_code=400,
            detail="Only PDF, DOCX and TXT files are allowed."
        )

    file_path = os.path.join(UPLOAD_DIR, file.filename)

    with open(file_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    return JSONResponse(
        status_code=200,
        content={
            "message": "File uploaded successfully.",
            "filename": file.filename,
            "filepath": file_path
        }
    )