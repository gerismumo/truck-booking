const express = require('express');
const router = express.Router();
const { insertData,selectData,deleteData,updateData, } = require('../controllers/truckType');
const multer = require('multer');

const storage = multer.memoryStorage();
const upload = multer({storage: storage});

router.post('/addTruckType',upload.single('file') ,insertData);
router.get('/truckTypes', selectData);
router.delete('/deleteTruckTypes', deleteData);
router.put('/updateTruckTypes', updateData);



module.exports = router;