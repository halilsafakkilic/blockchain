import {Account} from "./account.model";
import {Transaction} from "./transaction.model";
import {Block} from "./block.model";

export interface Chain {
    accounts: { [address: string]: Account; };
    waiting_blocks: Block[],
    waiting_transactions: Transaction[],
    chain: Block[],
}