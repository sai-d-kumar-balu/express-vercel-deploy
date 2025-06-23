var express = require('express');
var router = express.Router();
const postController = require('../controllers/post.controller');

/* GET users listing. */
router.get('/', function (req, res, next) {
    res.send('respond with a resource');
});

router.get('/api/listPosts', postController.listPosts);
router.get('/api/getPost', postController.getPost);
router.post('/api/createPost', postController.createPost);

module.exports = router;
