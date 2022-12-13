const router = require('express').Router()
const messagerModel = require('../model/messagerModel');


//add
router.route("/messgae", async (req, res) => {
    const newMessage = new messagerModel({
        members: [req.body.senderId, req.body.receiverId],
    });
    try {
        const savedMessage = await newMessage.save();
        res.status(200).json(savedMessage);
    } catch (err) {
        res.status(500).json(err);
    }
});

//get

router.get("/messgae/:conversationId", async (req, res) => {
    try {
        const messages = await messagerModel.find({
            conversationId: req.params.conversationId,
        });
        res.status(200).json(messages);
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;