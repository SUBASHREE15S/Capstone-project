try:
    from app.AI_ENGINE.semantic_similarity import SemanticSimilarity
except ImportError:
    try:
        from AI_ENGINE.semantic_similarity import SemanticSimilarity
    except ImportError:
        import sys
        import os
        sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
        from AI_ENGINE.semantic_similarity import SemanticSimilarity


class HistoricalDrift:

    def __init__(self):

        self.engine = SemanticSimilarity()

    def calculate(self, old_requirement, new_requirement):

        similarity = self.engine.similarity(
            old_requirement,
            new_requirement
        )

        drift = 1 - similarity

        if drift < 0:
            drift = 0

        return round(drift, 3)
