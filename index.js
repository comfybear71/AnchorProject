const cors = require('cors');
const express = require('express');
const Users = require('./models/dbhelpers');

const server = express();

server.use(express.json())
server.use(cors());

const PORT = 5000;

server.get('/', (req, res) => {
    res.json({welcome: 'Welcome to project 3 or PART III'});
})

//ADD NEW WALLET WHEN WALLET CONNECTS
server.post('/api/users', (req, res) => {
    Users.add(req.body)
    .then(user => {
        res.status(200).json(user)
    })
    .catch(err => {
        res.status(500).json({ message: "Can not add Wallet, already exists"})
    })
})

//FINDS ALL WALLETS
server.get('/api/users', (req, res) => {
    Users.find()
    .then(users => {
        res.status(200).json(users)
    })
    .catch(err => {
        res.status(500).json({ message: "Can not get Wallet"})
    })
    
})

//FIND A WALLET BY WALLET ADDRESS
server.get('/api/users/:wallet', (req, res) => {
    const { wallet } = req.params

    Users.findByWallet(wallet)
    .then(user => {
        if (user){
            res.status(200).json(user)
        } else {
            res.status(404).json({message: "Wallet not Found..."})
        }
    })
    .catch(err => {
        res.status(500).json({ message: "There is a problem..."})
    })
})

//DELETES A WALLET BY USING WALLET ADDRESS
server.delete ('/api/users/:wallet', (req, res) => {
    const { wallet } = req.params
    Users.removeWallet(wallet)
    .then(count => {
        if (count > 0) {
            res.status(200).json({ message: "Successfully deleted Wallet"})
        } else {
            res.status(404).json({message: "Unable to locate Wallet"})
        }
    })
    .catch(err => {
        res.status(500).json({ message: "Unable to perform operation"})
    })
})

//UPDATE A WALLET USING WALLET ADDRESS - I DO NOT NEED THIS FUNCTION!!!!!
// server.patch('/api/users/:wallet', (req, res)=> {
//     const { wallet } = req.params
//     const changes = req.body
//     Users.update(wallet, changes)
//     .then(user_wallet => {
//         if (user_wallet) {
//             res.status(200).json(user_wallet)
//         } else {
//             res.status(404).json({message: "Wallet does not exist"})
//         }
//     })
//     .catch(err => {
//         res.status(500).json({ message: "Unable to perform UPDATE operation"})
//     })
// })



server.listen(5000, ()=> {
    console.log(`\n*** server running on http://localhost:${PORT}`);
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



// server.get('/api/users/:wallet', (req, res)=>{
//     const {wallet} = req.params;

//     const found = users.find(user => user.wallet === wallet)

//     const allWalletTransactions = parseArray(found)

//     if (found) {
//         res.status(200).json(allWalletTransactions)
//     } else {
//         res.status(404).json({message: "Wallet Address does not exist"})
//     }
// })

// function parseArray(arr) {
//     return users.map((messageObject) => {
//         return {
//             wallet: messageObject.wallet,
//             transaction_type: messageObject.transaction_type,
//             amount: messageObject.amount,
//             txHash: messageObject.txHash,
//             id: messageObject.id,
//         };
//     });
// }

// server.get('/api/trans/:transaction_type', (req, res)=>{
//     const {transaction_type} = req.params;
    

//     const found = users.find(user => user.transaction_type === transaction_type)

//     const allTransactionsTypes = parseArrayTransactionTypes(found)

//     if (found) {
//         res.status(200).json(allTransactionsTypes)
//     } else {
//         res.status(404).json({message: "No Transaction of this type exist"})
//     }
// })

// function parseArrayTransactionTypes(arr) {
//     return users.map((messageObject) => {
//         return {
//             wallet: messageObject.wallet,
//             transaction_type: messageObject.transaction_type,
//             amount: messageObject.amount,
//             txHash: messageObject.txHash,
//             id: messageObject.id,
//         };
//     });
// }




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

