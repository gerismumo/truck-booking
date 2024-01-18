const database = require('../Database/Db');
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

    console.log(amount);
    try {
        const connection = await database.createConnection();
        const data = await connection.query(
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
             database.closeConnection(connection);
             res.json({success:true, message:'Successfully addition'});
        return data;    
    }catch(error) {
        console.error('Error inserting values into the database', error.message);
        res.json({success: false, message: error.message});
    }
}

const selectData = async(req, res) => {
    try {
        const connection = await database.createConnection();
        const result =  await new  Promise((resolve, reject)  => {
            connection.query(queries.trucks.get, (err, result) => {
                if(err) {
                    reject(err);
                }else {
                    resolve(result);
                }
            });
        });
        database.closeConnection(connection);
        res.json({success: true, data: result});
        return result; 
    }catch(error) {
        console.log(error);
        res.json({success: false, message: error.message});
    }
}


const deleteData = async(req, res) => {
    const id = req.params.id;

    try{
        const connection = await database.createConnection();
        const data = await connection.query(queries.trucks.delete, id);
        database.closeConnection(connection);
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
        const connection = await database.createConnection();

        const data  = await  new Promise((resolve, reject) => {
            connection.query(query, params, (err, result) => {
                if(err) {
                    reject(err);
                }else{
                    resolve(result);
                }
            });
        });
        database.closeConnection(connection);
        res.json({success: true, message:'Successfully updated'});
        return data;
    }catch (error){
        res.json({success: false, message: error.message})
    }
}

const trucksData = async(req, res) => {
    try {
        const connection = await database.createConnection();
        const result =  await new  Promise((resolve, reject)  => {
            connection.query(queries.trucks.get, (err, result) => {
                if(err) {
                    reject(err);
                }else {
                    resolve(result);
                }
            });
        });
        database.closeConnection(connection);
        return result; 
    }catch(error) {
        console.log(error);
       
    }
}

const getBookingsList = async(req, res) => {
    try {
        const connection = await database.createConnection();
        const result =  await new  Promise((resolve, reject)  => {
            const query = 'SELECT * FROM booking_table';

            connection.query(query, (err, result) => {
                if(err) {
                    reject(err);
                }else {
                    resolve(result);
                }
            });
        });
        database.closeConnection(connection);
        return result; 

    }catch(error) {
        console.log(error);
    }
}

const updateBookingStartDe = async (connection, deliveryDate, truckId) => {
    return new Promise((resolve, reject) => {
        const updateQuery = 'UPDATE booking_table SET start_delivery_date = ? WHERE truck_id = ?';

        connection.query(updateQuery, [deliveryDate, truckId], (err, result) => {
            if (err) {
                reject(err);
            } else {
         
                resolve(result);
            }
        });
    });
};

const updateStartDelivery= async(req, res) => {
    const id = req.params.id;
    const startDate = req.body;
    console.log(id);
    const startDeliveryDate = startDate.startDeliveryDate;
    console.log(startDeliveryDate);


    
    const data = await trucksData(req, res);
    const currentObject = data.find(data => data.id === id);
    // console.log(currentObject);
    if(currentObject.status === 1) {
        try{
            const connection = await database.createConnection();
            const query ='UPDATE trucks SET on_schedule = true WHERE id = ?';
            const result = await new Promise((resolve, reject) =>{
                connection.query(query, [ id], (err, result) => {
                    if(err) {
                        reject(err);
                    }else {
                        resolve(result);
                    }
                });
            });
            const bookingList = await getBookingsList(req, res);
        // console.log(bookingList);
                const matching = bookingList.filter(item => item.truck_id === id);
                const filterMatching = matching.filter(item => item.done_booking === 0);
                console.log('filterMatching',filterMatching);
               
                if(filterMatching.length > 0) {
                    filterMatching.forEach(item => {
                        console.log(item.customer_name);
                        //update start dates
                    updateBookingStartDe(connection,startDeliveryDate, item.truck_id )
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
                res.jon({success: true, message:'successfully Updated'})
            return result;
        }catch(error) {
            console.log(error.message)
            res.json({success: false, message: error.message})
        } 
    }
} 

const updateBookingEndDe = async (connection, deliveryDate, truckId) => {
    return new Promise((resolve, reject) => {
        const updateQuery = `UPDATE booking_table SET delivery_status = 'delivered', delivery_date = ?, done_booking = true WHERE truck_id = ?`;

        connection.query(updateQuery, [deliveryDate, truckId], (err, result) => {
            if (err) {
                reject(err);
            } else {
                resolve(result);
            }
        });
    });
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
        console.log('you can update')
        try{
            const connection = await database.createConnection();
            const query ='UPDATE trucks SET max_amount = ?, status = false, on_schedule = false WHERE id = ?';
            const result = await new Promise((resolve, reject) =>{
                connection.query(query, [currentObject.full_space, id], (err, result) => {
                    if(err) {
                        reject(err);
                    }else {
                        resolve(result);
                    }
                });
            });
            const bookingList = await getBookingsList(req, res);
        // console.log(bookingList);
                const matching = bookingList.filter(item => item.truck_id === id);
                const filterMatching = matching.filter(item => item.done_booking === 0);
                if(filterMatching.length > 0) {
                    filterMatching.forEach(item => {
                        console.log(item.customer_name);
                        updateBookingEndDe(connection,deliveryEndDate, item.truck_id );
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
                res.jon({success: true, message:'successfully Updated'})
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