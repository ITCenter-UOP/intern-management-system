const express = require('express');
const auth = require('secure-mern/middlewares/authMiddleware');
const checkPermission = require('secure-mern/middlewares/checkPermission');
const ProjectController = require('../controllers/ProjectCotroller');

const router = express.Router();

router.post('/create-project', auth, checkPermission(['project:create']), ProjectController.create_project)


module.exports = router;