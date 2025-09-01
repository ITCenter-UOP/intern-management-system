const express = require('express');
const auth = require('secure-mern/middlewares/authMiddleware');
const checkPermission = require('secure-mern/middlewares/checkPermission');
const upload = require('../node_modules/secure-mern/middlewares/uploadMiddleware');
const InternController = require('../controllers/InternController');

const router = express.Router();

router.post('/update-intern-information', auth, checkPermission(['interninfor:update']), upload.single('cv'), InternController.update_intern_data)

router.get('/get-intern-information', auth, InternController.get_intern_data)

module.exports = router;