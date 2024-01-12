const express = require('express');
const router = express.Router();
const multer = require('multer');

const { insertData,selectData,deleteData,updateData, } = require('../controllers/truckType');
const townRoutes = require('../controllers/townRoutes');

const storage = multer.memoryStorage();
const upload = multer({storage: storage});

router.post('/addTruckType',upload.single('file') ,insertData);

router.get('/getTruckTypes', selectData);

router.delete('/deleteTruckType/:id', deleteData);
router.put('/updateTruckType/:id',upload.single('editFile'), updateData);

//routes apis

router.post('/addRoute', townRoutes.insertData);
router.get('/getRoutes', townRoutes.selectData);
router.delete('/deleteRoute/:id', townRoutes.deleteData);
router.put('/updateRoute/:id', townRoutes.updateData);






module.exports = router;