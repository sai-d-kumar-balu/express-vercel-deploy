const db = require('../config/db');

class UserRepository {
    async findAll() {
        const [rows] = await db.promise().query('SELECT * FROM users');
        return rows;
    }

    async findById(id) {
        const [rows] = await db.promise().query('SELECT * FROM users WHERE id = ?', [id]);
        return rows[0] || null;
    }

    async findByEmail(email) {
        const [rows] = await db.promise().query(
            'SELECT * FROM users WHERE email = ?', [email]
        );
        return rows[0] || null;
    }

    async create(user) {
        const [result] = await db.promise().query(
            'INSERT INTO users SET ?', user
        );
        return { id: result.insertId, ...user };
    }
}

module.exports = new UserRepository();