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

router.all('', userController.getAll);

router.get('/:userId', userController.getOne);

router.post('', checkAuth, userController.create);

router.put('/:userId', checkAuth, userController.update);

router.delete('/:userIds', checkAuth, userController.delete);

module.exports = router;
