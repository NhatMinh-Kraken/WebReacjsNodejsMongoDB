const mongoose = require('mongoose')

const productcarSchema = new mongoose.Schema({
    name: {
        type: String,
    },

    type: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Categorys"
    },

    money: {
        type: String,
    },
    colortypeone: {
        type: Array,
    },
    colortypetwo: {
        type: Array,
    },
    colortypethree: {
        type: Array,
    },
    energy: {
        type: Number,
    },
    avatar: {
        type: Array,
    },
    description: {
        type: String,
    },
    descriptionHTML: {
        type: String,
    },
    specifications: {
        type: String,
    },
    specificationsHTML: {
        type: String,
    },
    checked: {
        type: Boolean,
        default: false
    },
    checkThinhHanh: {
        type: Number,
        default: 0
    },
    amount: {
        type: Number,
    },

    laithu: {
        type: Number,
        default: 0
    }

}, {
    timestamps: true
})

module.exports = mongoose.model("ProductCars", productcarSchema)

