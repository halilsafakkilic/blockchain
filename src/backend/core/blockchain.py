from core.block import Block


class Blockchain:
    DIFFICULTY_BOMB = 30
    REWARD_HALVING = 10

    def __init__(self):
        self.chain = []
        self.accounts = {}

        self.difficulty = 1
        self.reward = 50

        # Create Genesis Block
        self.waiting_transactions = []
        self.waiting_blocks = {
            0: Block(0, '0' * self.difficulty, self.difficulty, self.reward)
        }

    def mine(self, address):
        waiting_block = self._waiting_block

        if not waiting_block:
            return None

        transactions = self.waiting_transactions
        self.waiting_transactions = []

        waiting_block.payload['status'] = 'pending'
        waiting_block.set_transactions(transactions)

        proof = self._proof_of_work(waiting_block)

        self._add_block(waiting_block, proof, address)
        del self.waiting_blocks[waiting_block.blockNumber]

        self._create_block()

    def account_balance(self, address, balance):
        if address not in self.accounts:
            self.accounts[address] = {
                'balance': balance,
                'nonce': 0
            }
        else:
            self.accounts[address]['balance'] += balance
            if balance < 0:
                self.accounts[address]['nonce'] += 1

    @property
    def _waiting_block(self):
        if len(self.waiting_blocks) == 0:
            return None

        return self.waiting_blocks[list(self.waiting_blocks.keys())[0]]

    @property
    def _last_block(self):
        return self.chain[-1]

    def _add_block(self, block, proof, miner_address):
        chain_length = len(self.chain)

        # Check Next Block ID
        if block.blockNumber != chain_length:
            return False

        if not self._is_valid_proof(block, proof):
            return False

        # for Genesis Block
        if chain_length != 0:
            previous_hash = self._last_block.hash
            if previous_hash != block.parentHash:
                return False

        self._block_mine(block, miner_address, proof)

        return True

    def _block_mine(self, block, miner_address, proof):
        block.is_mined(miner_address, proof)

        total_reward = block.reward + block.fee
        self.account_balance(miner_address, total_reward)
        self.chain.append(block)

        # Difficulty Bomb
        if block.blockNumber > 1 and block.blockNumber % self.DIFFICULTY_BOMB == 0:
            self.difficulty += 1

        if block.blockNumber > 1 and block.blockNumber % self.REWARD_HALVING == 0:
            self.reward /= 2

    @staticmethod
    def _proof_of_work(block):
        block.nonce = 0
        computed_hash = block.compute_hash()
        while not computed_hash.startswith('0' * block.difficulty):
            block.nonce += 1
            computed_hash = block.compute_hash()

        return computed_hash

    @staticmethod
    def _is_valid_proof(block, block_hash):
        return (block_hash.startswith('0' * block.difficulty) and
                block_hash == block.compute_hash())

    def add_new_transaction(self, transaction):
        transaction.verify_sign()

        # Check Address
        address = transaction.address

        if self.accounts[address]['nonce'] != transaction.nonce:
            raise Exception('Nonce value missmatch!')

        # Balance SYNC
        required_amount = transaction.fee
        if 'value' in transaction.__dict__:
            required_amount += transaction.value

        # If don't have an account, it creates
        self.account_balance(address, 0)

        if self.accounts[address]['balance'] < required_amount:
            raise Exception('Insufficient balance! ' + str(self.accounts[address]['balance']) + ' < ' + str(required_amount))

        self.account_balance(address, required_amount * -1)

        if 'value' in transaction.__dict__:
            self.account_balance(transaction.recipient, transaction.value)

        transaction_data = transaction.export()

        self.waiting_transactions.append(transaction_data)

        return True

    def _create_block(self):
        last_block = self._last_block

        new_block_number = last_block.blockNumber + 1
        self.waiting_blocks[new_block_number] = Block(
            new_block_number,
            last_block.hash,
            self.difficulty,
            self.reward
        )
