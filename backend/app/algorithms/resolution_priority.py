class ResolutionPriority:

    def recommend(

            self,

            impact_score,

            severity):

        final=impact_score*severity

        if final>8:

            return "Immediate"

        elif final>5:

            return "High"

        elif final>3:

            return "Medium"

        else:

            return "Low"
