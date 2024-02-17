const pool = require('../Database/Db');
const queries  = require('../queries/queries');
const uuid = require('uuid');

const insertData = async(req, res) => {
    const  formData  = req.body;
    const uniqueId = uuid.v4();
    const route = formData.stationName;

    try {
        const data = await pool.query(
            queries.townRoutes.add,
             [uniqueId, route]
             );
             res.json({success:true, message:'Successfully added'});
        return data;    
    }catch(error) {
        // console.error('Error inserting values into the database', error.message);
        res.json({success: false, message: error.message});
    }
}

const selectData = async(req, res) => {
    try {
        const [result] = await pool.query(queries.townRoutes.get)
        res.json({success: true, data: result});
        return result; 
    }catch(error) {
        console.log(error);
        res.json({success: false, message: error.message});
    }
}


const deleteData = async(req, res) => {
    const id = req.params.id;
    // console.log(id);
    try{
        const [data] = await pool.query(queries.townRoutes.delete, id);
        res.json({success: true, message: 'Deleted successfully'});
        
        return data;
    }catch(error) {
        res.json({success: false, message: error.message});
    }
}

const updateData = async(req, res) => {
    const id = req.params.id;
    const editData = req.body;
    const route = editData.editRouteName;
    
    try {

         
        const [data] = await pool.query(queries.townRoutes.update, [route, id]); 
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