from secrets import token_bytes

from coincurve import PublicKey
from sha3 import keccak_256


def get_address(public_key):
    address = keccak_256(public_key.format(compressed=False)[1:]).digest()[-20:]

    return '0x' + address.hex()


def generate_keys(private_key_value: bytearray = None):
    if private_key_value is None:
        private_key_value = token_bytes(32)

    private_key = keccak_256(private_key_value).digest()

    public_key = PublicKey.from_valid_secret(private_key)

    return {
        'private_key': private_key.hex(),
        'public_key': public_key.format().hex(),
        'address': get_address(public_key)
    }
