const db = require('../models/index.js')

exports.newOrder = async (msg) => {
    const {user_id, number_of_items, total_amount} = msg
    // const user_id = msg.user_id
    // const number_of_items = msg.number_of_items
    // const total_amount = msg.total_amount
    console.log(user_id, number_of_items, total_amount, msg, "HERE")
    db.Order.create({ user_id, number_of_items, total_amount })
}
