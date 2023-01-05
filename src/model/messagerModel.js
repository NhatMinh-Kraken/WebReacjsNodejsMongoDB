const mongoose = require('mongoose')

const messagerSchema = new mongoose.Schema({
    conversitonId: {
        type: String,
    },
    senderId: {
        type: String,
    },
    text: {
        type: String,
    },
}, {
    timestamps: true
})

module.exports = mongoose.model("Messagers", messagerSchema)

