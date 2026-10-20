from sqlalchemy import Column, Integer, String, Float, ForeignKey, DateTime, Text
from sqlalchemy.sql import func
from app.database.db import Base


class Requirement(Base):
    __tablename__ = "requirements"

    id = Column(Integer, primary_key=True, index=True)
    requirement_id = Column(String, unique=True, nullable=False)
    description = Column(String, nullable=False)
    module = Column(String)
    stability_score = Column(Float, default=0.0)


class Dependency(Base):
    __tablename__ = "dependencies"

    id = Column(Integer, primary_key=True, index=True)
    source_requirement = Column(String)
    target_requirement = Column(String)
    dependency_type = Column(String)


class RequirementHistory(Base):
    __tablename__ = "requirement_history"

    id = Column(Integer, primary_key=True, index=True)
    requirement_id = Column(String)
    old_requirement = Column(String)
    new_requirement = Column(String)
    change_date = Column(String)


class RequirementMetrics(Base):
    __tablename__ = "requirement_metrics"

    id = Column(Integer, primary_key=True, index=True)
    requirement_id = Column(String, unique=True, nullable=False)
    semantic_consistency = Column(Float)
    dependency_confidence = Column(Float)
    volatility = Column(Float)
    historical_drift = Column(Float)
    conflict_severity = Column(Float)
    dynamic_rsi = Column(Float)
    stability_status = Column(String)
    updated_at = Column(DateTime, default=func.now(), onupdate=func.now())


class ConflictPropagation(Base):
    __tablename__ = "conflict_propagation"

    id = Column(Integer, primary_key=True, index=True)
    source_requirement = Column(String)
    affected_requirement = Column(String)
    probability = Column(Float)
    impact_score = Column(Float)
    resolution_priority = Column(String)
    created_at = Column(DateTime, default=func.now())


class RequirementEvolution(Base):
    __tablename__ = "requirement_evolution"

    id = Column(Integer, primary_key=True, index=True)
    requirement_id = Column(String)
    version = Column(Integer)
    semantic_consistency = Column(Float)
    dependency_confidence = Column(Float)
    volatility = Column(Float)
    historical_drift = Column(Float)
    conflict_severity = Column(Float)
    predicted_probability = Column(Float)
    created_at = Column(DateTime, default=func.now())


class SavedAnalysis(Base):
    __tablename__ = "saved_analyses"

    id = Column(Integer, primary_key=True, index=True)
    project_name = Column(String, nullable=False)
    filename = Column(String, nullable=True)
    health_percentage = Column(Float, default=0.0)
    risk_level = Column(String, default="Low")
    analysis_data = Column(Text, nullable=False)
    created_at = Column(DateTime, default=func.now())