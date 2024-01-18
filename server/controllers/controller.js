
const database = require('../Database/Db');
const queries  = require('../queries/queries');

//sum of money earned
const sumOfMoney = async(req, res) => {
    try {
        const connection = await database.createConnection();
        const query = 'SELECT SUM(price) AS total FROM booking_table';
        const result = await new Promise((resolve, reject) => {
            connection.query(query, (err, result) => {
                if(err) {
                    reject(err);
                }else {
                    resolve(result);
                }
            });
        });
        database.closeConnection(connection)
        res.json({success: true, result})
        return result;
       
    }catch(error) {
        res.json({success:false, message:error.message})
    }
}


//no of trucks

const noOfTrucks = async(req, res) => {
    try {
        const connection = await database.createConnection();
        const query = 'SELECT COUNT(*) AS noOfTrucks FROM trucks';
        const result = await new Promise((resolve, reject) => {
            connection.query(query, (err, result) => {
                if(err) {
                    reject(err);
                }else {
                    resolve(result);
                }
            });
        });
        database.closeConnection(connection)
        res.json({success: true, result})
        return result;
       
    }catch(error) {
        res.json({success:false, message:error.message})
    }
}

//no of available routes
const noOfRoutes = async(req, res) => {
    try {
        const connection = await database.createConnection();
        const query = 'SELECT COUNT(*) AS noOfRoutes FROM routes';
        const result = await new Promise((resolve, reject) => {
            connection.query(query, (err, result) => {
                if(err) {
                    reject(err);
                }else {
                    resolve(result);
                }
            });
        });
        database.closeConnection(connection)
        res.json({success: true, result})
        return result;
       
    }catch(error) {
        res.json({success:false, message:error.message})
    }
}

//no of done deliveries
const noOfDoneDeliveries = async(req, res) => {
    try {
        const connection = await database.createConnection();
        const query = 'SELECT COUNT(id) AS noOfDoneDeliveries FROM booking_table WHERE done_booking = 1';
        const result = await new Promise((resolve, reject) => {
            connection.query(query, (err, result) => {
                if(err) {
                    reject(err);
                }else {
                    resolve(result);
                }
            });
        });
        database.closeConnection(connection)
        res.json({success: true, result})
        return result;
       
    }catch(error) {
        res.json({success:false, message:error.message})
    }
}

//no of pending deliveries
const noOfPendingDeliveries = async(req, res) => {
    try {
        const connection = await database.createConnection();
        const query = 'SELECT COUNT(id) AS noOfDoneDeliveries FROM booking_table WHERE done_booking = 0';
        const result = await new Promise((resolve, reject) => {
            connection.query(query, (err, result) => {
                if(err) {
                    reject(err);
                }else {
                    resolve(result);
                }
            });
        });
        database.closeConnection(connection)
        res.json({success: true, result})
        return result;
       
    }catch(error) {
        res.json({success:false, message:error.message})
    }
}

//sum of money earned according to truck

const moneyMadeByEachTruck = async(req, res) => {
    try {
        const connection = await database.createConnection();
        const query = `SELECT DISTINCT b.truck_id, t.number_plate ,t.truck_type, t.truck_model, SUM(b.price) 
            AS total_money FROM booking_table b JOIN trucks t ON 
            b.truck_id = t.id GROUP BY b.truck_id, t.number_plate, t.truck_type, t.truck_model `;
        const result = await new Promise((resolve, reject) => {
            connection.query(query, (err, result) => {
                if(err) {
                    reject(err);
                }else {
                    resolve(result);
                }
            });
        });
        database.closeConnection(connection)
        res.json({success: true, result})
        return result;
       
    }catch(error) {
        res.json({success:false, message:error.message})
    }
}

const dashboardController ={
    sumOfMoney,
    noOfTrucks,
    noOfRoutes,
    noOfDoneDeliveries,
    noOfPendingDeliveries,
    moneyMadeByEachTruck,
}

module.exports = dashboardController;

