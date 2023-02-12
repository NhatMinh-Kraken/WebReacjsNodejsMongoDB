const cloudinary = require('cloudinary')
const fs = require('fs')
const { file } = require('googleapis/build/src/apis/file')


cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_API_SECRET,
    cloud_api: process.env.CLOUD_API
})

const uploadController = {
    uploadAvatar: (req, res) => {
        try {
            if (!req.files || Object.keys(req.files).length === 0)
                return res.status(400).json({ msg: 'No files were uploaded.' })

            const file = req.files.file;
            if (file.size > 1024 * 1024) {
                removeTmp(file.tempFilePath)
                return res.status(400).json({ msg: "Size too large" })
            }

            if (file.mimetype !== 'image/jpeg' && file.mimetype !== 'image/png') {
                removeTmp(file.tempFilePath)
                return res.status(400).json({ msg: "File format is incorrect." })
            }

            cloudinary.v2.uploader.upload(file.tempFilePath, { folder: 'avatar', width: 150, height: 150, crop: "fill" }, async (err, result) => {
                if (err) throw err;

                removeTmp(file.tempFilePath)

                res.json({ public_id: result.public_id, url: result.secure_url })
            })
        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    },

    destroyAvatar: (req, res) => {
        try {
            const { public_id } = req.body;
            if (!public_id) return res.status(400).json({ msg: 'No images Selected' })

            cloudinary.v2.uploader.destroy(public_id, async (err, result) => {
                if (err) throw err;

                res.json({ msg: "Deleted Image" })
            })

        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    },

    uploadProduct: (req, res) => {
        try {
            if (!req.files || Object.keys(req.files).length === 0)
                return res.status(400).json({ msg: 'No files were uploaded.' })

            const file = req.files.file;
            if (file.size > 1024 * 1024) {
                removeTmp(file.tempFilePath)
                return res.status(400).json({ msg: "Size too large" })
            }

            if (file.mimetype !== 'image/jpeg' && file.mimetype !== 'image/png') {
                removeTmp(file.tempFilePath)
                return res.status(400).json({ msg: "File format is incorrect." })
            }

            cloudinary.v2.uploader.upload(file.tempFilePath, { folder: "imageProduct" }, async (err, result) => {
                if (err) throw err;

                removeTmp(file.tempFilePath)

                res.json({ public_id: result.public_id, url: result.secure_url })
            })
        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    },

    destroyImage: (req, res) => {
        try {
            const public_id = req.body.public_id;
            if (!public_id) return res.status(400).json({ msg: 'No images Selected' })

            cloudinary.v2.uploader.destroy(public_id, async (err, result) => {
                if (err) throw err;

                res.json({ msg: "Deleted Image" })
            })



        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    },

    uploadMul: async (req, res) => {
        try {
            let imgArr = []
            let images = [...req.body.images]

            //console.log(images)

            for (let i = 0; i < images.length; i++) {
                cloudinary.v2.uploader.upload(images[i].tempFilePath, { folder: "imageProduct" }, async (err, result) => {
                    if (err) throw err;

                    removeTmp(images[i].tempFilePath)

                    imgArr.push({ public_id: result.public_id, url: result.secure_url })
                })
            }

           // console.log(imgArr)
        }

        catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    },

    destroyAllAvatar: async (req, res) => {
        try {
            let DestroyAllAvatar = [...req.body.DestroyAllAvatar]

            if (!DestroyAllAvatar) {
                return res.status(400).json({ msg: 'No images Selected' })
            }

            for (let i = 0; i < DestroyAllAvatar.length; i++) {
                cloudinary.v2.uploader.destroy(DestroyAllAvatar[i].public_id, async (err, result) => {
                    if (err) throw err;

                    // res.json({ msg: "Deleted Image" })
                })
            }
        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    }
}


const removeTmp = (path) => {
    fs.unlink(path, err => {
        if (err) throw err
    })
}

module.exports = uploadController