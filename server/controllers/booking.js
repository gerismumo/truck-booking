const database = require('../Database/Db');
const queries  = require('../queries/queries');
const uuid = require('uuid');

const bookingProcess = async(req, res) => {
    const currentBookData = req.body;

    const id = currentBookData.id;
    const book_type = currentBookData.book_type;
    const truck_type = currentBookData.truck_type;
    const pricing = currentBookData.pricing;
    const full_space = currentBookData.full_space;
    const max_amount = currentBookData.max_amount;
    const truck_model = currentBookData.truck_model;
    const number_plate = currentBookData.number_plate;
    const truck_image = currentBookData.truck_image;
    const driver_name = currentBookData.driver_name;
    const driver_license = currentBookData.driver_license;
    const national_id = currentBookData.national_id;
    const start_route = currentBookData.start_route;
    const end_route = currentBookData.end_route;
    const status = currentBookData.status;
    const on_schedule = currentBookData.on_schedule;
    const priceToPay = currentBookData.priceToPay;
    const no_of_your_vehicles = currentBookData.no_of_your_vehicles;
    const from = currentBookData.from;
    const to = currentBookData.to;
    const departureDate = currentBookData.departureDate;
    const checkRemainingSpace = currentBookData.checkRemainingSpace;
    const customerPhoneNumber = currentBookData.phoneNumber;
    const customerEmail = currentBookData.email;
    const customerFullName = currentBookData.fullName;
    const customerNationalId = currentBookData.customerId;
    const customerCountry = currentBookData.customerCountry;
    const customerGoodsDescription = currentBookData.goodsDescription;

    const uniqueId = uuid.v4();


    console.log(currentBookData);

    try {

        const connection = await database.createConnection();

        const updateRemainAmount = (connection, truckId, remainAmount) => {
            return new Promise((resolve, reject) => {
                const updateQuery = 'UPDATE trucks SET max_amount = ? WHERE id = ?';
        
                connection.query(updateQuery, [remainAmount, truckId], (err, result) => {
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

        const addBook = async (connection,id, truck_id, booked_truck,book_type,
            customer_name,customer_tel,customer_email,customer_national_id, customer_country,
            goods_description,amount_of_goods,from, to, departure_date, booking_code ) => {
            return new Promise((resolve, reject) => {
                const addQuery = `INSERT INTO booking_table 
                (id, truck_id, booked_truck, book_type,customer_name,
                    customer_tel, customer_email, customer_national_id,customer_country, 
                    goods_description, amount_of_goods, route_from, route_to, departure_date, booking_code)
                     VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`;
        
                connection.query(addQuery, [id, truck_id, booked_truck,book_type,
                    customer_name,customer_tel,customer_email,customer_national_id, customer_country,
                    goods_description,amount_of_goods,from, to, departure_date, booking_code], (err, result) => {
                    if (err) {
                        console.log('error',err);
                        reject(err);
                    } else {
                        console.log('result',result);
                        resolve(result);
                    }
                });
            });
        };

        function generateCode ()  {
            let code = '';
            const digits = '0123456789';

            for (let i = 0; i < 6 ; i++) {
                const random = Math.floor(Math.random() * digits.length);
                code += digits.charAt(random)
            }
            return code;
        }

        if(book_type === 'Number of Items') {
            //update reamining amount
            await updateRemainAmount(connection, id, checkRemainingSpace);
            //update status according  to remaining about
            if(checkRemainingSpace === max_amount) {
                updateFull(connection, id);
            }
            //add booking detail, id, phone no., email, routes , payment and generate a unqiue code sen dthrough email
            const uniqueCode = generateCode();
            console.log(uniqueCode);
            await addBook(connection,uniqueId, id,
                 number_plate, book_type, customerFullName,
                 customerPhoneNumber, customerEmail,customerNationalId,customerCountry,
                 customerGoodsDescription, no_of_your_vehicles,from,to, departureDate, uniqueCode );
            
            //send email to the customer

        } else if (book_type === '') {

        } else if (book_type === '') {

        }
    }catch (error) {
        console.log(error);
    }
}

const payBooking = {
    bookingProcess,
}

module.exports = payBooking;