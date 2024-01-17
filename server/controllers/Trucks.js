const database = require('../Database/Db');
const queries  = require('../queries/queries');
const uuid = require('uuid');

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

const updateStartDelivery= (req, res) => {
    const id = req.params.id;
    const startDate = req.body;
    console.log(id);
    const startDeliveryDate = startDate.startDeliveryDate;
    console.log(startDeliveryDate);
} 

const updateEndDelivery = (req, res) => {
    const id = req.params.id
    const deliveryData = req.body;

    let noData = '';
    const deliveryStatus = deliveryData.deliveryStatus;
    let deliveryEndDate = deliveryData.deliveryDate;
    if(deliveryStatus ==='notDelivered') {
        deliveryEndDate = noData;
    }

    console.log(id);
    console.log(deliveryEndDate);
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