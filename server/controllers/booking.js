const pool = require('../Database/Db');
const queries  = require('../queries/queries');
const uuid = require('uuid');
const nodemailer = require('nodemailer');
const dotenv = require('dotenv');
dotenv.config({path: '../Database/.env'});

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
    const checkRemainingAmount = currentBookData.checkRemainingAmount;
    const no_of_squareMeter = currentBookData.no_of_squareMeter;
    const customerPhoneNumber = currentBookData.phoneNumber;
    const customerEmail = currentBookData.email;
    const customerFullName = currentBookData.fullName;
    const customerNationalId = currentBookData.customerId;
    const customerCountry = currentBookData.customerCountry;
    const customerGoodsDescription = currentBookData.goodsDescription;

    const uniqueId = uuid.v4();


    // console.log(currentBookData);

    try {

       

        const updateRemainAmount = (pool, truckId, remainAmount) => {
            const updateQuery = 'UPDATE trucks SET max_amount = ? WHERE id = ?';
              const [result] =  pool.query(updateQuery, [remainAmount, truckId] );
              return result;
        };

        const updateFull = async (pool, truckId) => {
           
                const updateQuery = 'UPDATE trucks SET status = true WHERE id = ?';
        
               const [result] =  await pool.query(updateQuery, [truckId] );
               return result;
        };

        const addBook = async (pool,id, truck_id, booked_truck,book_type,
            customer_name,customer_tel,customer_email,customer_national_id, customer_country,
            goods_description,amount_of_goods,from, to, departure_date, price, booking_code ) => {
            
                const addQuery = `INSERT INTO booking_table
                    (id, truck_id, booked_truck, book_type,customer_name,
                    customer_tel, customer_email, customer_national_id,customer_country,
                    goods_description, amount_of_goods, route_from, route_to, departure_date,price, booking_code)
                     VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`;
        
                const [result] = await pool.query(addQuery, [id, truck_id, booked_truck,book_type,
                    customer_name,customer_tel,customer_email,customer_national_id, customer_country,
                    goods_description,amount_of_goods,from, to, departure_date, price, booking_code]);
                 return result;
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
            //update remaining amount
            await updateRemainAmount(pool, id, checkRemainingSpace);
            //update status according  to remaining about
            if(checkRemainingSpace <= 2) {
                updateFull(pool, id);
            }
            //add booking detail, id, phone no., email, routes , payment and generate a unqiue code sen dthrough email
            const uniqueCode = generateCode();
            // console.log(uniqueCode);
            await addBook(pool,uniqueId, id,
                 number_plate, book_type, customerFullName,
                 customerPhoneNumber, customerEmail,customerNationalId,customerCountry,
                 customerGoodsDescription, no_of_your_vehicles,from,to, departureDate,priceToPay, uniqueCode );
            
            //send email to the customer
            let config = {
                host: process.env.EMAIL_HOST,
                port: process.env.EMAIL_PORT,
                secure: process.env.EMAIL_SECURE,
                auth: {
                user: process.env.EMAIL_USERNAME,
                pass: process.env.EMAIL_PASSWORD,
                }
            }
            let transporter = nodemailer.createTransport(config);

            const data = {
                from: process.env.EMAIL_USERNAME,
                to: customerEmail,
                subject: 'Booking',
                html: `
                <p>Dear<span>${customerFullName},</span> </p> 
                <p>Your booking code is ${uniqueCode},  trace your goods transportation using it</p>
              `,
            }
            transporter.sendMail(data)
            .then(() => {
                const response = ({success: true, message:'Submitted Successfully'});

                    const companyMessage = `<p>Customer:${customerFullName} </p>
                    <p>Booked a truck using this code ${uniqueCode} you can trace the booking in our website</p>`

                                            
                    const companyData = {
                        from: process.env.EMAIL_USERNAME,
                        to: process.env.COMPANY_EMAIL,
                        subject: 'Company Board',
                        html: companyMessage,
                    }
                    transporter.sendMail(companyData)
                    .then(() => {
                        res.json(response);
                      })
                      .catch(error => {
                        res.json({success: false, message: 'Error submitting information'});
                      });
              })
              .catch(error => {
                res.json({success: false, message: 'Error submitting information'});
              });

        } else if (book_type === 'Full Truck') {
            updateFull(pool, id);
            const uniqueCode = generateCode();

            await addBook(pool,uniqueId, id,
                number_plate, book_type, customerFullName,
                customerPhoneNumber, customerEmail,customerNationalId,customerCountry,
                customerGoodsDescription, book_type,from,to, departureDate,pricing, uniqueCode );

                //send email to the customer

                let config = {
                    host: process.env.EMAIL_HOST,
                    port: process.env.EMAIL_PORT,
                    secure: process.env.EMAIL_SECURE,
                    auth: {
                    user: process.env.EMAIL_USERNAME,
                    pass: process.env.EMAIL_PASSWORD,
                    }
                }
                let transporter = nodemailer.createTransport(config);
    
                const data = {
                    from: process.env.EMAIL_USERNAME,
                    to: customerEmail,
                    subject: 'Booking',
                    html: `
                    <p>Dear<span>${customerFullName},</span> </p> 
                    <p>Your booking code is ${uniqueCode},  trace your goods transportation using it</p>
                  `,
                }
                transporter.sendMail(data)
                .then(() => {
                    const response = ({success: true, message:'Submitted Successfully'});
    
                        const companyMessage = `<p>Customer:${customerFullName} </p>
                        <p>Booked a truck using this code ${uniqueCode} you can trace the booking in our website</p>`
    
                                                
                        const companyData = {
                            from: process.env.EMAIL_USERNAME,
                            to: process.env.COMPANY_EMAIL,
                            subject: 'Company Board',
                            html: companyMessage,
                        }
                        transporter.sendMail(companyData)
                        .then(() => {
                            res.json(response);
                          })
                          .catch(error => {
                            res.json({success: false, message: 'Error submitting information'});
                          });
                  })
                  .catch(error => {
                    res.json({success: false, message: 'Error submitting information'});
                  });
        } else if (book_type === 'Square Meter') {
            //update remaining amount
            await updateRemainAmount(pool, id, checkRemainingAmount);

            if(checkRemainingAmount <= 500) {
                updateFull(connection, id);
            }

            const uniqueCode = generateCode();

            await addBook(pool,uniqueId, id,
                number_plate, book_type, customerFullName,
                customerPhoneNumber, customerEmail,customerNationalId,customerCountry,
                customerGoodsDescription, no_of_squareMeter,from,to, departureDate,priceToPay, uniqueCode );
                //email

                let config = {
                    host: process.env.EMAIL_HOST,
                    port: process.env.EMAIL_PORT,
                    secure: process.env.EMAIL_SECURE,
                    auth: {
                    user: process.env.EMAIL_USERNAME,
                    pass: process.env.EMAIL_PASSWORD,
                    }
                }
                let transporter = nodemailer.createTransport(config);
    
                const data = {
                    from: process.env.EMAIL_USERNAME,
                    to: customerEmail,
                    subject: 'Booking',
                    html: `
                    <p>Dear<span>${customerFullName},</span> </p> 
                    <p>Your booking code is ${uniqueCode},  trace your goods transportation using it</p>
                  `,
                }
                transporter.sendMail(data)
                .then(() => {
                    const response = ({success: true, message:'Submitted Successfully'});
    
                        const companyMessage = `<p>Customer:${customerFullName} </p>
                        <p>Booked a truck using this code ${uniqueCode} you can trace the booking in our website</p>`
    
                                                
                        const companyData = {
                            from: process.env.EMAIL_USERNAME,
                            to: process.env.COMPANY_EMAIL,
                            subject: 'Company Board',
                            html: companyMessage,
                        }
                        transporter.sendMail(companyData)
                        .then(() => {
                            res.json(response);
                          })
                          .catch(error => {
                            res.json({success: false, message: 'Error submitting information'});
                          });
                  })
                  .catch(error => {
                    res.json({success: false, message: 'Error submitting information'});
                  });
        }
    }catch (error) {
        console.log(error);
    }
}

