const express = require('express');
const router = express.Router();
const applicationController = require('../controllers/applicationController');

router.post('/', applicationController.createApplication);
// router.get('/', applicationController.getAllApplications); // Пример доп.роута

module.exports = router;