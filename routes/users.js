var express = require('express');
var router = express.Router();
const userController = require('../controllers/user.controller');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/api/listUsers', userController.listUsers);
router.post('/api/signup', userController.signup);

module.exports = router;
