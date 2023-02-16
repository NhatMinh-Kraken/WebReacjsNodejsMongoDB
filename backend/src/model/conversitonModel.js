const mongoose = require('mongoose')

const conversitonSchema = new mongoose.Schema({
    members: {
        type: Array,
    },

}, {
    timestamps: true
})

module.exports = mongoose.model("Conversitons", conversitonSchema)

