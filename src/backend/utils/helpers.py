import random
import string

from core.transactions.coin_transaction import CoinTransaction
from core.transactions.data_transaction import DataTransaction
from utils.common import generate_keys


def coin_transaction(blockchain, from_address, to_address, value, private_key):
    if from_address not in blockchain.accounts:
        return {'error': 'Account not found!'}

    if from_address == to_address:
        return {'error': 'Receiver and sender cannot be the same!'}

    transaction = CoinTransaction(from_address, blockchain.accounts[from_address]['nonce'], to_address, value)
    transaction.sign(private_key)

    output = {}
    try:
        blockchain.add_new_transaction(transaction)
    except Exception as e:
        output['error'] = e.__str__()

    return output


def data_transaction(blockchain, from_address, body, private_key):
    transaction = DataTransaction(from_address, blockchain.accounts[from_address]['nonce'], body)
    transaction.sign(private_key)

    output = {}
    try:
        blockchain.add_new_transaction(transaction)
    except Exception as e:
        output['error'] = e.__str__()

    return output


def data_seeder(blockchain):
    def _data_seeder(acc1, test_acc1, test_acc2, iteration):
        coin_transaction(blockchain, acc1['address'], test_acc1['address'], iteration, acc1['private_key'])
        coin_transaction(blockchain, test_acc1['address'], test_acc2['address'], iteration, test_acc1['private_key'])
        blockchain.mine(test_acc2['address'])

        data_transaction(blockchain, acc1['address'], 'Hello World! #' + str(iteration), acc1['private_key'])
        blockchain.mine(test_acc1['address'])

    def _rand_address():
        return ''.join(random.choice(string.ascii_uppercase + string.digits) for _ in range(32))

    index = 0
    test2_account = generate_keys('test2'.encode())

    if len(blockchain.chain) == 0:
        test_account = generate_keys('test'.encode())
        test1_account = generate_keys('test1'.encode())

        # For Genesis Block
        blockchain.mine(test_account['address'])

        for i in range(0, 10):
            _data_seeder(test_account, test1_account, test2_account, index)

            index += 1

    rand1_account = generate_keys(_rand_address().encode())
    rand2_account = generate_keys(_rand_address().encode())

    for i in range(0, 10):
        _data_seeder(test2_account, rand1_account, rand2_account, random.uniform(0, index))

        index += 1
