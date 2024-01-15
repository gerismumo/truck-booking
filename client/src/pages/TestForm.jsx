import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useRoutesList } from './Stations';
import { API_URL, useTruckTypeList } from './TruckTypes';
const TestForm = () => {
    const routes = [
        {id: 'ec5f7e45-0df4-4f9c-830a-d6d71202aba7', order_id: 5, route_name: 'Mombasa'},
        {id: 'd7e72bd1-be5f-4120-92cc-a42dd661876d', order_id: 6, route_name: 'Mariakani'},
        {id: 'bc90b643-3621-40a6-952d-c178bec3b70d', order_id: 7, route_name: 'Voi'},
        {id: 'e8984491-dacf-4cca-bed6-24ac230297a4', order_id: 8, route_name: 'Mtito Andei'},
        {id: '97c8ec86-87b0-4e99-a2e7-d2e7e241d6f4', order_id: 9, route_name: 'Kibwezi'},
        {id: 'ad9f4547-ba41-4c73-8a38-9d98c39c2919', order_id: 10, route_name: 'Emali'},
        {id: 'e5ba9538-bb47-4442-8e9f-036e8214082f', order_id: 11, route_name: 'Athi River'},
        {id: '84d9036d-3c6b-4bd2-92e3-d5ea09701252', order_id: 12, route_name: 'Nairobi'},
        {id: '3ff3edde-61c3-425a-8671-fdf176b9efe5', order_id: 13, route_name: 'Nakuru'},
        {id: '8a9bc29f-f442-4623-9300-4783bcd89d85', order_id: 14, route_name: 'Kericho'},
        {id: '060cabad-55fb-413f-8d9d-7e66c9b12a2d', order_id: 15, route_name: 'Kisumu'}
      ];
      
     
      const liesBetween = (route1, route2, targetRoute) => {
        const order1 = Math.min(route1.order_id, route2.order_id);
        const order2 = Math.max(route1.order_id, route2.order_id);
        const targetOrder = targetRoute.order_id;
      
        return targetOrder >= order1 && targetOrder <= order2;
      };
      
      
      const routeFrom = routes.find(route => route.route_name === 'Mombasa');
      const routeTo = routes.find(route => route.route_name === 'Kibwezi');
      const routeVoi = routes.find(route => route.route_name === 'Nairobi');
      const routeMtitoAndei = routes.find(route => route.route_name === 'Mtito Andei');
      
    
      const isBetween = liesBetween(routeFrom, routeTo, routeVoi) && liesBetween(routeFrom, routeTo, routeMtitoAndei);
      
      console.log(`Does the route from Voi to Mtito Andei lie between Mombasa and Kibwezi? ${isBetween}`);

      
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
    </div>
  )
}

export default TestForm