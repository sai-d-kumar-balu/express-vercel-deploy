const userService = require('../services/user.service');

exports.listUsers = async (req, res, next) => {
    try {
        const users = await userService.getAll();
        res.json(users);
    } catch (err) {
        next(err);
    }
};

exports.signup = async (req, res, next) => {
    try {
        const user = await userService.register(req.body);
        res.status(201).json({ message: 'User created', user });
    } catch (err) {
        next(err);
    }
};