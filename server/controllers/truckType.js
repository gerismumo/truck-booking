const pool = require('../Db/Config');


const insertData = async(req, res) => {
    const { truckTypeName } = req.body;
    const truckImage = req.file;
    console.log(truckImage)
    console.log(truckTypeName);
}

module.exports = {
    insertData,
}