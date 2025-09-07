const express = require('express');
const auth = require('secure-mern/middlewares/authMiddleware');
const checkPermission = require('secure-mern/middlewares/checkPermission');
const ProjectController = require('../controllers/ProjectCotroller');
const upload = require('secure-mern/middlewares/uploadMiddleware');

const router = express.Router();

router.post('/create-project', auth, checkPermission(['project:create']), upload.single('projectFile'), ProjectController.create_project)

router.get('/get_all_projects', auth, checkPermission(['project:allprojects']), ProjectController.get_all_projects)

router.get('/get-one-project/:id', auth, checkPermission(['project:getone']), ProjectController.get_one_project)

router.post('/assign-interns/:id', auth, checkPermission(['project:assigninterns']), ProjectController.assignInternstoProject)

router.post('/remove-interns/:id', auth, checkPermission(['project:removeinterns']), ProjectController.removeinterns)

module.exports = router;