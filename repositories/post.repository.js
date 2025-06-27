const db = require('../config/db');

class PostRepository {
    async findAll(limit = 10) {
        const [rows] = await db.promise().query(
            'SELECT * FROM posts ORDER BY created_at DESC LIMIT ?',
            [limit]
        );
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

    async bulkCreate(posts) {
        if (!Array.isArray(posts) || posts.length === 0) {
            throw new Error('Input must be a non-empty array of post objects');
        }

        const values = posts.map(post => [post.user_id, post.title, post.body]);
        const [result] = await db.promise().query(
            'INSERT INTO posts (user_id, title, body) VALUES ?',
            [values]
        );

        return {
            insertedCount: result.affectedRows,
            firstInsertId: result.insertId,
        };
    }
}

module.exports = new PostRepository();