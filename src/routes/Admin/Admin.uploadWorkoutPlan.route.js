const express = require('express'),

router = express.Router();

const{uploadworkoutplanController} = require('../../controllers');

router.post('/addWoP',uploadworkoutplanController.uploadWoP);

module.exports = router;