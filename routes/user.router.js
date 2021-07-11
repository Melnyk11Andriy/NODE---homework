const router = require('express').Router();
const { userController } = require('../controllers');
const { userMiddleware } = require('../middlewares');

router.get('/', userController.getUsersData);
router.get('/:userId', userMiddleware.checkUserPresence, userController.getUserById);
router.post('/', userMiddleware.checkUserRegistration, userController.createUser);
router.delete(':userId', userMiddleware.checkUserPresence, userController.deleteUserById);
router.patch('/:userId', userMiddleware.checkUserPresence, userController.updateUserById);

module.exports = router;
