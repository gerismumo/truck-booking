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
                    console.log(result);
                    resolve(result);
                }
                });
            });
           
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
                          
                          if (isBetween) {
                            const availableTrucks = result.find(truck => truck.id === id);
                                return availableTrucks;
                               
                            } else {
                                return null;
                            }
                    })
                    console.log(someTest);
                    resolve(someTest);
                }
                });
            });  
            res.json({ success: true, trucksData: trucksResult  });

    }catch(error) {
        console.log(error);
        res.json({success: false, message: error.message});
    }
}

const booking = {
    bookingProcess,
}

module.exports = booking;