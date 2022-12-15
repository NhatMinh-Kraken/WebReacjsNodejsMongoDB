const router = require('express').Router()
const conversitonModel = require("../model/conversitonModel")

//new conv

router.post("/convertion", async (req, res) => {
    const newConvertion = new conversitonModel({
        members: [req.body.senderId, req.body.receiverId],
    });
    try {
        const savedConversation = await newConvertion.save();
        res.status(200).json(savedConversation);
    } catch (err) {
        res.status(500).json(err);
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

module.exports = router;