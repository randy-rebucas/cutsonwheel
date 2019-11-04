const express = require('express');
const router = express.Router();
/**
 * loads middlewares
 */
const checkAuth = require('../middleware/check-auth');
/**
 * load controller
 */
const classificationController = require('../controllers/classification');

router.all('', classificationController.getAll);

router.get('/:classificationId', classificationController.getOne);

router.post('', checkAuth, classificationController.create);

router.put('/:classificationId', checkAuth, classificationController.update);

router.delete('/:classificationId', checkAuth, classificationController.delete);

module.exports = router;