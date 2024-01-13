const database = require('../Database/Db');
const queries  = require('../queries/queries');
const uuid = require('uuid');

const insertData = async(req, res) => {
    const { truckTypeName } = req.body;
    const { bookTypeSize } = req.body;
    const truckImage = req.file;
    const uniqueId = uuid.v4();
    try {
        const connection = await database.createConnection();
        const data = await connection.query(
            queries.truckType.trucKTypeAddition,
             [uniqueId, truckTypeName,truckImage.buffer, bookTypeSize]
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
            connection.query(queries.truckType.getTruckTypes, (err, result) => {
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
        const data = await connection.query(queries.truckType.deleteTruckTypes, id);
        res.json({success: true, message: 'Deleted successfully'});
        return data;
    }catch(error) {
        res.json({success: false, message: error.message});
    }
}

const updateData = async(req, res) => {
    const id = req.params.id;
    const  editFile = req.file;
    const {editTruckType} = req.body;
    const {bookType} = req.body;
    

    let query;
    let  params;

    if(editFile) {
        query = queries.truckType.updateTruckTypes;
        params = [editTruckType, editFile.buffer,bookType, id]
    } else {
        query = queries.truckType.updateTruckTypesImageNull;
        params= [editTruckType,bookType,id]
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
        res.json({success: true, message:'Successfully updated'});
        return data;
    }catch (error){
        res.json({success: false, message: error.message})
    }
}
module.exports = {
    insertData,
    selectData,
    deleteData,
    updateData,
}