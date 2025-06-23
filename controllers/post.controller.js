const postService = require('../services/post.service');

exports.listPosts = async (req, res, next) => {
    try {
        const posts = await postService.getAll();
        res.json({ success: true, message: 'Posts fetched successfully', data: posts });
    } catch (err) {
        next(err);
    }
};

exports.getPost = async (req, res, next) => {
    try {
        const post = await postService.getById(req.query.id);
        if (!post) return res.status(404).json({ success: false, message: 'Post not found', data: null });
        res.json({ success: true, message: 'Post fetched successfully', data: post });
    } catch (err) {
        next(err);
    }
};

exports.createPost = async (req, res, next) => {
    try {
        const post = await postService.create(req.body);
        res.status(201).json({ success: true, message: 'Post created successfully', data: post });
    } catch (err) {
        next(err);
    }
};