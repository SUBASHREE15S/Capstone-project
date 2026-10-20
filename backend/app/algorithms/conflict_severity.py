class ConflictSeverity:

    def __init__(self):
        pass

    def calculate(
            self,
            critical,
            major,
            minor):

        score = (
            critical * 1.0 +
            major * 0.6 +
            minor * 0.3
        )

        return round(score / 10, 3)
