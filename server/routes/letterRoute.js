const express = require('express');
const auth = require('secure-mern/middlewares/authMiddleware');
const checkPermission = require('secure-mern/middlewares/checkPermission');
const LetterController = require('../controllers/LetterController');

const router = express.Router();

router.post('/create-letter', auth, checkPermission(['internshipletter:create']), LetterController.create_internship_start_letter)

router.get('/all-intern-letters', auth, checkPermission(['internshipletter:getall']), LetterController.get_all_letters)

module.exports = router;