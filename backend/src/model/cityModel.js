const mongoose = require('mongoose')

const citySchema = new mongoose.Schema({
    name: {
        type: String,
    },

    type: {
        type: String,
    },

}, {
    timestamps: true
})

module.exports = mongoose.model("Citys", citySchema)

