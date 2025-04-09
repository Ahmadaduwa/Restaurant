const catchAsync = require("../utils/catchAsync"); // เพิ่มการ import
const AppError = require('../utils/appError');
const jwt = require("jsonwebtoken");
const { user } = require("../db/models"); // Import model user

const authentication = catchAsync(async (req, res, next) => {

    let idToken = "";

    if(req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
        idToken = req.headers.authorization.split(" ")[1];
    }

    if (!idToken) {
        return next(new AppError("Please login to get access", 401));
    }

    const tokenDetail = jwt.verify(idToken, process.env.JWT_SECRET);

    const freshUser = await user.findByPk(tokenDetail.id)

    if (!freshUser) {
        return next(new AppError("The user no longer exist", 401));
    }

    req.user = freshUser;
    return next(); 
});

const restricTo = (...userTypes) => {
    const cheackPermission = (req, res, next) => {
        if (!userTypes.includes(req.user.userType)) {
            return next(new AppError("You do not have permission to perform this action", 403));
        }
        return next();
    }

    return cheackPermission;
}


module.exports = {authentication, restricTo};