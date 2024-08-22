from pathway import BaseCustomAccumulator, Json


class JSONAccumulator(BaseCustomAccumulator):
    def __init__(self, initialData: Json):
        self.data: list[dict] = list()
        self.value: dict = { **initialData.as_dict() }

    @classmethod
    def from_row(self, row):
        [val] = row
        return JSONAccumulator(val)

    def update(self, other):
        self.data.append(other.value)

    def compute_result(self) -> list[dict]:
        return self.data
