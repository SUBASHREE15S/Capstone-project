class RequirementIntelligence:

    def generate(
        self,
        dna,
        influence,
        ripple,
        health,
        prediction
    ):
        intelligence = []
        # Build map for safe lookup to avoid list index alignment crashes
        influence_map = {item["requirement_id"]: item["influence_score"] for item in influence}

        for item in dna:
            req_id = item["requirement_id"]
            inf_score = influence_map.get(req_id, 0.0)
            
            score = (
                item["business_criticality"] * 0.25 +
                (inf_score / 100.0) * 0.25 +
                ripple * 0.20 +
                health["health_score"] * 0.20 +
                (1.0 - prediction) * 0.10
            )
            score = round(min(max(score, 0.0), 1.0), 2)

            if score > 0.85:
                risk = "Critical"
            elif score > 0.70:
                risk = "High"
            elif score > 0.50:
                risk = "Medium"
            else:
                risk = "Low"

            intelligence.append({
                "requirement_id": req_id,
                "intelligence_score": score,
                "risk": risk
            })

        return intelligence
