const Data = require("../model/BaoDuong/optionBaoDuongModel")
const DataNew = require("../model/BaoDuong/loaiDichVuModel")

const optionBaoDuongController = {

    get: async (req, res) => {
        try {
            const get = await Data.find().populate("IdLoaiDichVu")
            res.json(get)
        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    },

    getProductToType: async (req, res) => {
        try {
            const get = await Data.aggregate([

                {
                    $lookup: {
                        from: 'loaidichvus',
                        localField: 'IdLoaiDichVu',
                        foreignField: '_id',
                        as: 'IdLoaiDichVu'
                    },
                },

                {
                    $unwind: "$IdLoaiDichVu"
                },

                {
                    $group: {
                        _id: "$IdLoaiDichVu",
                        records: {
                            $push: "$$ROOT"
                        },
                    }
                },
            ])

            res.json(get)

           // console.log(get)

        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    },

    edit: async (req, res) => {
        try {
            const { name, mota, money, IdLoaiDichVu } = req.body
            await Data.findOneAndUpdate({
                _id: req.params.id
            }, {
                name, mota, money, IdLoaiDichVu
            })

            res.json({ msg: "Update Success!" })
        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    },

    delete: async (req, res) => {
        try {
            const de = await Data.findOne({
                _id: req.params.id
            })

            if (!de) {
                res.json({
                    msg: "Not Category"
                })
            }

            await Data.findByIdAndDelete(req.params.id)
            res.json({ msg: "Deleted Success!" })
        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    },

    insert: async (req, res) => {
        try {
            const jokes = req.body;

            await Data.insertMany(jokes, (error, docs) => {
                if (docs) {
                    res
                        .status(200)
                        .json({ success: true, message: "Insert success" });
                }
                if (error) {
                    console.log("insertMany error: ", error);
                    res.status(400).json({
                        success: false,
                        error: error,
                        message: "jokes-bulk-insert failed",
                    });
                }
            });
        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    },

    update: async (req, res) => {
        try {
            const jokes = req.body;

            const promises = jokes.map(async (item) => {
                const res = await Data.findByIdAndUpdate(item._id, {
                    $set: { ...item },
                });

                return res;
            });

            Promise.all(promises)
                .then(() =>
                    res.json({ success: true, message: "Update success" })
                )
                .catch((err) => res.status(400).json(err));
        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    },

    editMultipleCheck: async (req, res) => {
        try {
            let checkId = [...req.body.checkId]
            let { loaihinhbaoduong } = req.body

            for (let i = 0; i < checkId.length; i++) {
                await Data.findOneAndUpdate({
                    _id: checkId[i]._id
                }, {
                    IdLoaiDichVu: loaihinhbaoduong
                })
            }
            res.json({ msg: "Edit Success!" })
        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    }
}

module.exports = optionBaoDuongController