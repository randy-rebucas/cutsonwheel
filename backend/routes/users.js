const express = require('express');
const router = express.Router();
/**
 * loads middlewares
 */
const checkAuth = require('../middleware/check-auth');

/**
 * load controller
 */
const userController = require('../controllers/user');

router.get('', userController.getAll);

router.get('/:myUserId', userController.getOne);

router.post('', checkAuth, userController.create);

router.put('/:myUserId', checkAuth, userController.update);

router.delete('/:myUserIds', checkAuth, userController.delete);

module.exports = router;
