const mongoose = require('mongoose')

const districtSchema = new mongoose.Schema({
    name: {
        type: String,
    },

    type: {
        type: String,
    },

    city_id: {
        type: String,
    },

}, {
    timestamps: true
})

module.exports = mongoose.model("Districts", districtSchema)

