const router = require('express').Router()
const messagerModel = require('../model/messagerModel');


//add
router.post("/messgae", async (req, res) => {
    const { conversitonId, senderId, text } = req.body;
    const newMessage = new messagerModel(
        {
            conversitonId, senderId, text
        }
    );

    try {
        const savedMessage = await newMessage.save();
        res.status(200).json(savedMessage);
    } catch (err) {
        res.status(500).json(err);
    }
});

//get

router.get("/messgae/:conversitonId", async (req, res) => {

    try {
        const messages = await messagerModel.find({
            conversitonId: req.params.conversitonId,
        })
        res.status(200).json(messages);
    } catch (err) {
        res.status(500).json(err);
    }
});


module.exports = router;