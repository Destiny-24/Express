var express = require('express');
var router = express.Router();
var cors = require('./../middlewares/cors.js');
var csrf = require('./../middlewares/csrf.js');
var bookController = require('./../controllers/book');
var userController = require('./../controllers/user');
var authController = require('./../controllers/auth');

/* GET users listing. */
router.get('/isbn', cors.allowAll,bookController.info);

// 使用使用 CSRF 中间件，检查token
router.post('/user' ,csrf.getToken, userController.insert);
router.put('/user' ,csrf.getToken, userController.update);
router.delete('/user' ,csrf.getToken, userController.delete);
router.post('/login',csrf.getToken,authController.login);

module.exports = router;