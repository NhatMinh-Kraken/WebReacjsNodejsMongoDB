const mongoose = require('mongoose')

const HangXeSchema = new mongoose.Schema({
    name: {
        type: String,
    },

}, {
    timestamps: true
})

module.exports = mongoose.model("HangXes", HangXeSchema)

