class DependencyConfidence:

    def calculate(self,
                  semantic_score,
                  historical_score,
                  priority):

        confidence = (
            semantic_score *
            historical_score *
            priority
        )

        return round(confidence,3)
