import json

from flask import Flask, request
from flask_cors import CORS
from sha3 import keccak_256

from core.blockchain import Blockchain
from utils.common import generate_keys
from utils.helpers import coin_transaction, data_transaction, data_seeder

app = Flask(__name__)
CORS(app)

blockchain = Blockchain()


def json_response(data):
    response = app.response_class(
        response=json.dumps(data),
        status=200,
        mimetype='application/json'
    )

    return response


@app.route('/hash', methods=['POST'])
def hash_controller():
    hash_str = keccak_256(request.json['input'].encode()).digest()

    return json_response({'hash': hash_str.hex()})


@app.route('/address/generate', methods=['GET'])
def generate_address_controller():
    return json_response(generate_keys())


@app.route('/address/generate', methods=['POST'])
def generate_address_with_passphrase_controller():
    return json_response(generate_keys(request.json['passphrase'].encode()))


@app.route('/chain', methods=['GET'])
def chain():
    chain_data = []
    for block in blockchain.chain:
        chain_data.append(block.__dict__)

    waiting_blocks = []
    for block_number in blockchain.waiting_blocks:
        waiting_blocks.append(blockchain.waiting_blocks[block_number].__dict__)

    waiting_transactions = []
    for transaction in blockchain.waiting_transactions:
        waiting_transactions.append(transaction)

    return json_response({
        'accounts': blockchain.accounts,
        'waiting_blocks': waiting_blocks[::-1],
        'waiting_transactions': waiting_transactions[::-1],
        'chain': chain_data[::-1],
    })


@app.route('/account/<address>', methods=['GET'])
def account(address):
    if address not in blockchain.accounts:
        blockchain.account_balance(address, 0.0)

    return json_response(blockchain.accounts[address])


@app.route('/coin-transaction', methods=['POST'])
def coin_transaction_controller():
    from_address = request.json['address']
    to_address = request.json['to']
    value = request.json['value']
    private_key = request.json['private_key']

    return json_response(coin_transaction(blockchain, from_address, to_address, value, private_key))


@app.route('/data-transaction', methods=['POST'])
def data_transaction_controller():
    from_address = request.json['address']
    body = request.json['body']
    private_key = request.json['private_key']

    return json_response(data_transaction(blockchain, from_address, body, private_key))


@app.route('/mine', methods=['POST'])
def mine():
    blockchain.mine(request.json['address'])

    return json_response({})


@app.route('/seeder', methods=['POST'])
def seeder():
    data_seeder(blockchain)

    return json_response({})
