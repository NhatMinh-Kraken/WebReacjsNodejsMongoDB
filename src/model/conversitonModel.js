const mongoose = require('mongoose')

const conversitonSchema = new mongoose.Schema({
    member: {
        type: Array,
    },

}, {
    timestamps: true
})

module.exports = mongoose.model("Conversitons", conversitonSchema)

