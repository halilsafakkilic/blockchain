import copy
import json
import time

from _pysha3 import keccak_256
from coincurve import PrivateKey, PublicKey

from utils.common import get_address


class Transaction:
    def __init__(self, address: str, nonce: int, fee: float, version: int = 1):
        self.address = address
        self.nonce = nonce
        self.fee = fee
        self.version = version

        self.timestamp = time.time()
        self.signature = None

    def export(self):
        block_data = copy.copy(self.__dict__)
        del block_data['signature']

        block_data['hash'] = keccak_256(json.dumps(block_data, sort_keys=True).encode()).digest().hex()

        return block_data

    def __str__(self):
        return json.dumps(self.export(), sort_keys=True)

    def sign(self, private_key_value: str):
        private_key = PrivateKey.from_hex(private_key_value)

        signature = private_key.sign_recoverable(self.__str__().encode())

        self.signature = signature.hex()

    def verify_sign(self):
        signature = bytes.fromhex(self.signature)

        # serialized_recoverable_sig = signature + int_to_bytes(0)
        public_key = PublicKey.from_signature_and_message(signature, self.__str__().encode())

        if get_address(public_key) != self.address:
            raise Exception('İşlem geçerli değil!')
