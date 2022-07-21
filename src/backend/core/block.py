import copy
import json
import time
import uuid

from sha3 import keccak_256


class Block:
    def __init__(self, block_number: int, parent_hash: str, difficulty: int, reward: float):
        self.blockNumber = block_number
        self.parentHash = parent_hash
        self.difficulty = difficulty

        self.timestamp = time.time()
        self.mixHash = str(uuid.uuid4())
        self.reward = reward

        self.transactions = []
        self.fee = 0
        self.nonce = 0
        self.hash = ''

        self.payload = {
            'status': 'earliest',
            'minedBy': '',
            'hash': ''
        }

    def is_mined(self, address, hash):
        self.hash = hash
        self.payload['minedBy'] = address

        del self.payload['status']

        hash_content = hash + '|' + json.dumps(self.payload, sort_keys=True)

        self.payload['signature'] = keccak_256(hash_content.encode()).digest().hex()

    def set_transactions(self, transactions):
        self.transactions = transactions
        self.fee = self._calc_fee()

    def _calc_fee(self):
        total_fee = 0
        for transaction in self.transactions:
            total_fee += transaction['fee']

        return total_fee

    def export(self):
        block_data = copy.copy(self.__dict__)
        del block_data['payload']

        return block_data

    def compute_hash(self):
        block_data = self.export()
        del block_data['hash']

        block_string = json.dumps(block_data, sort_keys=True)

        return keccak_256(block_string.encode()).digest().hex()
