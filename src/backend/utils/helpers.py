from core.transactions.coin_transaction import CoinTransaction
from core.transactions.data_transaction import DataTransaction
from utils.common import generate_keys


def coin_transaction(blockchain, from_address, to_address, value, private_key):
    if from_address not in blockchain.accounts:
        return {'error': 'Account not found!'}

    transaction = CoinTransaction(from_address, blockchain.accounts[from_address]['nonce'], to_address, value)
    transaction.sign(private_key)

    output = {}
    try:
        blockchain.add_new_transaction(transaction)
    except Exception as e:
        output['error'] = e.__str__()


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
    def _data_seeder(blockchain, test_account, test1_account, test2_account, iteration):
        coin_transaction(blockchain, test_account['address'], test1_account['address'], iteration, test_account['private_key'])
        coin_transaction(blockchain, test1_account['address'], test2_account['address'], iteration, test1_account['private_key'])
        blockchain.mine(test2_account['address'])

        data_transaction(blockchain, test_account['address'], 'Hello World! #' + str(iteration), test_account['private_key'])
        blockchain.mine(test1_account['address'])

    test_account = generate_keys('test'.encode())
    test1_account = generate_keys('test1'.encode())
    test2_account = generate_keys('test2'.encode())

    # For Genesis Block
    blockchain.mine(test_account['address'])

    for i in range(0, 10):
        _data_seeder(blockchain, test_account, test1_account, test2_account, i + 1)
