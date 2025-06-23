const postRepo = require('../repositories/post.repository');
const userRepo = require('../repositories/user.repository');

class PostService {
    async getAll() {
        return postRepo.findAll();
    }

    async getById(id) {
        return postRepo.findById(id);
    }

    async create({ user_id, title, body }) {
        // Ensure the user exists
        const user = await userRepo.findById(user_id);
        if (!user) throw new Error('User not found');

        return postRepo.create({ user_id, title, body });
    }
}

module.exports = new PostService();