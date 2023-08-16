
const { Router } = require('express');
const { check } = require('express-validator');
const { uploadFile } = require('../controller/uploadsController');

const router = Router();

router.post('/', uploadFile);

module.exports = router;