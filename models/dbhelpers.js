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
    // update,
    // findMessageById,
    // addMessage,
    // findLessonMessages,
    // removeMessage
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

// function update(wallet, changes) {
//     return db('users')
//         .where({ wallet })
//         .update(changes, [wallet])
//     //     .then(() => {
//     //         return findByWallet(changes)
//     // })
// }

// function findMessageById(id) {
//     return db('messages')
//     .where({ id })
//     .first()
// }

// async function addMessage(message, lesson_id) {
//     return await db('messages')
//     .where({ lesson_id })
//     .insert(message, ['id'])
//     // const [id] = await db("messages")
//     // .where({ lesson_id })
//     // .insert(message)
//     // return findMessageById(id)
// }

// function findLessonMessages(lesson_id) {
//     return db('lessons as l')
//     .join("messages as m", "l.id", "m.lesson_id")
//     .select(
//         "l.id as LessonID",
//         "l.name as LessonName",
//         "m.id as MessageID",
//         "m.sender",
//         "m.text"
//     )
//     .where({ lesson_id})
// }

// function removeMessage (id) {
//     return db('messages')
//     .where({ id })
//     .del()
// }

