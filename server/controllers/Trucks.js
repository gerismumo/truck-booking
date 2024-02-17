const pool = require('../Database/Db');
const queries  = require('../queries/queries');
const uuid = require('uuid');
const nodemailer = require('nodemailer');

const insertData = async(req, res) => {
    const  {
    truckType,
    bookType,
    price,
    amount,
    truckModel,
    numberPlate,
    driverName,
    driverLicense,
    nationalId,
    startRoute,
    endRoute} = req.body;
    const truckImages = req.file;
    const uniqueId = uuid.v4();

    // console.log(amount);
    try {
        const [data] = await pool.query(
            queries.trucks.add,
             [uniqueId, 
                truckType,
                bookType,
                price,
                amount,
                amount,
                truckModel,
                numberPlate,
                truckImages.buffer,
                driverName,
                driverLicense,
                nationalId,
                startRoute,
                endRoute]
             );
             res.json({success:true, message:'Successfully addition'});
        return data;    
    }catch(error) {
        // console.error('Error inserting values into the database', error.message);
        res.json({success: false, message: error.message});
    }
}

const selectData = async(req, res) => {
    try {
      
          const [result] = await   pool.query(queries.trucks.get); 

        res.json({success: true, data: result});
        return result; 
    }catch(error) {
        // console.log(error);
        res.json({success: false, message: error.message});
    }
}


const deleteData = async(req, res) => {
    const id = req.params.id;

    try{
        const [data] = await pool.query(queries.trucks.delete, id);
        res.json({success: true, message: 'Deleted successfully'});
        return data;
    }catch(error) {
        res.json({success: false, message: error.message});
    }
}

const updateData = async(req, res) => {
    const id = req.params.id;
    const  editFile = req.file;
    const  {
      book_type,
      driver_license,
      driver_name,
      end_route,
      full_space,
      available_space,
      number_plate,
      pricing,
      start_route,
      truck_model,
    truck_type
    } = req.body;
    
    
    let query;
    let params;

    if(editFile) {
        query= queries.trucks.updateWithFile;
        params = [truck_type,
            book_type,
            pricing,
            full_space,
            available_space,
            truck_model,
            number_plate ,
            editFile.buffer,
            driver_name,
            driver_license,
            start_route,
            end_route,id]
    }else {
        query = queries.trucks.updateWithOutFile;
        params = [truck_type,
            book_type,
            pricing,
            full_space,
            available_space,
            truck_model,
            number_plate,
            driver_name,
            driver_license,
            start_route,
            end_route,id]
    }

    try {

        
        const [data] = await  pool.query(query, params);

        res.json({success: true, message:'Successfully updated'});
        return data;
    }catch (error){
        res.json({success: false, message: error.message})
    }
}

const trucksData = async(req, res) => {
    try {
        const [result] = await pool.query(queries.trucks.get) ;
        return result; 
    }catch(error) {
        console.log(error);
       
    }
}

const getBookingsList = async(req, res) => {
    try {
        const query = 'SELECT * FROM booking_table';

        const [result] = await pool.query(query)
        return result; 

    }catch(error) {
        console.log(error);
    }
}

const updateBookingStartDe = async (pool, deliveryDate, truckId) => {
        const updateQuery = 'UPDATE booking_table SET start_delivery_date = ? WHERE truck_id = ?';

       const [result] =  pool.query(updateQuery, [deliveryDate, truckId]);
       return result;
}

