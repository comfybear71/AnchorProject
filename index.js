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

//ADD A TRANSACTION RECORD
server.post('/api/users/:wallet/transactions', (req, res)=> {
    
    const { wallet } = req.params
    const transaction = req.body
    
    Users.findByWallet(wallet)
    .then(user => {
        var id = user.id

        if (!transaction.user_id) {
            transaction["user_id"] = parseInt(id, 10)
        }

        Users.findByWallet(wallet)
        .then(user => {
            if(!user) {
                res.status(404).json({ message: "Invalid Wallet address"})
            } 
        
            // Check for all required fields
            if(!transaction.wallet || !transaction.transaction_type || !transaction.amount || !transaction.txHash) {
                res.status(400).json({ message: "Must provide all fields, transaction_type, amount, txHash"})
            }
            Users.addTransaction(transaction, id)
            .then(trans => {
                if(trans) {
                    res.status(200).json( trans )
                } 
            })
            .catch(err => {
                res.status(500).json({ message: "Transaction Failed"})
            })
        })
        .catch(err => {
            res.status(500).json({ message: "ERROR ADDING TRANSACTION"})
        })
    })
})

//FIND ALL TRANSACTIONS BY WALLET ADDRESS
server.get('/api/transactions/:wallet', (req, res) => {
    const { wallet } = req.params

    Users.findAllTransactionsForWallet(wallet)
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


server.listen(5000, ()=> {
    console.log(`\n*** server running on http://localhost:${PORT}`);
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

