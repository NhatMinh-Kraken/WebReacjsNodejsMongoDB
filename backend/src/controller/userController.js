const Users = require('../model/userModel')

// const db = require('../models/index')

const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const fetch = require('node-fetch')

const sendMail = require('./sendMail')

const { google } = require('googleapis')
const { OAuth2 } = google.auth

const client = new OAuth2(process.env.MAILING_SERVICE_CLIENT_ID)

const { CLIENT_URL } = process.env

const userController = {
    register: async (req, res) => {
        try {
            const { name, email, password } = req.body

            if (!name || !email || !password) {
                return res.status(400).json({ msg: "Please fill in all fields." })
            }

            if (!validateEmail(email)) {
                return res.status(400).json({ msg: "Invalid Email." })
            }

            const user = await Users.findOne({ email })
            if (user) {
                return res.status(400).json({ msg: "This email already exists." })
            }

            if (password.length < 6) {
                return res.status(400).json({ msg: "Password must be at least 6 characters." })
            }

            const passwordHash = await bcrypt.hash(password, 12)

            const newUser = {
                name, email, password: passwordHash
            }

            const activation_token = createActivationToken(newUser)

            const url = `${CLIENT_URL}/user/activation/${activation_token}`

            sendMail(email, url, "Verify your email address")

            res.json({ msg: "Register Succes! Please activate your email to start." })
        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    },
    activateEmail: async (req, res) => {
        try {
            const { activation_token } = req.body
            const user = jwt.verify(activation_token, process.env.ACTIVATION_TOKEN_SECRET)

            const { name, email, password } = user

            const check = await Users.findOne({
                email
            })
            if (check) {
                return res.status(400).json({ msg: "This email already exists." })
            }

            const newUser = new Users({
                name, email, password
            })


            await newUser.save()

            res.json({ msg: "Account has been activated!" })

        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    },
    login: async (req, res) => {
        try {
            const { email, password } = req.body
            const user = await Users.findOne({
                email
            })
            if (!user) {
                return res.status(400).json({ msg: "This email does not exis" })
            }

            const isMatch = await bcrypt.compare(password, user.password)
            if (!isMatch) {
                return res.status(400).json({ msg: "Password is incorrect." })
            }

            const refresh_token = createRefreshToken({ id: user._id })
            res.cookie('refreshtoken', refresh_token, {
                httpOnly: true,
                path: '/user/refresh_token',
                maxAge: 7 * 24 * 60 * 60 * 1000 //7 days
            })

            res.json({ msg: "Login success" })
        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    },
    getAccessToken: (req, res) => {
        try {
            const rf_token = req.cookies.refreshtoken
            if (!rf_token) {
                return res.status(400).json({ msg: "Please login now." })
            }

            jwt.verify(rf_token, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
                if (err) {
                    return res.status(400).json({ msg: "Please login now." })
                }

                const access_token = createAccessToken({ id: user.id })
                res.json({ access_token })
            })

        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    },
    forgotPassword: async (req, res) => {
        try {
            const { email } = req.body
            const user = await Users.findOne({
                email
            })
            if (!user) {
                return res.status(400).json({ msg: "This email does not exist." })
            }

            const access_token = createAccessToken({ id: user._id })
            const url = `${CLIENT_URL}/user/reset/${access_token}`

            sendMail(email, url, "Reset your password")
            res.json({ msg: "Re-send the password, please check your email." })

        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    },
    resetPassword: async (req, res) => {
        try {
            const { password } = req.body

            const passwordHash = await bcrypt.hash(password, 12)

            await Users.findOneAndUpdate({
                _id: req.user.id
            }, {
                password: passwordHash
            })

            res.json({ msg: "Password successfully changed!" })
        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    },

    changePassword: async (req, res) => {
        try {
            const { password, oldPassword } = req.body
            const passwordHash = await bcrypt.hash(password, 12)

            const user = await Users.findOne({
                _id: req.user.id
            })

            const isMatch = await bcrypt.compare(oldPassword, user.password)
            if (!isMatch) {
                return res.status(400).json({ msg: "Please enter the correct password" })
            }
            if (user) {
                user.password = passwordHash;
                await user.save();
            }
            res.json({ msg: "Password successfully changed!" })
        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    },

    getUserInfor: async (req, res) => {
        try {
            const user = await Users.findById(req.user.id).select('-password')

            res.json(user)
        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    },

    //messager
    getUser: async (req, res) => {
        const userId = req.params.id
        //console.log(userId)
        try {
            const user = await Users.findById({ _id: userId }).select('-password')
            res.json(user)
        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    },

    getUsersAllInfor: async (req, res) => {
        try {
            const user = await Users.find().select('-password')
            res.json(user)
        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    },
    logout: async (req, res) => {
        try {
            res.clearCookie('refreshtoken', { path: '/user/refresh_token' })
            return res.json({ msg: "Logged out." })
        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    },
    updateUser: async (req, res) => {
        try {
            const { name, avatar, numberphone, sex, date } = req.body

            await Users.findOneAndUpdate({ _id: req.user.id }, {
                name, avatar, numberphone, sex, date
            })


            res.json({ msg: "Update Success!" })
        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    },

    updateAddress: async (req, res) => {
        try {
            const { address, cityId, districtId, wardId, nameCity, nameDis, nameWard } = req.body

            await Users.findOneAndUpdate({
                _id: req.user.id
            }, {
                address, cityId, districtId, wardId, nameCity, nameDis, nameWard
            })


            res.json({ msg: "Update Success!" })
        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    },

    updateUsersRole: async (req, res) => {
        try {
            const { role } = req.body

            await Users.findOneAndUpdate({ _id: req.params.id }, {
                role
            })


            res.json({ msg: "Update Success!" })
        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    },
    deleteUser: async (req, res) => {
        try {
            const user = await Users.findOne({
                _id: req.params.id
            })
            if (!user) {
                res.json({ msg: "Not Account!" })
            }

            await Users.findByIdAndDelete({
                _id: req.params.id
            })

            res.json({ msg: "Deleted Success!" })
        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    },
    googleLogin: async (req, res) => {
        try {
            // const { tokenId } = req.body

            // const verify = await client.verifyIdToken({ idToken: tokenId, audience: process.env.MAILING_SERVICE_CLIENT_ID })

            const { email, name, picture } = req.body

            const password = email + process.env.GOOGLE_SECRET

            const passwordHash = await bcrypt.hash(password, 12)

            // if (!email_verified) return res.status(400).json({ msg: "Email verification failed." })

            const user = await Users.findOne({
                email
            })

            if (user) {
                const isMatch = await bcrypt.compare(password, user.password)
                if (!isMatch) return res.status(400).json({ msg: "Password is incorrect." })

                const refresh_token = createRefreshToken({ id: user.id })
                res.cookie('refreshtoken', refresh_token, {
                    httpOnly: true,
                    path: '/user/refresh_token',
                    maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
                })

                res.json({ msg: "Login success!" })
            } else {

                const newUser = new Users({
                    name, email, password: passwordHash, avatar: picture
                })

                await newUser.save()

                const refresh_token = createRefreshToken({ id: newUser.id })
                res.cookie('refreshtoken', refresh_token, {
                    httpOnly: true,
                    path: '/user/refresh_token',
                    maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
                })

                res.json({ msg: "Login success!" })
            }

        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    },

    facebookLogin: async (req, res) => {
        try {
            const { accessToken, userID } = req.body

            const URL = `https://graph.facebook.com/v4.0/${userID}/?fields=id,name,email,picture&access_token=${accessToken}`

            const data = await fetch(URL).then(res => res.json()).then(res => { return res })

            const { email, name, picture } = data

            const password = email + process.env.FACEBOOK_SECRET

            const passwordHash = await bcrypt.hash(password, 12)

            const user = await Users.findOne({
                email
            })

            if (user) {
                const isMatch = await bcrypt.compare(password, user.password)
                if (!isMatch) return res.status(400).json({ msg: "Password is incorrect." })

                const refresh_token = createRefreshToken({ id: user.id })
                res.cookie('refreshtoken', refresh_token, {
                    httpOnly: true,
                    path: '/user/refresh_token',
                    maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
                })

                res.json({ msg: "Login success!" })
            } else {

                const newUser = new Users({
                    name, email, password: passwordHash, avatar: picture.data.url
                })
                await newUser.save()

                const refresh_token = createRefreshToken({ id: newUser.id })
                res.cookie('refreshtoken', refresh_token, {
                    httpOnly: true,
                    path: '/user/refresh_token',
                    maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
                })

                res.json({ msg: "Login success!" })
            }


        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    },

    insertNvUser: async (req, res) => {
        try {
            const jokes = req.body;

            for (let item of jokes) {
                const passwordHash = await bcrypt.hash(String(item.password), 12)
                item.password = passwordHash
            }

            await Users.insertMany(jokes, (error, docs) => {
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

    updateNvUser: async (req, res) => {
        try {
            const jokes = req.body;

            const promises = jokes.map(async (item) => {

                const passwordHash = await bcrypt.hash(String(item.password), 12)

                const res = await Users.findByIdAndUpdate(item._id, {
                    $set: {
                        ...item,
                        password: passwordHash
                    },
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

    findNvCV: async (req, res) => {
        try {
            const get = await Users.find({
                chucvucuthe: 2
            })
            res.json(get)
        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    },
}

const validateEmail = (email) => {
    return email.match(
        /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
};

const createActivationToken = (payload) => {
    return jwt.sign(payload, process.env.ACTIVATION_TOKEN_SECRET, { expiresIn: '5m' })
}

const createAccessToken = (payload) => {
    return jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '15m' })
}

const createRefreshToken = (payload) => {
    return jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '7d' })
}


module.exports = userController