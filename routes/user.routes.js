var router = require('express').Router();
const userController = require('../controllers/user.controller.js');
const { AuthMiddleware } = require('../middlewares/auth');

router.get('/user/:accountId', AuthMiddleware(), userController.getUserById);
router.post('/user/:accountId', AuthMiddleware(), userController.syncUserInfo);
router.get('/:accountId/jobs', userController.getJobsByUserId);
router.get('/:accountId/jobs/:jobId', userController.getJobById);
router.get('/', userController.index);

module.exports = router;
