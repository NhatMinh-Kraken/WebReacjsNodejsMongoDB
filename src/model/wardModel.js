const mongoose = require('mongoose')

const wardSchema = new mongoose.Schema({
    name: {
        type: String,
    },

    type: {
        type: String,
    },

    district_id: {
        type: String,
    },

}, {
    timestamps: true
})

module.exports = mongoose.model("Wards", wardSchema)

