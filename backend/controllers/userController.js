const User = require('../models/User')
const { generateRefreshToken, generateAccessToken } = require('../utils/generateToken')
const jwt = require('jsonwebtoken')

module.exports = {
    login: async (req, res, next) => {
        try {
            const { email, password } = req.body

            if (!email || !password)
                return res.status(400).json({ errors: { toast: 'Please fill all fields' } })

            const user = await User.findOne({ email }).select('name email method role password')
            if (!user)
                return res.status(404).json({
                    errors: { email: 'You are not registered with us. Pls create an account.' },
                })

            // if (user.method != 'local')
            //     return res.status(404).json({ errors: { toast: 'Please login with google/github' } })

            const isPasswordValid = await user.comparePassword(password)
            if (!isPasswordValid)
                return res.status(401).json({
                    errors: { password: 'The password you entered is incorrect. Please try again' },
                })

            const refreshToken = generateRefreshToken(user._id)
            const accessToken = generateAccessToken(user._id)

            res.cookie(`refresh_token`, refreshToken, {
                maxAge: 30 * 24 * 60 * 60 * 1000,
                httpOnly: true,
            })

            res.status(200).json({
                success: true,
                user: {
                    name: user.name,
                    _id: user._id,
                    email: user.email,
                    accessToken: accessToken,
                },
            })
        } catch (error) {
            next(error)
        }
    },

    signup: async (req, res, next) => {
        try {
            const { email, password } = req.body
            const userExists = await User.findOne({ email })

            if (userExists) res.status(400).json({ message: 'User already exists' })

            const user = await User.create({ email, password })
            if (user) {
                res.status(201).json({ _id: user._id, email: user.email })
            } else {
                res.status(400).json({ message: 'Registration failed' })
            }
        } catch (error) {
            next(error)
        }
    },

    logoutUser: (req, res, next) => {
        try {
            res.cookie('refresh_token', '', {
                httpOnly: true,
                expires: new Date(0),
            })
            res.status(200).json({ message: 'Logged out successfully' })
        } catch (error) {
            next(error)
        }
    },

    profile: (req, res, next) => {
        try {
            console.log('profile')
            res.status(200).json({ user: req.user })
        } catch (error) {
            next(error)
        }
    },

    refreshToken: async (req, res, next) => {
        const refreshToken = req.cookies.refresh_token;
        if (!refreshToken) {
            return res.status(401).json({ message: 'Missing refresh token' });
        }
        try {
            const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_TOKEN_SECRET);
            const user = await User.findById(decoded.userId).select('name email method role password')
            // Generate new access token
            if (!user) return res.status(400).json({ message: 'invalid user' })
            const accessToken = generateAccessToken(decoded.userId)
            res.status(200).json({
                name: user.name,
                _id: user._id,
                email: user.email,
                accessToken: accessToken,
            })
        } catch (error) {
            next(error)
        }
    }
}
