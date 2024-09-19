from pathway import BaseCustomAccumulator, Json


class JSONAccumulator(BaseCustomAccumulator):
    """
    JSONAccumulator is a custom accumulator class used to collect and merge JSON data over time.

    This class allows for accumulating JSON objects into a list of dictionaries, with an initial value
    set at instantiation. It supports adding new JSON objects and computing the final result as a list of
    merged dictionaries.

    Attributes:
        data (list[dict]): A list that stores accumulated JSON objects.
        value (dict): A dictionary representing the initial JSON object and its current state.

    Args:
        initialData (pw.Json): The initial JSON object used to set up the accumulator.

    Methods:
        from_row(row):
            Class method that creates a `JSONAccumulator` instance from a row containing a single JSON value.

        update(other):
            Adds another JSONAccumulator's value to the current list of accumulated data.

        compute_result() -> list[dict]:
            Returns the accumulated list of dictionaries.
    """
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
