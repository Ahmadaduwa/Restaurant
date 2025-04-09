const express = require("express");
const router = express.Router();
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");
const { authentication, restricTo } = require("../middleware/authMiddleware");
const { sanitizeBody } = require('../middleware/sanitize.js');
const db = require("../db/models");

router.get("/", authentication, restricTo("0"), catchAsync(async (req, res, next) => {
    try {
        const users = await db.user.findAndCountAll({
            where: {
                userType: {
                    [db.Sequelize.Op.ne]: "0" //ไม่ให้แสดง userType 0
                } 
            },
            attributes: { exclude: ["password"] },
        });
    
        return res.status(200).json({
            status: "success",
            data: {
                users: users.rows,
                count: users.count,
            },
        });
    }
    catch (error) {
        console.log(error.name, error.message, error.stack);
        next(error);
    }
  })
);


module.exports = router;
