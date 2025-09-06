const express = require('express');
const auth = require('secure-mern/middlewares/authMiddleware');
const checkPermission = require('secure-mern/middlewares/checkPermission');
const ProjectController = require('../controllers/ProjectCotroller');
const upload = require('secure-mern/middlewares/uploadMiddleware');

const router = express.Router();

router.post('/create-project', auth, checkPermission(['project:create']), upload.single('projectFile'), ProjectController.create_project)


module.exports = router;