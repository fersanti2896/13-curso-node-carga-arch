
const { Router } = require('express');
const { check } = require('express-validator');
const { uploadFileServer } = require('../controller/uploadsController');

const router = Router();

router.post('/', uploadFileServer);

module.exports = router;