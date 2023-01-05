const router = require('express').Router()
const auth = require('../middleware/auth');
const conversitonModel = require("../model/conversitonModel")

//new conv

router.post("/convertion", auth, async (req, res) => {
    const senderId = req.body.senderId
    const receiverId = req.body.receiverId

    const checkConversation = await conversitonModel.find({
        members: { $in: senderId },
    })

    if (checkConversation.length === 0) {
        const newConvertion = new conversitonModel({
            members: [senderId, receiverId],
        });
        try {
            const savedConversation = await newConvertion.save();
            res.status(200).json(savedConversation);
        } catch (err) {
            res.status(500).json(err);
        }
    }
});

//find

router.get("/convertion/:userId", async (req, res) => {
    try {
        const conversation = await conversitonModel.find({
            members: { $in: [req.params.userId] },
        });
        res.status(200).json(conversation);
    } catch (err) {
        res.status(500).json(err);
    }
})

router.get("/find/:firstId/:secondId", async (req, res) => {
    try {
        const conversation = await conversitonModel.findOne({
            members: { $all: [req.params.firstId, req.params.secondId] },
        });
        res.status(200).json(conversation);
    } catch (err) {
        res.status(500).json(err);
    }
})

module.exports = router;