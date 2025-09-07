const { ethers } = require("ethers");

// Infura project ID and Ethereum network URL
const projectId = "4b0244b202fa4e54a1e6bb29f21a9b4f";
const network = "ropsten"; // or "ropsten", "kovan", etc.

// Your contract bytecode and ABI (replace with your own)
const bytecode = '0x608060405234801561001057600080fd5b50336000806101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550610acd806100606000396000f3fe608060405234801561001057600080fd5b50600436106100625760003560e01c80632e343462146100675780633afb7f39146100835780638da5cb5b146100b3578063b21a7b3e146100d1578063c81e25ab14610104578063d2638abd14610137575b600080fd5b610081600480360381019061007c91906106e7565b610167565b005b61009d600480360381019061009891906107ac565b61037e565b6040516100aa919061081a565b60405180910390f35b6100bb6104c2565b6040516100c89190610844565b60405180910390f35b6100eb60048036038101906100e6919061085f565b6104e6565b6040516100fb949392919061089b565b60405180910390f35b61011e6004803603810190610119919061085f565b610606565b60405161012e949392919061089b565b60405180910390f35b610151600480360381019061014c919061085f565b610656565b60405161015e919061081a565b60405180910390f35b60008054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff16146101f5576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016101ec9061093d565b60405180910390fd5b6001600085815260200190815260200160002060009054906101000a900460ff1615610256576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161024d906109a9565b60405180910390fd5b600060405180608001604052803373ffffffffffffffffffffffffffffffffffffffff168152602001858152602001848152602001838152509050806002600087815260200190815260200160002060008201518160000160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550602082015181600101556040820151816002015560608201518160030155905050600180600087815260200190815260200160002060006101000a81548160ff0219169083151502179055507fbec1261351ca7e42d16264436e6165135a458c93cbee15ef4d2a2a5ee2ce19c0853386868660405161036f9594939291906109d8565b60405180910390a15050505050565b60006001600085815260200190815260200160002060009054906101000a900460ff166103e0576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016103d790610a77565b60405180910390fd5b6000600260008681526020019081526020016000206040518060800160405290816000820160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001600182015481526020016002820154815260200160038201548152505090508373ffffffffffffffffffffffffffffffffffffffff16816000015173ffffffffffffffffffffffffffffffffffffffff161480156104b85750828160600151145b9150509392505050565b60008054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b6000806000806001600086815260200190815260200160002060009054906101000a900460ff1661054c576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161054390610a77565b60405180910390fd5b6000600260008781526020019081526020016000206040518060800160405290816000820160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020016001820154815260200160028201548152602001600382015481525050905080600001518160200151826040015183606001519450945094509450509193509193565b60026020528060005260406000206000915090508060000160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16908060010154908060020154908060030154905084565b60016020528060005260406000206000915054906101000a900460ff1681565b600080fd5b6000819050919050565b61068e8161067b565b811461069957600080fd5b50565b6000813590506106ab81610685565b92915050565b6000819050919050565b6106c4816106b1565b81146106cf57600080fd5b50565b6000813590506106e1816106bb565b92915050565b6000806000806080858703121561070157610700610676565b5b600061070f8782880161069c565b9450506020610720878288016106d2565b9350506040610731878288016106d2565b9250506060610742878288016106d2565b91505092959194509250565b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b60006107798261074e565b9050919050565b6107898161076e565b811461079457600080fd5b50565b6000813590506107a681610780565b92915050565b6000806000606084860312156107c5576107c4610676565b5b60006107d38682870161069c565b93505060206107e486828701610797565b92505060406107f5868287016106d2565b9150509250925092565b60008115159050919050565b610814816107ff565b82525050565b600060208201905061082f600083018461080b565b92915050565b61083e8161076e565b82525050565b60006020820190506108596000830184610835565b92915050565b60006020828403121561087557610874610676565b5b60006108838482850161069c565b91505092915050565b610895816106b1565b82525050565b60006080820190506108b06000830187610835565b6108bd602083018661088c565b6108ca604083018561088c565b6108d7606083018461088c565b95945050505050565b600082825260208201905092915050565b7f4f6e6c79206f776e65722063616e206164642061206e65772062617463682e00600082015250565b6000610927601f836108e0565b9150610932826108f1565b602082019050919050565b600060208201905081810360008301526109568161091a565b9050919050565b7f426174636820494420616c7265616479206578697374732e0000000000000000600082015250565b60006109936018836108e0565b915061099e8261095d565b602082019050919050565b600060208201905081810360008301526109c281610986565b9050919050565b6109d28161067b565b82525050565b600060a0820190506109ed60008301886109c9565b6109fa6020830187610835565b610a07604083018661088c565b610a14606083018561088c565b610a21608083018461088c565b9695505050505050565b7f426174636820494420646f6573206e6f742065786973742e0000000000000000600082015250565b6000610a616018836108e0565b9150610a6c82610a2b565b602082019050919050565b60006020820190508181036000830152610a9081610a54565b905091905056fea2646970667358221220ac771c9a83c5434dfc6b1279c3df36eb66963966db9b40b338059c1b463e9c5b64736f6c63430008120033'; // Contract bytecode
const abi = [
    {
        "inputs": [
            {
                "internalType": "bytes32",
                "name": "_batchId",
                "type": "bytes32"
            },
            {
                "internalType": "uint256",
                "name": "_quantity",
                "type": "uint256"
            }
        ],
        "name": "addBatch",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [],
        "stateMutability": "nonpayable",
        "type": "constructor"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": false,
                "internalType": "bytes32",
                "name": "batchId",
                "type": "bytes32"
            },
            {
                "indexed": false,
                "internalType": "address",
                "name": "manufacturer",
                "type": "address"
            },
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "quantity",
                "type": "uint256"
            }
        ],
        "name": "NewBatchAdded",
        "type": "event"
    },
    {
        "inputs": [
            {
                "internalType": "bytes32",
                "name": "",
                "type": "bytes32"
            }
        ],
        "name": "batches",
        "outputs": [
            {
                "internalType": "address",
                "name": "manufacturer",
                "type": "address"
            },
            {
                "internalType": "uint256",
                "name": "quantity",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "bytes32",
                "name": "",
                "type": "bytes32"
            }
        ],
        "name": "batchIds",
        "outputs": [
            {
                "internalType": "bool",
                "name": "",
                "type": "bool"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "bytes32",
                "name": "_batchId",
                "type": "bytes32"
            }
        ],
        "name": "getBatchDetails",
        "outputs": [
            {
                "internalType": "address",
                "name": "",
                "type": "address"
            },
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "owner",
        "outputs": [
            {
                "internalType": "address",
                "name": "",
                "type": "address"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "bytes32",
                "name": "_batchId",
                "type": "bytes32"
            },
            {
                "internalType": "address",
                "name": "_manufacturer",
                "type": "address"
            }
        ],
        "name": "verifyBatch",
        "outputs": [
            {
                "internalType": "bool",
                "name": "",
                "type": "bool"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    }
]; // Contract ABI

// Wallet private key (replace with your own)
const privateKey = "3dd60916be3dcab7472965e6b77cd27a2c7ec69f459dee60360e2676e09811a9";

async function deployContract() {
    // Connect to the Ethereum network using Infura
    const provider = new ethers.providers.InfuraProvider(network, projectId);

    // Create a wallet using your private key
    const wallet = new ethers.Wallet(privateKey, provider);

    // Create a contract factory using the bytecode and ABI
    const factory = new ethers.ContractFactory(abi, bytecode, wallet);

    // Deploy the contract
    const contract = await factory.deploy();
    await contract.deployed();

    // Output the deployed contract address
    console.log("Contract deployed to:", contract.address);
}

deployContract();