const db = require('../config/db');

class PostRepository {
    async findAll() {
        const [rows] = await db.promise().query('SELECT * FROM posts');
        return rows;
    }

    async findById(id) {
        const [rows] = await db.promise().query(
            `SELECT p.*, 
              u.id   AS user_id, 
              u.name AS user_name, 
              u.email AS user_email
       FROM posts p
       JOIN users u ON p.user_id = u.id
       WHERE p.id = ?`,
            [id]
        );

        if (!rows.length) return null;

        const row = rows[0];
        return {
            id: row.id,
            title: row.title,
            body: row.body,
            created_at: row.created_at,
            user: {
                id: row.user_id,
                name: row.user_name,
                email: row.user_email,
            },
        };
    }

    async findByUserId(userId) {
        const [rows] = await db.promise().query('SELECT * FROM posts WHERE user_id = ?', [userId]);
        return rows;
    }

    async create(post) {
        const [result] = await db.promise().query('INSERT INTO posts SET ?', post);
        return { id: result.insertId, ...post };
    }
}

module.exports = new PostRepository();