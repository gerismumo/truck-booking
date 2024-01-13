const database = require('../Database/Db');
const queries  = require('../queries/queries');
const uuid = require('uuid');

const bookingProcess = (req, res) => {
    const {
        truckType,
        bookType,
        squareMeter,
        itemsNumber,
        from,
        to,
        departureDate,
        } = req.body;

    console.log(truckType,
        bookType,
        squareMeter,
        itemsNumber,
        from,
        to,
        departureDate);
}

const booking = {
    bookingProcess,
}

module.exports = booking;