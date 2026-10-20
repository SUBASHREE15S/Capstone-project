import sys
import os

sys.path.append(os.path.join(os.path.dirname(os.path.abspath(__file__)), "app"))

from algorithms.dynamic_rsi import DynamicRSI
from algorithms.historical_drift import HistoricalDrift
from algorithms.volatility import RequirementVolatility
from algorithms.conflict_severity import ConflictSeverity

drift_engine = HistoricalDrift()
volatility_engine = RequirementVolatility()
conflict_engine = ConflictSeverity()

drift = drift_engine.calculate(
    "User shall login using OTP",
    "User shall login using fingerprint"
)

volatility = volatility_engine.calculate(
    modification_count=12,
    total_project_days=100
)

severity = conflict_engine.calculate(
    critical=1,
    major=2,
    minor=3
)

dependency_confidence = 0.91

semantic_consistency = 1 - drift

drsi_engine = DynamicRSI()

score = drsi_engine.calculate(
    semantic_consistency,
    dependency_confidence,
    volatility,
    severity,
    drift
)

print("Historical Drift :", drift)
print("Volatility       :", volatility)
print("Conflict Severity:", severity)
print("Dynamic RSI      :", score)
print("Status           :", drsi_engine.classify(score))
