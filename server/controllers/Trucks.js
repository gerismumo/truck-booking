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
        res.json({success: true, message: 'Deleted successfully'});
        return data;
    }catch(error) {
        res.json({success: false, message: error.message});
    }
}

const updateData = async(req, res) => {
    const id = req.params.id;
    const  truckImages = req.file;
    const  {
        truckType,
        truckModel,
        numberPlate,
        driverName,
        driverLicense,
        nationalId,
        startRoute,
        endRoute} = req.body;
    try {
        const connection = await database.createConnection();

        const data  = await  new Promise((resolve, reject) => {
            connection.query(queries.trucks.update, [
                truckType,
                truckModel,
                numberPlate,
                truckImages.buffer,
                driverName,
                driverLicense,
                nationalId,
                startRoute,
                endRoute,
                id
            ], (err, result) => {
                if(err) {
                    reject(err);
                }else{
                    resolve(result);
                }
            });
        });
        res.json({success: true, message:'Successfully updated'});
        return data;
    }catch (error){
        res.json({success: false, message: error.message})
    }
}

const Trucks = {
    insertData,
    selectData,
    deleteData,
    updateData,
}
module.exports = Trucks;