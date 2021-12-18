# Blockchain API Server

1. Create Keys (with ECDSA) and Address (with keccak_256)
2. Create New Blockchain (With Genesis Block)
3. Block Verification [Mining] (With Nonce for Difficulty)
4. Create Transaction (Simple)
4. Account Balance + Nonce (for Replay Attack) Management

```
{"address":"0x35e3322cb7984b316929756dda23789703101cd3","private_key":"f472834588667d97cfe58641ee7a5df9f14991b1bde6e565646fab39705f89ac","public_key":"036311e564273700124843a56d1d086b2ba1d6c363a9f769730f5f2f6dbd16eec1"}
{"address":"0xce3344b23b00090ea4bfdf57b82a32f8e71a2ce8","private_key":"eca9505eb4c6ddf3aef50f4825af6c3e730af350b108a54ae13bb2644873de03","public_key":"03dd1d04565d32fa78858880bc739118720756eb1cfcb7e6edc0fb5b2135cc0504"}
```

```
Random: /address/generate
Custom (with passphrase): http://localhost:8080/address/generate/{passphrase}

/account/0x35e3322cb7984b316929756dda23789703101cd3

/transfer/0x35e3322cb7984b316929756dda23789703101cd3/f472834588667d97cfe58641ee7a5df9f14991b1bde6e565646fab39705f89ac/0xce3344b23b00090ea4bfdf57b82a32f8e71a2ce8/1

Mining: /mine/0x35e3322cb7984b316929756dda23789703101cd3

Show Chain: /chain
Create New Block: /chain/block
```