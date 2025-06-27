const postRepo = require('../repositories/post.repository');
const userRepo = require('../repositories/user.repository');

class PostService {
    async getAll(limit = 10) {
        return postRepo.findAll(limit);
    }

    async getById(id) {
        return postRepo.findById(id);
    }

    async create({ user_id, title, body }) {
        const user = await userRepo.findById(user_id);
        if (!user) throw new Error('User not found');

        return postRepo.create({ user_id, title, body });
    }

    async bulkCreate(posts) {
        if (!Array.isArray(posts) || posts.length === 0) {
            throw new Error('Posts payload must be a non-empty array');
        }

        const userIds = [...new Set(posts.map(p => p.user_id))];

        const validUsers = await Promise.all(userIds.map(id => userRepo.findById(id)));
        const validUserIds = validUsers.filter(Boolean).map(u => u.id);

        const invalidUserIds = userIds.filter(id => !validUserIds.includes(id));
        if (invalidUserIds.length > 0) {
            throw new Error(`Invalid user_id(s): ${invalidUserIds.join(', ')}`);
        }

        return await postRepo.bulkCreate(posts);
    }
}

module.exports = new PostService();