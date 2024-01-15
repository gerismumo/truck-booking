import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useRoutesList } from './Stations';
import { API_URL, useTruckTypeList } from './TruckTypes';
const TestForm = () => {
    const { truckTypeList } = useTruckTypeList();
    const {routesList} = useRoutesList();

    const[truckType, setTruckType] = useState('');
    const[from, setFrom] = useState('');
    const[to, setTo] = useState('');
    const[squareMeter, setSquareMeter] = useState('');
    const[itemsNumber, setItemsNumber] = useState('');
    const[departureDate, setDepartureDate] = useState('');

    const[bookType, setBookType] = useState(null);
    const getTruckTypeObject = truckTypeList.find(truck => truck.truck_type === truckType)

    useEffect(() => {
        if(getTruckTypeObject) {
            setBookType(getTruckTypeObject.book_type);
        }
    },[getTruckTypeObject, setBookType])
    

    console.log(bookType);


    const[errorMessage, setErrorMessage] = useState(null);
    const[successMessage, setSuccessMessage] = useState(null);
    const[fullTrucks, setFullTrucks] = useState([]);
    const[carsTransporterTrucks, setCarsTransporterTrucks] = useState([]);
    const[squareMetersTrucks, setSquareMetersTrucks] = useState([]);

    const handleSubmitForm = async(e) => {
        e.preventDefault();

        console.log(
            truckType,
            from,
            to,
            squareMeter,
            itemsNumber,
            departureDate,
            bookType
        )
        const bookingData = {
            truckType,
            from,
            to,
            squareMeter,
            itemsNumber,
            departureDate,
            bookType
        }
        
        try {
            const response = await axios.post(API_URL + '/booking', bookingData);
            // console.log(response.data);
            if(response.data.success) {
                const trucksData = response.data.trucksData;
                const success = trucksData.status;

                if(success) {
                    setSuccessMessage(trucksData.message)
                    console.log('data',trucksData.data);
                    const data = trucksData.data;
                    
                    const filteredDataNumberOfCars= data.filter(data => data.book_type === 'Number of Items');
                    setCarsTransporterTrucks(filteredDataNumberOfCars);
                
                    const filteredDataSquare = data.filter(data => data.book_type === 'Square Meter') ;
                    setSquareMetersTrucks(filteredDataSquare);
                
                    const filteredDataFullTrucks = data.filter(data => data.book_type === 'Full Truck');
                    setFullTrucks(filteredDataFullTrucks);
                    
                }else {
                    console.log(trucksData.message);
                    setErrorMessage(trucksData.message);
                }
            }
        }catch (error) {
            console.log(error.message)
        }

    }
    console.log('errorMessage',errorMessage);
    console.log('successMessage',successMessage);
    console.log('fullTrucks',fullTrucks);
    console.log('carsTransporterTrucks',carsTransporterTrucks);
    console.log('squareMetersTrucks',squareMetersTrucks);
  return (
    <div className="flex justify-center">
        <form onSubmit={(e) => handleSubmitForm(e)} className='flex flex-col w-[600px]'>
            <label htmlFor="" className='text-[17px] mb-[5px] font-[500] mt-[10px]'>Truck Types:</label>
            <select name="" id=""
            value={truckType}
            onChange={(e) => setTruckType(e.target.value)}
            className='border-[1px] border-lightBlue outline-none rounded-[3px] text-[17px] py-[4px] px-[3px]'
            >
                <option  value=''>Select a option</option>
                {truckTypeList.map((truck) => (
                    <option key={truck._id} value={truck.truck_type}>{truck.truck_type}</option>
                ))}
            </select>
            <label htmlFor="" className='text-[17px] mb-[5px] font-[500] mt-[10px]'>Book Type:</label>
            <span>{bookType}</span>
            {bookType === 'Square Meter' && (
                <input type="number" 
                min={0}
                placeholder='Enter goods Square Meter'
                value={squareMeter}
                onChange={(e) => setSquareMeter(e.target.value)}
                className='border-[1px] border-lightBlue outline-none rounded-[3px] text-[17px] py-[4px] px-[3px]'
                />
            )}
            {bookType === 'Number of Items' && truckType === 'Car Transporter Truck' && (
                <input type="number" 
                    min={0}
                    placeholder='Enter Number of Vehicles to Transport'
                    value={itemsNumber}
                    onChange={(e) => setItemsNumber(e.target.value)}
                    className='border-[1px] border-lightBlue outline-none rounded-[3px] text-[17px] py-[4px] px-[3px]'
                />
            )}
            <label htmlFor="" className='text-[17px] mb-[5px] font-[500] mt-[10px]'>From:</label>
            <select name="" id=""
            value={from}
            onChange={(e) => setFrom(e.target.value)}
            className='border-[1px] border-lightBlue outline-none rounded-[3px] text-[17px] py-[4px] px-[3px]'
            >
                {routesList.map((route) => (
                    <option key={route.id} value={route.route_name}>{route.route_name}</option>
                ))}
            </select>
            <label htmlFor="" className='text-[17px] mb-[5px] font-[500] mt-[10px]'>To:</label>
            <select name="" id=""
            value={to}
            onChange={(e) => setTo(e.target.value)}
            className='border-[1px] border-lightBlue outline-none rounded-[3px] text-[17px] py-[4px] px-[3px]'
            >
            {routesList.reverse().map((route) => (
                    <option key={route.id} value={route.route_name}>{route.route_name}</option>
                ))}
            </select>
            <label htmlFor="" className='text-[17px] mb-[5px] font-[500] mt-[10px]'>Departure Date:</label>
            <input type="date" name="" id="" 
            value={departureDate}
            onChange={(e) => setDepartureDate(e.target.value)}
            className='border-[1px] border-lightBlue outline-none rounded-[3px] text-[17px] py-[4px] px-[3px]'
            />
            <div className="mt-[20px] flex justify-center">
                <button className='bg-lightBlue px-[15px] py-[5px] rounded-[5px]'>Book</button>
            </div>
        </form>
        <div className="flex flex-col">
            {fullTrucks.length > 0 && (
                <div className="">
                    <div className="">
                        <p><span>Results:</span>{fullTrucks.length}</p>
                    </div>
                    {fullTrucks.map((item) => (
                        <div key={item.id} className="">
                            <div className="">
                            <p><span>Book Type:</span>{item.book_type}</p>
                            </div>
                            <div className="">
                                <p><span>From:</span>{item.start_route}</p>
                            </div>
                            <div className="">
                                <p><span>To:</span>{item.end_route}</p>
                            </div>
                            <div className="">
                                <p><span>Price To Pay:</span>Ksh.{item.pricing}</p>
                            </div>
                        </div>
                    ))}
                </div>
            ) }
            {squareMetersTrucks.length > 0 && (
                <div  className="" >
                    <div className="">
                        <p><span>Results</span>{squareMetersTrucks.length}</p>
                    </div>
                    
                { squareMetersTrucks.map((item) => (
                    <div key={item.id} className="">
                        <div className="">
                        <p><span>Book Type:</span>{item.book_type}</p>
                        </div>
                        <div className="">
                            <p><span>No of squares:</span>{item.no_of_squareMeter}</p>
                        </div>
                        <div className="">
                            <p><span>Remaining Space:</span>{item.full_space}</p>
                        </div>
                        <div className="">
                            <p><span>From:</span>{item.start_route}</p>
                        </div>
                        <div className="">
                            <p><span>To:</span>{item.end_route}</p>
                        </div>
                        <div className="">
                            <p><span>Price To Pay:</span>Ksh.{item.priceToPay}</p>
                        </div>
                    </div>
                ))} 
                 </div>
            )}
             {carsTransporterTrucks.length > 0 && (
                <div  className="" >
                    <div className="">
                        <p><span>Results</span>{carsTransporterTrucks.length}</p>
                    </div>
                    
                {carsTransporterTrucks.map((item) => (
                    <div key={item.id} className="">
                        <div className="">
                        <p><span>Book Type:</span>{item.book_type}</p>
                        </div>
                        <div className="">
                            <p><span>No of Vehicles:</span>{item.no_of_your_vehicles}</p>
                        </div>
                        <div className="">
                            <p><span>Remaining Space:</span>{item.full_space}</p>
                        </div>
                        <div className="">
                            <p><span>From:</span>{item.start_route}</p>
                        </div>
                        <div className="">
                            <p><span>To:</span>{item.end_route}</p>
                        </div>
                        <div className="">
                            <p><span>Price To Pay:</span>Ksh.{item.priceToPay}</p>
                        </div>
                    </div>
                ))} 
                 </div>
            )}
        </div>
    </div>
  )
}

export default TestForm