const updateStartDelivery= async(req, res) => {
    const id = req.params.id;
    const startDate = req.body;
    // console.log(id);
    const startDeliveryDate = startDate.startDeliveryDate;
    // console.log(startDeliveryDate);


    
    const data = await trucksData(req, res);
    const currentObject = data.find(data => data.id === id);
    // console.log(currentObject);
    if(currentObject.status === 1) {
        try{
            const query ='UPDATE trucks SET on_schedule = true WHERE id = ?';
              const [result] = await  pool.query(query, [ id]); 

            const bookingList = await getBookingsList(req, res);
        // console.log(bookingList);
                const matching = bookingList.filter(item => item.truck_id === id);
                const filterMatching = matching.filter(item => item.done_booking === 0);
                // console.log('filterMatching',filterMatching);
               
                if(filterMatching.length > 0) {
                    filterMatching.forEach(item => {
                        // console.log(item.customer_name);
                        //update start dates
                    updateBookingStartDe(pool,startDeliveryDate, item.truck_id )
                        let config = {
                            host: process.env.EMAIL_HOST,
                            port: process.env.EMAIL_PORT,
                            secure: process.env.EMAIL_SECURE,
                            auth: {
                            user: process.env.EMAIL_USERNAME,
                            pass: process.env.EMAIL_PASSWORD,
                            }
                        }
                        let transporter = nodemailer.createTransport(config);
            
                        const data = {
                            from: process.env.EMAIL_USERNAME,
                            to: item.customer_email,
                            subject: 'Delivery',
                            html: `
                            <p>Dear<span>${item.customer_name},</span> </p> 
                            <p>Transportation of your goods has started on ${startDeliveryDate},track the progress using your booking code: ${item.booking_code}</p>
                        `,
                        }
                        transporter.sendMail(data)

                    })
                }
                // console.log('successfully Updated');
                res.json({success: true, message:'successfully Updated'})
            return result;
        }catch(error) {
            console.log(error.message)
            res.json({success: false, message: error.message})
        } 
    }
} 

const updateBookingEndDe = async (pool, deliveryDate, truckId) => {
        const updateQuery = `UPDATE booking_table SET delivery_status = 'delivered', delivery_date = ?, done_booking = true WHERE truck_id = ?`;

       const [result] = await  pool.query(updateQuery, [deliveryDate, truckId]); 
       return result;
};

const updateEndDelivery = async(req, res) => {
    const id = req.params.id
    const deliveryData = req.body;

    let noData = '';
    const deliveryStatus = deliveryData.deliveryStatus;
    let deliveryEndDate = deliveryData.deliveryDate;
    if(deliveryStatus ==='notDelivered') {
        deliveryEndDate = noData;
    }

    

    const data = await trucksData(req, res);
    const currentObject = data.find(data => data.id === id);
    // console.log('current',currentObject);
    if(currentObject.status === 1) {
        // console.log('you can update')
        try{
            const query ='UPDATE trucks SET max_amount = ?, status = false, on_schedule = false WHERE id = ?';
            
            const [result] = await     pool.query(query, [currentObject.full_space, id])
            
            const bookingList = await getBookingsList(req, res);
        // console.log(bookingList);
                const matching = bookingList.filter(item => item.truck_id === id);
                const filterMatching = matching.filter(item => item.done_booking === 0);
                if(filterMatching.length > 0) {
                    filterMatching.forEach(item => {
                        // console.log(item.customer_name);
                        updateBookingEndDe(pool,deliveryEndDate, item.truck_id );
                        let config = {
                            host: process.env.EMAIL_HOST,
                            port: process.env.EMAIL_PORT,
                            secure: process.env.EMAIL_SECURE,
                            auth: {
                            user: process.env.EMAIL_USERNAME,
                            pass: process.env.EMAIL_PASSWORD,
                            }
                        }
                        let transporter = nodemailer.createTransport(config);
            
                        const data = {
                            from: process.env.EMAIL_USERNAME,
                            to: item.customer_email,
                            subject: 'Delivery',
                            html: `
                            <p>Dear<span>${item.customer_name},</span> </p> 
                            <p>Your goods are at the destination place ${deliveryEndDate}</p>
                        `,
                        }
                        transporter.sendMail(data)

                    })
                }
                res.json({success: true, message:'successfully Updated'})
            return result;
        }catch(error) {
            console.log(error.message)
            res.json({success: false, message: error.message})
        } 
    }
}

const Trucks = {
    insertData,
    selectData,
    deleteData,
    updateData,
    updateEndDelivery,
    updateStartDelivery,
}
module.exports = Trucks;