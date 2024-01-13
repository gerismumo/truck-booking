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
        const formData = new FormData();
        formData.append('truckType', truckType);
        formData.append('bookType', bookType);
        formData.append('squareMeter', squareMeter);
        formData.append('itemsNumber', itemsNumber);
        formData.append('from', from);
        formData.append('to', to);
        formData.append('departureDate', departureDate);

        try {
            const response = await axios.post(API_URL + '/booking', formData);
            console.log(response);
        }catch (error) {

        }

    }

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