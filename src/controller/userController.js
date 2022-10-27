// const Users = require('../model/userModel')

const db = require('../models/index')

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

            const user = await db.Users.findOne({
                where: {
                    email: email
                },
                raw: true
            })
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

            const check = await db.Users.findOne({
                where: {
                    email: email
                },
                raw: true
            })
            if (check) {
                return res.status(400).json({ msg: "This email already exists." })
            }

            await db.Users.create({
                name, email, password
            })

            res.json({ msg: "Account has been activated!" })

        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    },
    login: async (req, res) => {
        try {
            const { email, password } = req.body
            const user = await db.Users.findOne({
                where: {
                    email: email
                },
                raw: true
            })
            if (!user) {
                return res.status(400).json({ msg: "This email does not exis" })
            }

            const isMatch = await bcrypt.compare(password, user.password)
            if (!isMatch) {
                return res.status(400).json({ msg: "Password is incorrect." })
            }

            const refresh_token = createRefreshToken({ id: user.id })
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
            const user = await db.Users.findOne({
                where: {
                    email: email
                },
                raw: true
            })
            if (!user) {
                return res.status(400).json({ msg: "This email does not exist." })
            }

            const access_token = createAccessToken({ id: user.id })
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

            const user = await db.Users.findOne({
                where: {
                    id: req.user.id,
                },
                raw: false
            })

            if (user) {
                user.password = passwordHash;
                await user.save();
            }

            res.json({ msg: "Password successfully changed!" })
        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    },

    changePassword: async (req, res) => {
        try {
            const { password, oldPassword } = req.body
            const passwordHash = await bcrypt.hash(password, 12)

            const user = await db.Users.findOne({
                where: {
                    id: req.user.id,
                },
                raw: false
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
            const user = await db.Users.findOne({
                where: {
                    id: req.user.id,
                },
                attributes: {
                    exclude: ['password']
                },
                raw: true
            })

            res.json(user)
        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    },
    getUsersAllInfor: async (req, res) => {
        try {
            const user = await db.Users.findAll({
                attributes: {
                    exclude: ['password']
                },
                raw: true
            })
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

            const user = await db.Users.findOne({
                where: {
                    id: req.user.id
                },
                raw: false
            })
            if (user) {
                user.name = name, user.avatar = avatar, user.numberphone = numberphone, user.sex = sex, user.date = date;
                await user.save();
            }
            // await db.Users.findOneAndUpdate({ id: req.user.id }, {
            //     name, avatar, numberphone, sex, date
            // })

            res.json({ msg: "Update Success!" })
        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    },

    updateAddress: async (req, res) => {
        try {
            const { address, cityId, districtId, wardId, nameCity, nameDis, nameWard } = req.body

            const user = await db.Users.findOne({
                where: {
                    id: req.user.id
                },
                raw: false
            })

            if (user) {
                user.address = address, user.cityId = cityId, user.districtId = districtId, user.wardId = wardId, user.nameCity = nameCity, user.nameDis = nameDis, user.nameWard = nameWard;
                await user.save();
            }
            // await db.Users.findOneAndUpdate({ id: req.user.id }, {
            //     address, cityId, districtId, wardId, nameCity
            // })
            res.json({ msg: "Update Success!" })
        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    },

    updateUsersRole: async (req, res) => {
        try {
            const { role } = req.body

            const user = await db.Users.findOne({
                where: {
                    id: req.params.id
                },
                raw: false
            })
            if (user) {
                user.role = role;
                await user.save();
            }

            // await db.Users.findOneAndUpdate({ id: req.params.id }, {
            //     role
            // })

            res.json({ msg: "Update Success!" })
        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    },
    deleteUser: async (req, res) => {
        try {
            const user = await db.Users.findOne({
                where: {
                    id: req.params.id
                }
            })
            if (!user) {
                res.json({ msg: "Not Account!" })
            }
            // await db.Users.findByIdAndDelete(req.params.id)

            await db.Users.destroy({
                where: {
                    id: req.params.id
                }
            })

            res.json({ msg: "Deleted Success!" })
        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    },
    googleLogin: async (req, res) => {
        try {
            const { tokenId } = req.body

            const verify = await client.verifyIdToken({ idToken: tokenId, audience: process.env.MAILING_SERVICE_CLIENT_ID })

            const { email_verified, email, name, picture } = verify.payload

            const password = email + process.env.GOOGLE_SECRET

            const passwordHash = await bcrypt.hash(password, 12)

            if (!email_verified) return res.status(400).json({ msg: "Email verification failed." })

            const user = await db.Users.findOne({
                where: {
                    email: email
                },
                raw: true
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
                // const newUser = new Users({
                //     name, email, password: passwordHash, avatar: picture
                // })

                // await newUser.save()
                const newUser = await db.Users.create({
                    name, email, password: passwordHash, avatar: picture
                })

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

            const user = await db.Users.findOne({
                where: {
                    email: email
                },
                raw: true
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

                // const newUser = new Users({
                //     name, email, password: passwordHash, avatar: picture.data.url
                // })

                const newUser = await db.Users.create({
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
    }
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