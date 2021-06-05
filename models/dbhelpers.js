// where we write our knex queries
const knex = require('knex')
const config = require('../knexfile')
const db = knex(config.development)
//const db = require('../dbConfig')


module.exports = {
    add,
    find,
    findByWallet,
    removeWallet,
    addTransaction,
    findAllTransactionsForWallet,
}

async function add(user) {
    return await db('users').insert(user, ['id', 'wallet'])
    // const [id] = await db('users').insert(user);
    // return findById(id)
}

function find() {
    return db('users')
}

function findByWallet(wallet) {
    return db('users')
    .where({ wallet: wallet })
    .first()
}

function removeWallet(wallet) {
    return db('users')
    .where({ wallet })
    .del()
}

function findTransaction(id){
    return db('transactions')
    .where({ id })
    .first()
}


async function addTransaction(transaction, user_id) {
    const [id] = await db('transactions')
    .where({ user_id })
    .insert(transaction)
    return findTransaction(id)
}

function findAllTransactionsForWallet(wallet) {
    return db('transactions as t')
    .join("users as u", "t.wallet", "u.wallet")
    .select(
        "u.id as UserID",
        "u.wallet as Wallet_Address",
        "t.id as TransactionID",
        "t.wallet as Wallet",
        "t.transaction_type as TransactionType",
        "t.amount as Amount",
        "t.txHash as txHash"
    )
    .where({wallet})
}


