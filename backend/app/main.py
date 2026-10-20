# Placeholder for Python script
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.database.db import engine
from app.database.schema import Base

# Import API Routers
from app.api.upload import router as upload_router
from app.api.analysis import router as analysis_router
from app.api.impact import router as impact_router
from app.api.conflict import router as conflict_router
from app.api.recommendation import router as recommendation_router

# Create database tables
Base.metadata.create_all(bind=engine)

# Rebuild dependency graph from DB on startup
from app.database.db import SessionLocal
from app.database.schema import Requirement as DBRequirement
from app.services.extractor import detect_actor, detect_priority
from app.services.dependency_graph import RequirementDependencyGraph
from app.services.impact_prediction import initialize_graph

def rebuild_graph_from_db():
    db = SessionLocal()
    try:
        db_reqs = db.query(DBRequirement).all()
        if db_reqs:
            requirements = []
            for req in db_reqs:
                requirements.append({
                    "requirement_id": req.requirement_id,
                    "description": req.description,
                    "module": req.module,
                    "actor": detect_actor(req.description),
                    "priority": detect_priority(req.description)
                })
            graph_builder = RequirementDependencyGraph()
            graph_builder.build_graph(requirements)
            initialize_graph(graph_builder)
            print("Successfully initialized dependency graph from database on startup.")
    except Exception as e:
        print(f"Error initializing dependency graph from database: {e}")
    finally:
        db.close()

rebuild_graph_from_db()

# Create FastAPI App
app = FastAPI(
    title="AI Requirement Change Impact Prediction",
    version="1.0.0"
)

# Enable CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=False,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Register APIs
app.include_router(upload_router, prefix="/api", tags=["Upload"])
app.include_router(analysis_router, prefix="/api", tags=["Analysis"])
app.include_router(impact_router, prefix="/api", tags=["Impact"])
app.include_router(conflict_router, prefix="/api", tags=["Conflict"])
app.include_router(recommendation_router, prefix="/api", tags=["Recommendation"])


@app.get("/")
def root():
    return {
        "message": "AI Requirement Change Impact Prediction API is Running",
        "version": "1.0.0"
    }


@app.get("/health")
def health_check():
    return {
        "status": "Healthy"
    }