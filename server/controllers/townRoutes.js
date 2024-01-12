const database = require('../Database/Db');
const queries  = require('../queries/queries');
const uuid = require('uuid');

const insertData = async(req, res) => {
    const { route } = req.body;
    const uniqueId = uuid.v4();
    try {
        const connection = await database.createConnection();
        const data = await connection.query(
            queries.townRoutes.add,
             [uniqueId, route]
             );
             res.json({success:true, message:'Successfully added'});
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
            connection.query(queries.townRoutes.get, (err, result) => {
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
        const data = await connection.query(queries.townRoutes.delete, id);
        res.json({success: true, message: 'Deleted successfully'});
        return data;
    }catch(error) {
        res.json({success: false, message: error.message});
    }
}

const updateData = async(req, res) => {
    const id = req.params.id;
    const {route} = req.body;
    try {
        const connection = await database.createConnection();

        const data  = await  new Promise((resolve, reject) => {
            connection.query(queries.townRoutes.update, [route, id], (err, result) => {
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

const townRoutes = {
    insertData,
    selectData,
    deleteData,
    updateData,
}
module.exports = townRoutes;