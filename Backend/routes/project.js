const express = require("express");
const router = express.Router();
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");
const { authentication, restricTo } = require("../middleware/authMiddleware");
const db = require("../db/models");
const { where } = require("sequelize");

router.post('/create', authentication, restricTo('1'), catchAsync( async (req, res, next) => {
    try {
        const body = req.body;
        const userId = req.user.id;
        
        const newProject = await db.project.create({
            title: body.title,
            isFeatured: body.isFeatured || false,
            productImage: body.productImage,
            price: body.price,
            shortDescription: body.shortDescription,
            description: body.description,
            productUrl: body.productUrl,
            category: body.category,
            tags: body.tags,
            createdBy: userId,
        });

        res.status(201).json({
            status: "success",
            data: {
                project: newProject,
            },
        });
    } catch (error) {
        console.log(error.name, error.message, error.stack);
        next(error);
    }
}));

router.get('/get/all', authentication, restricTo('1', '2'), catchAsync(async (req, res, next) => {
    try {
        const userId = req.user.id;

        const projects = await db.project.findAll({
            include: {
                model: db.user,
                as: 'user',
            },
            where: { createdBy: userId},
            order: [['createdAt', 'DESC']],
        });

        res.status(200).json({
            status: "success",
            data: {
                projects,
            },
        });
    } catch (error) {
        console.log(error.name, error.message, error.stack);
        next(error);
    }
}));

router.get('/get/:id', authentication, catchAsync(async (req, res, next) => {
    try {
        const projectId = req.params.id;
        const result = await db.project.findByPk(projectId, {include: {model: db.user, as: 'user'}});
        if (!result) {
            return next(new AppError("Project not found", 404));
        }

        res.status(200).json({
            status: "success",
            data: {
                result,
            },
        });
    } catch (error) {
        console.log(error.name, error.message, error.stack);
        next(error);
    }
}));

router.patch('/update/:id', authentication, restricTo('1'), catchAsync(async (req, res, next) => {
    try {
        const projectId = req.params.id;
        const body = req.body;
        const userId = req.user.id;

        const project = await db.project.findOne({
            where: { id: projectId, deletedAt: null, createdBy: userId },
        });
        if (!project) {
            return next(new AppError("Project not found", 404));
        }

        const updatedData = {};
        for (const key in body) {
            if (body[key] !== null && body[key] !== undefined) {
                updatedData[key] = body[key];
            }
        }

        await project.update(updatedData);

        res.status(200).json({
            status: "success",
            data: {
                project,
            },
        });

    } catch (error) {
        console.log(error.name, error.message, error.stack);
        next(error);
    }
}));

router.delete('/delete/:id', authentication, restricTo('1'), catchAsync(async (req, res, next) => {
    try {
        const projectId = req.params.id;
        const userId = req.user.id;

        const project = await db.project.findOne({
            where: { id: projectId, deletedAt: null, createdBy: userId },
        });
        if (!project) {
            return next(new AppError("Project not found", 404));
        }

        await project.destroy();

        res.status(200).json({
            status: "success",
            message: "Project deleted successfully",
            data: null,
        });
    } catch (error) {
        console.log(error.name, error.message, error.stack);
        next(error);
    }
}));

module.exports = router;
