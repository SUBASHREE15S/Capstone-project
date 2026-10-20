# Placeholder for Python script
import os
import fitz  # PyMuPDF
from docx import Document


def parse_pdf(file_path: str) -> str:
    """
    Extract text from a PDF file.
    """
    text = ""

    pdf = fitz.open(file_path)

    for page in pdf:
        text += page.get_text()

    pdf.close()

    return text


def parse_docx(file_path: str) -> str:
    """
    Extract text from a DOCX file.
    """
    doc = Document(file_path)

    text = ""

    for paragraph in doc.paragraphs:
        text += paragraph.text + "\n"

    return text


def parse_txt(file_path: str) -> str:
    """
    Read text from a TXT file.
    """
    with open(file_path, "r", encoding="utf-8") as file:
        return file.read()


def parse_document(file_path: str) -> str:
    """
    Automatically detect file type
    and return extracted text.
    """

    extension = os.path.splitext(file_path)[1].lower()

    if extension == ".pdf":
        return parse_pdf(file_path)

    elif extension == ".docx":
        return parse_docx(file_path)

    elif extension == ".txt":
        return parse_txt(file_path)

    else:
        raise ValueError("Unsupported file format.")