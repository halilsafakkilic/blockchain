# HSK Blockchain API Server
This project uses [Flask](https://github.com/pallets/flask) framework.

API server have this functionalities;
* Create Keys (with ECDSA) and Address (with keccak_256)
* Create New Blockchain (with Genesis Block)
* Block Verification [+Mining] (with Nonce for Difficulty)
* Create Transaction (Coin + Data)
* Account Balance + Nonce (for Replay Attack) Management

### Installation & Running
Firstly must be installed dependencies.

```pip install -r requirements.txt```

And then you can use these command for running;
```
export FLASK_APP=api.py
export FLASK_ENV=development
python -m flask run -h localhost -p 3000
```

### Services
You can read _api.py_ file for available services. All services are used in UI.