const getBookingsList = async(req, res) => {
    try {
      
       
        const query = 'SELECT * FROM booking_table';

        const [result] = await  pool.query(query);

        res.json({success: true, data: result});
        return result; 

    }catch(error) {
        console.log(error);
        res.json({success: false, message: error.message});
    }
}

const deleteBookings = async(req, res) => {
    const {id }= req.params;
    try{
        const query = 'DELETE FROM booking_table WHERE id = ?'
        const data = await pool.query(query, id);
        res.json({success: true, message: 'Deleted successfully'});
        return data;
    }catch(error) {
        res.json({success: false, message: error.message});
    }
}

const getBookingListData = async(req, res) => {
    try {
        
        const query = 'SELECT * FROM booking_table';
        const [result] = await  pool.query(query) 
        return result; 

    }catch(error) {
        console.log(error);
        res.json({success: false, message: error.message});
    }
}
const updateDelivery = async(req, res) => {
    const id = req.params.id;
    const deliveryData = req.body;


    let noData = '';
    const deliveryStatus = deliveryData.deliveryStatus;
    let deliveryDate = deliveryData.deliveryDate;
    if(deliveryStatus ==='notDelivered') {
        deliveryDate = noData;
    }

    
    try {
        const query = 'UPDATE booking_table SET delivery_status = ? , delivery_date =? WHERE id = ?';
        
           const [result] = await pool.query(query, [deliveryStatus, deliveryDate, id] );

        if (deliveryStatus === 'delivered') {
            const data = await getBookingListData(req, res);
            const currentObject = data.find(data => data.id === id);
            if(currentObject) {
                const customerName = currentObject.customer_name;
                const customerEmail = currentObject.customer_email;
                const bookingCode = currentObject.booking_code;
                const destination = currentObject.route_to;

                //send delivery email

                let config = {
                    host: process.env.EMAIL_HOST,
                    port: process.env.EMAIL_PORT,
                    secure: process.env.EMAIL_SECURE,
                    auth: {
                    user: process.env.EMAIL_USERNAME,
                    pass: process.env.EMAIL_PASSWORD,
                    }
                }
                let transporter = nodemailer.createTransport(config);
    
                const data = {
                    from: process.env.EMAIL_USERNAME,
                    to: customerEmail,
                    subject: 'Delivery',
                    html: `
                    <p>Dear<span>${customerName},</span> </p> 
                    <p>Your goods have being delivered at the destination station: ${destination}, you can confirm with your booking code: ${bookingCode}</p>
                  `,
                }
                transporter.sendMail(data)
            }
            
        }
        

        res.json({success: true, message: 'Successfully Updated'})
        return result;
    }catch(error) {
        console.log(error.message);
        res.json({success:false, message:error.message});
    }
}
const payBooking = {
    bookingProcess,
    getBookingsList,
    deleteBookings,
    updateDelivery,
}

module.exports = payBooking;