const mongoose = require('mongoose')

const DaiLySchema = new mongoose.Schema({
    jokeId: {
        type: String
    },
    Name: {
        type: String,
    },

    Latitude: {
        type: Number
    },

    Longitude: {
        type: Number
    },

    Address: {
        type: String
    },

    Phone: {
        type: String
    },

    Email: {
        type: String
    }

}, {
    timestamps: true
})

module.exports = mongoose.model("DaiLys", DaiLySchema)

