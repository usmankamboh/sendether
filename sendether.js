const Web3 = require('web3');
const web3 = new Web3('https://ropsten.infura.io/v3/YOUR-PROJECT-ID');

const contractAddress = 'CONTRACT-ADDRESS-HERE';
const contractAbi = [
    {
        "inputs": [],
        "stateMutability": "nonpayable",
        "type": "constructor"
    },
    {
        "inputs": [
            {
                "internalType": "address payable",
                "name": "_recipient",
                "type": "address"
            },
            {
                "internalType": "uint256",
                "name": "_amount",
                "type": "uint256"
            }
        ],
        "name": "transferEther",
        "outputs": [],
        "stateMutability": "payable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "user",
                "type": "address"
            }
        ],
        "name": "getbalance",
        "outputs": [
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
        "inputs": [
            {
                "internalType": "address",
                "name": "user",
                "type": "address"
            }
        ],
        "name": "ledger",
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
    }
];

const contract = new web3.eth.Contract(contractAbi, contractAddress);

// Transfer 0.1 Ether to the recipient address
const recipientAddress = 'RECIPIENT-ADDRESS-HERE';
const amount = web3.utils.toWei('0.1', 'ether');
const options = {
    value: amount,
    gasPrice: web3.utils.toWei('10', 'gwei')
};
contract.methods.transferEther(recipientAddress, amount).send(options)
    .on('transactionHash', function(hash) {
        console.log('Transaction hash: ' + hash);
    })
    .on('confirmation', function(confirmationNumber, receipt) {
        console.log('Confirmation number: ' + confirmationNumber);
    })
    .on('receipt', function(receipt) {
        console.log('Receipt:', receipt);
    })
    .on('error', function(error) {
        console.error('Error:', error);
    });

// Get the balance of an address
const userAddress = 'USER-ADDRESS-HERE';
contract.methods.getbalance(userAddress).call()
    .then(function(balance) {
        console.log('Balance of ' + userAddress + ': ' + web3.utils.fromWei(balance, 'ether') + ' Ether');
    })
    .catch(function(error) {
        console.error('Error:', error);
    });

// Get the transaction details of an address
contract.methods.ledger(userAddress).call()
    .then(function(result) {
        console.log('Recipient address: ' + result[0]);
        console.log('Amount transferred: ' + web3.utils.fromWei(result[1], 'ether') + ' Ether');
    })
    .catch(function(error) {
        console.error('Error:', error);
    });