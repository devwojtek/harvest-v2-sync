var router = require('express').Router();
const userController = require('../controllers/user.controller.js');

router.get('/:accountId', userController.getUserById);
router.post('/:accountId', userController.syncUserInfo);
router.get('/:accountId/jobs', userController.getJobsByUserId);
router.get('/:accountId/jobs/:jobId', userController.getJobById);
router.get('/', userController.index);

module.exports = router;
