const mongoose = require('mongoose')

const laithuSchema = new mongoose.Schema({
    idUser: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Users"
    },

    name: {
        type: String,
    },

    type: {
        type: String,
    },

    money: {
        type: String,
    },

    smoney1: {
        type: String,
    },

    smoney2: {
        type: String,
    },

    smoney3: {
        type: String,
    },

    smoney4: {
        type: String,
    },

    smoney5: {
        type: String,
    },

    sum: {
        type: String,
    },

    date: {
        type: String,
    },

    checked: {
        type: Number,
    },

}, {
    timestamps: true
})

module.exports = mongoose.model("LaiThus", laithuSchema)

