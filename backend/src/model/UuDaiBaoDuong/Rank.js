const mongoose = require('mongoose')

const RankSchema = new mongoose.Schema({
    tenRank: {
        type: String,
    },

    score: {
        type: String,
    },

    icon: {
        type: String,
    },

    TiLeGiam: {
        type: String,
    },

}, {
    timestamps: true
})

module.exports = mongoose.model("Ranks", RankSchema)

//them sua xoa admin