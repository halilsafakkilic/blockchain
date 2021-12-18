import random

from core.transaction import Transaction


class DataTransaction(Transaction):
    def __init__(self, address: str, nonce: int, data, version: int = 2):
        fee = random.uniform(1, 2)

        super().__init__(address, nonce, fee, version)

        self.data = data
