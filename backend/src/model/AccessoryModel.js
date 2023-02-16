const mongoose = require('mongoose')

const accessorySchema = new mongoose.Schema({
    name: {
        type: String,
    },

    loaiphukien: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'categoryAccessorys'
    },

    hangxe: {
        type: mongoose.Schema.Types.ObjectId, ref: 'HangXes'
    },

    loaixe: {
        type: mongoose.Schema.Types.ObjectId, ref: 'Categorys'
    },

    mota: {
        type: Text
    },

    tag: {
        type: String,
    },

    images: {
        type: Array
    },

    money: {
        type: String
    },

    Soluong: {
        type: String
    }

}, {
    timestamps: true
})

module.exports = mongoose.model("accessorys", accessorySchema)

