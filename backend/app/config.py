# Placeholder for Python script
import os

# ===========================
# Project Configuration
# ===========================

# Base directory
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

# ===========================
# Database
# ===========================

DATABASE_URL = "sqlite:///./requirements.db"

# ===========================
# Upload Folder
# ===========================

UPLOAD_FOLDER = os.path.join(BASE_DIR, "uploads")

# Create upload folder automatically
os.makedirs(UPLOAD_FOLDER, exist_ok=True)

# ===========================
# Reports Folder
# ===========================

REPORT_FOLDER = os.path.join(BASE_DIR, "reports")

os.makedirs(REPORT_FOLDER, exist_ok=True)

# ===========================
# Graph Folder
# ===========================

GRAPH_FOLDER = os.path.join(BASE_DIR, "graphs")

os.makedirs(GRAPH_FOLDER, exist_ok=True)

# ===========================
# Allowed File Types
# ===========================

ALLOWED_EXTENSIONS = [
    ".pdf",
    ".docx",
    ".txt"
]

# ===========================
# NLP Model
# ===========================

SPACY_MODEL = "en_core_web_sm"

# ===========================
# Risk Thresholds
# ===========================

LOW_RISK = 40
MEDIUM_RISK = 70
HIGH_RISK = 100

# ===========================
# Application
# ===========================

PROJECT_NAME = "AI Requirement Change Impact Prediction"

VERSION = "1.0.0"

DEBUG = True