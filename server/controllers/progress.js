const pool = require('../Database/Db');
const queries  = require('../queries/queries');
const uuid = require('uuid');

const checkProgress = async(req, res) => {
    const { bookingCode } = req.query;
    // console.log(bookingCode);
   
    try{
        const query = 'SELECT start_delivery_date, delivery_status, delivery_date, done_booking FROM booking_table WHERE booking_code = ?';

         const [result] = await pool.query(query, [bookingCode] );

        res.json({success: true, result});
        return result;
    }catch(error) {
        req.json({success: false, message:error.message})
    }
}

const progress = {
    checkProgress,
}

module.exports = progress;