class ImpactScore:

    def calculate(

            self,

            probability,

            dependency_count,

            volatility,

            business_priority):

        score=(

            probability*

            dependency_count*

            (1+volatility)*

            business_priority

        )

        return round(score,3)
