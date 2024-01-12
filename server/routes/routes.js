const express = require('express');
const router = express.Router();
const { insertData} = require('../controllers/truckType');

router.post('/addTruckType', insertData);

module.exports = router;