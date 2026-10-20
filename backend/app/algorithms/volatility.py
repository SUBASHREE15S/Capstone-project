class RequirementVolatility:

    def __init__(self):
        pass

    def calculate(
            self,
            modification_count,
            total_project_days):

        if total_project_days == 0:
            return 0

        volatility = modification_count / total_project_days

        return round(volatility, 3)
