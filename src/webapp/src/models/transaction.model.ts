export interface Transaction {
    "address": string,
    "nonce": number,
    "fee": number,
    "version": number,
    "timestamp": number,
    "recipient": string,
    "value": number | undefined,
    "hash": string
    "data": string | undefined,
}