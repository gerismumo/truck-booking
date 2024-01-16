const database = require('../Database/Db');
const queries  = require('../queries/queries');
const uuid = require('uuid');

const bookingProcess = (req, res) => {
    const currentBookData = req.body;

    console.log(currentBookData);
}

const payBooking = {
    bookingProcess,
}

module.exports = payBooking;