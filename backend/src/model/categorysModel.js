const mongoose = require('mongoose')

const categorySchema = new mongoose.Schema({
    name: {
        type: String,
    },

    checkThinhHanh: {
        type: Number,
        default: 0
    },

}, {
    timestamps: true
})

module.exports = mongoose.model("Categorys", categorySchema)

