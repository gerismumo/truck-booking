import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { API_URL } from './TruckTypes';
import icons from './services/icons';

export const useTrucksData = () => {
  const[trucksList, setTrucksList] = useState([]);

  useEffect(() => {
    const trucksData = async() => {
      try {
        const response = await axios.get(API_URL +'/getTrucks');

        const success = response.data.success;
        if(success) {
          setTrucksList(response.data.data);
        }
        console.log(response);
      }catch(error) {
        console.error(error.message);
      }
    }
    trucksData();
  }, []);

  return {trucksList, setTrucksList};
}
const Trucks = () => {
  const {trucksList} = useTrucksData();
  

  const handleDeleteTruck = async(id) => {
    console.log(id);
    try {
      const response = await axios.delete(`${API_URL}/deleteTrucks/${id}`);
      console.log(response);
    }catch (error) {
      console.error(error.message);
    }
  }

  return (
    <div className="flex justify-center py-[30px]">
      <div className="">
        <table className='border-collapse'>
          <thead>
            <th className='px-[20px] py-[10px] border border-[#ddd]'>Truck Type</th>
            <th className='px-[20px] py-[10px] border border-[#ddd]'>Book Type</th>
            <th className='px-[20px] py-[10px] border border-[#ddd]'>Pricing</th>
            <th className='px-[20px] py-[10px] border border-[#ddd]'>Max Amount</th>
            <th className='px-[20px] py-[10px] border border-[#ddd]'>Model</th>
            <th className='px-[20px] py-[10px] border border-[#ddd]'>No. Plate</th>
            <th className='px-[20px] py-[10px] border border-[#ddd]'>Truck Image</th>
            <th className='px-[20px] py-[10px] border border-[#ddd]'>Driver Name</th>
            <th className='px-[20px] py-[10px] border border-[#ddd]'>Driver License</th>
            <th className='px-[20px] py-[10px] border border-[#ddd]' colSpan='2'>Route</th>
            <th className='px-[20px] py-[10px] border border-[#ddd]'>Status</th>
            <th className='px-[20px] py-[10px] border border-[#ddd]'>Schedule</th>
            <th className='px-[20px] py-[10px] border border-[#ddd]'>Track Truck</th>
          </thead>
          <tbody>
            {trucksList.map((trucks) => (
              <React.Fragment>
                <tr>
                  <td className='px-[20px] py-[10px] border border-[#ddd]'>{trucks.truck_type}</td>
                  <td className='px-[20px] py-[10px] border border-[#ddd]'>{trucks.book_type}</td>
                  <td className='px-[20px] py-[10px] border border-[#ddd]'>{trucks.book_type === 'Square Meter' ? `Per Square: ${trucks.pricing} `:  trucks.book_type === 'Car Transporter Truck' ? `Per Square: ${trucks.pricing}` : ''}</td>
                  <td className='px-[20px] py-[10px] border border-[#ddd]'>{trucks.max_amount}</td>
                  <td className='px-[20px] py-[10px] border border-[#ddd]'>{trucks.truck_model}</td>
                  <td className='px-[20px] py-[10px] border border-[#ddd]'>{trucks.number_plate}</td>
                  <td className='px-[20px] py-[10px] border border-[#ddd]'>
                    <img src={URL.createObjectURL(new Blob([new Uint8Array(trucks.truck_image.data)],{type: 'image/jpeg', }))} alt="" 
                    className='w-[100px] h-[70px]'
                    />
                  </td>
                  <td className='px-[20px] py-[10px] border border-[#ddd]'>{trucks.driver_name}</td>
                  <td className='px-[20px] py-[10px] border border-[#ddd]'>{trucks.driver_license}</td>
                  <td className='px-[20px] py-[10px] border border-[#ddd]'>
                    <div className="flex flex-col">
                      <p className='font-[500]'>From:</p>
                      <span>{trucks.start_route}</span>
                    </div>
                    </td>
                  <td className='px-[20px] py-[10px] border border-[#ddd]'>
                    <div className="flex flex-col">
                      <p className='font-[500]'>To:</p>
                      <span>{trucks.end_route}</span>
                    </div>
                  </td>
                  <td className='px-[20px] py-[10px] border border-[#ddd]'>Active</td>
                  <td className='px-[20px] py-[10px] border border-[#ddd]'>On Delivery</td>
                  <td className='px-[20px] py-[10px] border border-[#ddd]'>Unavailable</td>
                  <td className='px-[20px] py-[10px] border border-[#ddd]'><span>{icons.eye}</span></td>
                  <td className='px-[20px] py-[10px] border border-[#ddd]'><span>{icons.edit}</span></td>
                  <td className='px-[20px] py-[10px] border border-[#ddd]'><span onClick={() => handleDeleteTruck(trucks.id)}>{icons.delete}</span></td>
                </tr>
              </React.Fragment>
            ))}
            
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default Trucks