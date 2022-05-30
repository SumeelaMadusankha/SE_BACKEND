const express = require('express'),

router = express.Router();

const{uploadmealplanController} = require('../../controllers');

router.post('/addMP',uploadmealplanController.uploadMP);

module.exports = router;