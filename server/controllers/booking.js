const database = require('../Database/Db');
const queries  = require('../queries/queries');
const uuid = require('uuid');

const bookingProcess = async(req, res) => {
    const bookingData = req.body;
    console.log(bookingData);
    const truckType = bookingData.truckType;
    const from = bookingData.from;
    const to = bookingData.to;
    const squareMeter = bookingData.squareMeter;
    const itemsNumber = bookingData.itemsNumber;
    const departureDate = bookingData.departureDate;
    const bookType = bookingData.bookType;

    try {
        const connection = await database.createConnection();
   
           const routesResult = await new Promise((resolve, reject) => {
                connection.query(queries.booking.selectRoutesInOrder, (err, result) => {
                if (err) {
                    reject(err);
                } else {
                    // console.log(result);
                    resolve(result);
                }
                });
            });
           

            const updateMaxAmount = async (connection, truckId, newMaxAmount) => {
                return new Promise((resolve, reject) => {
                    const updateQuery = 'UPDATE trucks SET max_amount = ? WHERE id = ?';
            
                    connection.query(updateQuery, [newMaxAmount, truckId], (err, result) => {
                        if (err) {
                            reject(err);
                        } else {
                            resolve(result);
                        }
                    });
                });
            };

            const updateFull = async (connection, truckId) => {
                return new Promise((resolve, reject) => {
                    const updateQuery = 'UPDATE trucks SET status = true WHERE id = ?';
            
                    connection.query(updateQuery, [truckId], (err, result) => {
                        if (err) {
                            reject(err);
                        } else {
                            resolve(result);
                        }
                    });
                });
            };

            const fromRoute = routesResult.find(route => route.route_name === from);
            const toRoute = routesResult.find(route => route.route_name === to);

           const trucksResult = await new Promise((resolve, reject) => {
                connection.query(queries.booking.selectByTruckType, [truckType, bookType], (err, result) => {
                if (err) {
                    console.log(err);
                    reject(err);
                } else {
                    const someTest  = result.map(item => {
                        const StartRoute = item.start_route;
                        const EndRoute = item.end_route;
                        const id = item.id;

                        const truckStartRoute = routesResult.find(route => route.route_name === StartRoute);
                        const truckEndRoute = routesResult.find(route => route.route_name === EndRoute);

                        const liesBetween = (route1, route2, targetRoute) => {
                            const order1 = Math.min(route1.order_id, route2.order_id);
                            const order2 = Math.max(route1.order_id, route2.order_id);
                            const targetOrder = targetRoute.order_id;
                          
                            return targetOrder >= order1 && targetOrder <= order2;
                          };

                          const isBetween = liesBetween(truckStartRoute, truckEndRoute, fromRoute) && liesBetween(truckStartRoute, truckEndRoute, toRoute);
                                console.log(id);
                                const  availableTrucks = result.find(truck => truck.id === id && isBetween === true);
                                return availableTrucks;  
                    });
                    console.log(someTest);

                    const filterOnSq = someTest;
                    if(bookType === 'Square Meter') {
                        filterOnSq.map(truck => {
                            const maxAmount = truck.max_amount;
                            const id = truck.id;
                            
                            if(maxAmount >= 0  || maxAmount < 500) {
                                updateFull(connection, id);
                            }
                            const checkRemainingAmount = (maxAmount - squareMeter);
                            console.log(checkRemainingAmount);

                    
                            if(checkRemainingAmount >= 0 && checkRemainingAmount <= maxAmount) {
                                console.log('true',id);
                                updateMaxAmount(connection,id, checkRemainingAmount);
                                const fullFilledData = filterOnSq.filter(item => item.id === id);
                                console.log(fullFilledData);
                            }
                            
                        });
                    }
                    resolve(someTest);
                }
                });
            });  
            res.json({ success: true, trucksData: trucksResult   });

    }catch(error) {
        console.log(error);
        res.json({success: false, message: error.message});
    }
}

const booking = {
    bookingProcess,
}

module.exports = booking;