const Account = require('./../../models/Account')
const jwt = require('jsonwebtoken')
const AppError = require('../../utils/AppError')

const signToken = (id, role) => {
    return jwt.sign(
        { id, role },
        process.env.jwt_secret,
        { expiresIn: process.env.jwt_expires_in }
    )
}

const createSendToken = (id, role, res, tokenName) => {
    const token = signToken(id, role);
    const cookieOptions = {
        expires: new Date(Date.now() + process.env.cookie_expires_in * 60 * 1000),
        httpOnly: true
    };

    res.cookie(tokenName, token, cookieOptions);
}

const signup = async (req, res, next) => {
    try {
        const { email, username, password } = req.body;

        if (!email || !username || !password) {
            return next(new AppError('Please provide a valid email and username and password', 400))
        }
        // Truong hop chua ton tai account
        let newAccount = await Account.create({ email, username, password });

        createSendToken(newAccount._id.toString(), newAccount.role, res, 'token');

        res.status(200).json({
            status: "Sign up successfully",
            page: '/user'
        })
    } catch (error) {
        res.status(400).json({
            status: "Sign up failed",
            message: error
        })
    }
}

const isLoggedIn = async (req, res, next) => {
    if (req.cookies.token) {
        const decoded = await jwt.decode(req.cookies.token, { complete: true })
        const id = decoded.payload.id
        const user = await Account.findById(id).lean()
        if (!user) {
            return next(new AppError('Invalid token', 400));
        }
        return next()
    }
    else {
        return res.redirect('/signin');
    }
}

const firebaseSignupHandle = async (req, res, next) => {
    try {
        const { user } = req.body
        if (!user) {
            return next(new AppError('There is no valid request', 400))
        }

        const mongoData = {
            username: user.uid,
            email: user.email,
            displayName: user.displayName,
            role: 'user',
            password: user.stsTokenManager.accessToken,
            auth: 'firebase'
        }

        const newUser = await Account.create(mongoData)
        createSendToken(newUser._id, newUser.role, res, 'token')

        res.status(200).json({
            status: "Redirect to firebase successfully",
            page: '/user'
        })
    } catch (error) {
        res.status(400).json({
            status: "Firebase sign up failed",
            message: error
        })
    }
}

const firebaseSigninHandle = async (req, res, next) => {
    try {
        const { user } = req.body
        if (!user) {
            return next(new AppError('There is no valid request', 400))
        }

        const currentUser = await Account.findOne({
            username: user.uid,
            auth: 'firebase'
        })
        createSendToken(currentUser._id, currentUser.role, res, 'token')
        res.status(200).json({
            status: "Redirect to firebase successfully",
            page: '/user'
        })
    } catch (error) {
        res.status(400).json({
            status: "Firebase sign in failed",
            message: error
        })
    }
}

const signOut = async (req, res, next) => {
    try {
        if (req.cookies.token) {
            res.clearCookie('token');
            res.status(200).json({
                status: "Signout successful",
                page: '/'
            });
        }
    } catch (error) {
        res.status(400).json({
            status: 'Sign out failed',
            message: error
        });
    }
}

const signIn = async (req, res, next) => {
    try {
        const { username, password } = req.body;
        if (!username || !password) {
            return next(new AppError('Please provide a valid username and password', 400))
        }
        const account = await Account.findOne({ username }).select('+password');
        if (account.correctPassword(password, account.password)) {
            createSendToken(account._id, account.role, res, 'token')
            res.status(200).json({
                status: "Sign in successfully",
                page: `/${account.role}`
            })
        }
        else {
            return next(new AppError('There is no user', 400))
        }
    } catch (error) {
        res.status(400).json({
            status: "Sign up failed",
            message: error
        })
    }
}

const firewallUrlHandle = async (req, res, next) => {
    try {
        const decoded = await jwt.decode(req.cookies.token, { complete: true })
        const role = decoded.payload.role
        const id = decoded.payload.id

        const page = `/${role}`
        if (!role) {
            return next(new AppError('There is no page url for redirect', 400))
        }
        else {
            let url_target = req.originalUrl
            if (url_target == '/') {
                return next();
            }
            else if (url_target.includes(page) == false) {
                return next(new AppError('You do not have permission to access this page', 400))
            }
            return next();
        }
    } catch (error) {
        res.status(400).json({
            status: "Redirect failed",
            message: error
        })
    }
}


module.exports = { signup, isLoggedIn, firebaseSignupHandle, signOut, signIn, firebaseSigninHandle, firewallUrlHandle }