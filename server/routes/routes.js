const express = require('express');
const router = express.Router();
const multer = require('multer');

const { insertData,selectData,deleteData,updateData, } = require('../controllers/truckType');
const townRoutes = require('../controllers/townRoutes');
const Trucks = require('../controllers/Trucks');
const booking = require('../controllers/search');
const payBooking = require('../controllers/booking');
const { trucks } = require('../queries/queries');
const dashboardController = require('../controllers/controller') 
const progress = require('../controllers/progress');

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

//trucks apis

router.post('/addTruck', upload.single('truckImages'),Trucks.insertData);
router.get('/getTrucks', Trucks.selectData);
router.delete('/deleteTrucks/:id', Trucks.deleteData);
router.put('/editTrucks/:id',upload.single('editFile'), Trucks.updateData)


//search api

router.post('/booking', booking.searchProcess );

//book api

router.post('/payBooking' ,payBooking.bookingProcess);
router.get('/getBookings',payBooking.getBookingsList);
router.delete('/deleteBookings/:id', payBooking.deleteBookings);

//update delivery

router.put('/updateDelivery/:id', payBooking.updateDelivery);

router.put('/updateStartDelivery/:id', Trucks.updateStartDelivery);
router.put('/updateTrucksEndDelivery/:id', Trucks.updateEndDelivery);

//dashboard queries;
router.get('/sumOfMoneyEarned', dashboardController.sumOfMoney);
router.get('/noOfTrucks', dashboardController.noOfTrucks);
router.get('/noOfRoutes', dashboardController.noOfRoutes);
router.get('/noOfDoneDeliveries', dashboardController.noOfDoneDeliveries);
router.get('/noOfPendingDeliveries', dashboardController.noOfPendingDeliveries);
router.get('/moneyMadeByEachTruck', dashboardController.moneyMadeByEachTruck);

//check progress
router.get('/checkProgress', progress.checkProgress);
router.post('/loginAdmin',dashboardController.login);


module.exports = router;