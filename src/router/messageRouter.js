const router = require('express').Router()
const messagerModel = require('../model/messagerModel');
const User = require('../model/userModel')


//add
router.post("/messgae", async (req, res) => {
    const { conversitonId, senderId, text, id, notification } = req.body;
    const newMessage = new messagerModel(
        {
            conversitonId, senderId, text
        }
    );

    try {
        const savedMessage = await newMessage.save();
        res.status(200).json(savedMessage);

        // if (savedMessage) {
        //     await User.findOneAndUpdate({
        //         _id: id
        //     }, {
        //         notification
        //     })
        // }
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

router.post("/noti", async (req, res) => {
    const { id, notification, senderId } = req.body;

    try {
        const rest = await User.findOneAndUpdate({
            _id: id
        }, {
            notification: [{
                senderId, notification
            }]
        })
        res.status(200).json(rest);
    } catch (err) {
        res.status(500).json(err);
    }
});

router.post("/noti/:id", async (req, res) => {

    try {
        const { notification, receiverNotiId } = req.body;

        console.log(notification)
        console.log(receiverNotiId)

        await User.updateOne(
            {
                _id: req.params.id, 'notification.senderId': receiverNotiId
            }, {
            $set: {
                'notification.$.notification': notification
            }
        })
        
        res.status(200).json("susscess noti");
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;