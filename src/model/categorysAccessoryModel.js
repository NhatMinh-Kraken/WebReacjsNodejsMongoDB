const mongoose = require('mongoose')

const categoryAccessorySchema = new mongoose.Schema({
    name: {
        type: String,
    },

}, {
    timestamps: true
})

module.exports = mongoose.model("categoryAccessorys", categoryAccessorySchema)

