const userRepo = require('../repositories/user.repository');
const bcrypt = require('bcryptjs');

class UserService {
    async getAll() {
        return userRepo.findAll();
    }

    async register({ name, email, password }) {
        const exists = await userRepo.findByEmail(email);
        if (exists) throw new Error('Email already registered');

        const hash = await bcrypt.hash(password, 10);
        return userRepo.create({ name, email, password: hash });
    }
}

module.exports = new UserService();