export interface Block {
    blockNumber: number,
    parentHash: string,
    difficulty: number,
    timestamp: number,
    mixHash: string,
    reward: number,
    transactions: [],
    fee: number,
    nonce: number,
    hash: string,
    payload: {
        status: string | undefined,
        minedBy: string,
        signature: string
    }
}