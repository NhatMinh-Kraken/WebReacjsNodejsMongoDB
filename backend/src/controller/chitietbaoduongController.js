const Data = require('../model/BaoDuong/ChiTietBaoDuongModel')

const chitietbaoduongController = {
    get: async (req, res) => {
        try {
            const get = await Data.find()
            res.json(get)
        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    },

    create: async (req, res) => {
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

    put: async (req, res) => {
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

    // putForOne: async (req, res) => {
    //     try {

    //         const { Name, Address, Phone, Email } = req.body

    //         await Data.findOneAndUpdate({
    //             _id: req.params.id
    //         }, {
    //             Name, Address, Phone, Email
    //         })
    //         res.json({ msg: "Edit Success!" })
    //     } catch (err) {
    //         return res.status(500).json({ msg: err.message })
    //     }
    // },

    deleted: async (req, res) => {
        try {
            const get = await Data.findOne({
                _id: req.params.id
            })

            if (!get) {
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

    update: async (req, res) => {
        try {
            const { km, thang, LocGioDieuHoa, DauPhanh, BaoDuongHeThongDieuHoa, PinChiaKhoaDieuKhien, PinBoTBox, NuocLamMat, HangMucChung } = req.body
            await Data.findOneAndUpdate({
                _id: req.params.id
            }, {
                km, thang, LocGioDieuHoa, DauPhanh, BaoDuongHeThongDieuHoa, PinChiaKhoaDieuKhien, PinBoTBox, NuocLamMat, HangMucChung
            })

            res.json({ msg: "Update Success!" })
        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    },
}

module.exports = chitietbaoduongController