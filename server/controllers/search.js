const pool = require('../Database/Db');
const queries  = require('../queries/queries');
const uuid = require('uuid');

const searchProcess = async(req, res) => {
    const bookingData = req.body;
    const truckType = bookingData.truckType;
    const from = bookingData.from;
    const to = bookingData.to;
    const squareMeter = bookingData.squareMeter;
    const itemsNumber = bookingData.itemsNumber;
    const departureDate = bookingData.departureDate;
    const bookType = bookingData.bookType;

    try {
       
   
           const [routesResult] = await pool.query(queries.booking.selectRoutesInOrder);
        //    console.log(routesResult)
           

            const updateMaxAmount = (pool, truckId, newMaxAmount) => {
                    const updateQuery = 'UPDATE trucks SET max_amount = ? WHERE id = ?';
                    const [result] = pool.query(updateQuery, [newMaxAmount, truckId]); 
                    return result;
            };

            const updateFull = async (pool, truckId) => {
                
                    const updateQuery = 'UPDATE trucks SET status = true WHERE id = ?';
            
                    const [result] = await pool.query(updateQuery, [truckId,true,]); 
                    return result;
            };

            const updateEmpty = async (pool, truckId) => {
                const updateQuery = 'UPDATE trucks SET status = false WHERE id = ?';
                const [result] = await pool.query(updateQuery, [truckId,true,] );
                return result;
            };

            const checkForFullTrucks =  (pool, truckId) => {
                    const updateQuery = 'SELECT * FROM  trucks  WHERE status = false AND  id = ?';
            
                    const [result] =  pool.query(updateQuery, [truckId,true,]); 
                    return result;
            };

            const fromRoute = routesResult.find(route => route.route_name === from);
            const toRoute = routesResult.find(route => route.route_name === to);
            
            try{

          
           const [trucksResult] = await pool.query(queries.booking.selectByTruckType, [truckType, bookType]); 
              
                    // console.log('first result',result);
                    let returnData = {
                        status: '',
                        data: '',
                        message: '',
                    }

                    if(trucksResult.length === 0) {
                        
                        // console.log('The selected type Truck is not available');
                        returnData.status = false;
                        returnData.message = 'no trucks available or no space available'
                    }else {
                        const someTest  = trucksResult.map(item => {
                            const StartRoute = item.start_route;
                            const EndRoute = item.end_route;
                            const id = item.id;
    
                            const truckStartRoute = routesResult.find(route => route.route_name === StartRoute);
                            const truckEndRoute = routesResult.find(route => route.route_name === EndRoute);
    
                            const liesBetween = (route1, route2, targetRoute) => {
                                if(route1 && route2 && targetRoute) {
                                    const order1 = Math.min(route1.order_id, route2.order_id);
                                    const order2 = Math.max(route1.order_id, route2.order_id);
                                    const targetOrder = targetRoute.order_id;
                              
                                return targetOrder >= order1 && targetOrder <= order2;
                                }
                              };
    
                              const isBetween = liesBetween(truckStartRoute, truckEndRoute, fromRoute) && liesBetween(truckStartRoute, truckEndRoute, toRoute);
                            //   console.log('truckStartRoute',truckStartRoute);
                            //    console.log('truckEndRoute',truckEndRoute);
                            //    console.log('fromRoute',fromRoute);
                            //    console.log('toRoute',toRoute);
                              if(isBetween) {
                                console.log(isBetween);
                                    console.log(id);
                                    const  availableTrucks = trucksResult.find(truck => truck.id === id && isBetween === true);
                                    // console.log('availableTrucks', availableTrucks);
                                    return availableTrucks;  
                              }else {
                                
                                console.log('no available trucks in That route');
                                return 'no available trucks in That route';
                            
                              }
                              
                        });


                        console.log('someTest',someTest);

                    const filterOnSq = someTest;
                    const filterVehicleNo = someTest;
                    const filterFullTrucks = someTest;


                    if(bookType === 'Square Meter') {
                        let combinedData = [];
                        filterOnSq.map(truck => {
                            const maxAmount = truck.max_amount;
                            const id = truck.id;
                            const price = truck.pricing;

                            const totalPriceToPay = (squareMeter * price);
                            truck.priceToPay = totalPriceToPay;
                            truck.no_of_squareMeter = squareMeter;
                            truck.from = from;
                            truck.to = to;
                            truck.departureDate = departureDate;
                            // console.log(maxAmount);
                            if(maxAmount >= 0 && maxAmount <= 500) {
                                updateFull(pool, id);
                            }else {
                                updateEmpty(pool, id);
                            }
                            const checkRemainingAmount = (maxAmount - squareMeter);
                            truck.checkRemainingAmount = checkRemainingAmount;
                            // console.log(checkRemainingAmount);
                            if(checkRemainingAmount >= 0 && checkRemainingAmount <= maxAmount) {
                                // console.log('true',id);
                               
                                // updateMaxAmount(connection,id, checkRemainingAmount);
                                combinedData.push(filterOnSq.find(item => item.id === id));
                            
                                
                                // console.log('fullFilledData',fullFilledData);
                                // if(fullFilledData.length > 0) {
                                //     console.log('you can book');
                                // }else {
                                //     console.log('All Trucks full');
                                // }
                                // returnData = fullFilledData;
                                // return returnData;
                                returnData.status = true;
                                returnData.message = 'successfully';
                                returnData.data = combinedData;
                            }else {
                                // console.log('false',id);
                                // console.log('Trucks available but no enough space for your goods');
                                // returnData = 'Trucks available but no enough space for your goods';
                                // return returnData;
                                returnData.status = false;
                                returnData.message = 'Trucks available but no enough space for your goods';
                                returnData.data = '';
                            }
                           
                        });
                    }else if(bookType === 'Number of Items') {
                        const combinedData = [];
                        filterVehicleNo.map(item => {
                            const maxNumberOfVehicles = item.max_amount;
                            const id = item.id;

                            if(maxNumberOfVehicles <= 0) {
                                updateFull(pool, id);
                            }else{
                                updateEmpty(pool, id);
                            }
                            const pricing = item.pricing;
                            const totalPriceToPay = (itemsNumber * pricing);
                            item.priceToPay = totalPriceToPay;
                            item.no_of_your_vehicles = itemsNumber;
                            item.from = from;
                            item.to = to;
                            item.departureDate = departureDate;

                            const checkRemainingSpace = (maxNumberOfVehicles - itemsNumber);
                            item.checkRemainingSpace = checkRemainingSpace;
                            console.log(checkRemainingSpace);
                            if(checkRemainingSpace >=0 && checkRemainingSpace <= maxNumberOfVehicles) {
                                // console.log('true', id);
                                // updateMaxAmount(connection,id, checkRemainingSpace);
                                combinedData.push(filterVehicleNo.find(items => items.id === id));
                                // console.log(fullFilledInfo)
                                // returnData = fullFilledInfo;
                                returnData.status = true;
                                returnData.message = 'successfully';
                                returnData.data = combinedData;
                                
                            }else {
                                // console.log('Truck available but no available Space');

                                // returnData = 'Truck available but no available Space'

                                returnData.status = false;
                                returnData.message = 'Truck available but no available Space';
                                returnData.data = '';
                            }
                        })
                    } else if(bookType === 'Full Truck') {
                        const combinedData =[]
                        filterFullTrucks.map(item => {
                            const id = item.id;
                            const status = item.status;
                            item.from = from;
                            item.to = to;
                            item.departureDate = departureDate;

                            if(status === 0) {
                                combinedData.push(filterFullTrucks.find(data => data.id === id));
                            
                                // returnData = checkedData;

                                returnData.status = true;
                                returnData.message = 'successfully';
                                returnData.data = combinedData;

                            }else {
                                // console.log('No available Trucks');

                                // returnData = 'No available  Trucks'
                                returnData.status = false;
                                returnData.message = 'No available  Trucks';
                                returnData.data = '';
                            }
                        })
                    }else {
                        // console.log('no trucks available');
                        // returnData = 'No available Trucks';
                        returnData.status = false;
                        returnData.message = 'No available  Trucks';
                        returnData.data = '';
                        
                    }
                    }
                    
                
            res.json({ success: true, trucksData: returnData });
            // return(returnData);
        }catch(error) {
            res.json({success: false, message: error.message})
        }

    }catch(error) {
        console.log(error);
        res.json({success: false, message: error.message});
    }
}

const booking = {
    searchProcess,
}

module.exports = booking;