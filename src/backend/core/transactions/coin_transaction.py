import random

from core.transaction import Transaction


class CoinTransaction(Transaction):
    def __init__(self, address: str, nonce: int, recipient: str, value: float, version: int = 1):
        fee = random.uniform(0.1, 1)

        super().__init__(address, nonce, fee, version)

        self.recipient = recipient
        self.value = float(value)
