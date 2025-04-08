const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const dotenv = require("dotenv");
dotenv.config();

const generateToken = (payload) => {
    try {
        return jwt.sign(payload, process.env.JWT_SECRET, {
            expiresIn: process.env.JWT_EXPIRATION_TIME,
        });
    } catch (err) {
        console.error(err);
        return null;
    }
};

const db = require("../db/models");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");
const User = db.user; 

router.post('/signup', catchAsync( async (req, res, next) => {
    try {
        const body = req.body;

        if (!['1', '2'].includes(body.userType)) {
            throw new AppError("Invalid user type", 400);
        }

        const newUser = await User.create({
            email: body.email,
            password: body.password,
            comfirmPassword: body.comfirmPassword,
            userType: body.userType,
            firstName: body.firstName,
            lastName: body.lastName,
        });

        if (!newUser) {
            return next(new AppError('Failed to create the user', 400));
        }

        const result = newUser.toJSON();
        delete result.password; 
        delete result.comfirmPassword; 
        delete result.deletedAt; 

        result.token = generateToken({
            id: result.id,
        });

        return res.status(201).json({ 
            message: "User created successfully",
            status: "success",
            data: result
        });

    } catch (error) {
        console.log(error.name, error.message, error.stack);
        next(error);
    }
}));

router.post('/login', catchAsync(async (req, res, next) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return next(new AppError("Email and password are required", 400));
    }

    const result = await User.findOne({ where: { email } });
    if (!result || !(await bcrypt.compareSync(password, result.password))) {
        return next(new AppError("Invalid email or password", 401));
    }

    const token = generateToken({
        id: result.id,
    });

    return res.json({ 
        message: "Login successful",
        status: "success",
        token: token
    });
}));

module.exports = router;
