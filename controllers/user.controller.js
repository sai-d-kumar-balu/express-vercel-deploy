const userService = require('../services/user.service');

exports.listUsers = async (req, res, next) => {
    try {
        const users = await userService.getAll();
        res.json({
            success: true,
            message: 'Users fetched successfully',
            data: users,
        });
    } catch (err) {
        next(err);
    }
};

exports.signup = async (req, res, next) => {
    try {
        const user = await userService.register(req.body);
        res.status(201).json({
            success: true,
            message: 'User created successfully',
            data: user,
        });
    } catch (err) {
        next(err);
    }
};