const express = require('express');
const router = express.Router();
const { insertData} = require('../controllers/truckType');
const multer = require('multer');

const storage = multer.memoryStorage();
const upload = multer({storage: storage});

router.post('/addTruckType',upload.single('file') ,insertData)

module.exports = router;