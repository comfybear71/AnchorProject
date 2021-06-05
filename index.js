const cors = require('cors');
const express = require('express');
const shortid = require('shortid')

const server = express();

server.use(express.json())
server.use(cors());

const PORT = 5000;

let users = [];


server.get('/', (req, res) => {
    res.json({welcome: 'Welcome to project 2 or PART II'});
})

server.post('/api/users', (req, res) => {
    const userInfo = req.body;
    userInfo.id = shortid.generate();
    users.push(userInfo);
    res.status(201).json(userInfo);
})

server.get('/api/users', (req, res) => {
    res.status(200).json(users)
})

// server.delete('/api/users/:id', (req, res)=>{
//     const { id } = req.params;
//     const deleted = users.find(user => user.id === id)
//     if(deleted) {
//         users = users.filter(user => user.id != id);
//         res.status(200).json(deleted)
//     } else {
//         res.status(404).json({message: "User not found"})
//     }
// })



server.get('/api/users/:wallet', (req, res)=>{
    const {wallet} = req.params;

    const found = users.find(user => user.wallet === wallet)

    const allWalletTransactions = parseArray(found)

    if (found) {
        res.status(200).json(allWalletTransactions)
    } else {
        res.status(404).json({message: "Wallet Address does not exist"})
    }
})

function parseArray(arr) {
    return users.map((messageObject) => {
        return {
            wallet: messageObject.wallet,
            transaction_type: messageObject.transaction_type,
            amount: messageObject.amount,
            txHash: messageObject.txHash,
            id: messageObject.id,
        };
    });
}

server.get('/api/trans/:transaction_type', (req, res)=>{
    const {transaction_type} = req.params;
    

    const found = users.find(user => user.transaction_type === transaction_type)

    const allTransactionsTypes = parseArrayTransactionTypes(found)

    if (found) {
        res.status(200).json(allTransactionsTypes)
    } else {
        res.status(404).json({message: "No Transaction of this type exist"})
    }
})

function parseArrayTransactionTypes(arr) {
    return users.map((messageObject) => {
        return {
            wallet: messageObject.wallet,
            transaction_type: messageObject.transaction_type,
            amount: messageObject.amount,
            txHash: messageObject.txHash,
            id: messageObject.id,
        };
    });
}




// server.put('/api/users/:id', (req, res)=> {
//     const { id } = req.params
//     const changes = req.body
//     const index = users.findIndex(user => user.id === id)

//     if (index != -1) {
//         users[index] = changes
//         res.status(200).json(channels[index])
//     } else {
//         res.status(404).json({message: "Users does not exist"})
//     }
// })

// server.patch('/api/users/:id', (req, res)=> {
//     const { id } = req.params
//     const changes = req.body
//     const found = users.find(user => user.id === id)

//     if (found) {
//         Object.assign(found, changes)
//         res.status(200).json(found)
//     } else {
//         res.status(404).json({message: "User does not exist"})
//     }
// })

server.listen(5000, ()=> {
    console.log(`\n*** server running on http://localhost:${PORT}`);
})
