import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { API_URL } from './TruckTypes';
import icons from './services/icons';
export const useBookings = () => {
    const[bookingsList, setBookingsList] = useState([]);

    const getData = async() => {
        try{
            const response = await axios.get(API_URL + '/getBookings');
            const success = response.data.success;
            if(success) {
                setBookingsList(response.data.data);
            }
            console.log(response);
        }catch(error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getData();
    },[])
    return {bookingsList, setBookingsList,getData}
}
const Bookings = () => {
    const {bookingsList,getData} = useBookings();
    
    const handleDelete = async(id) => {
        try{
            const response = await axios.delete(`${API_URL}/deleteBookings/${id}`);
            if(response.data.success) {
                getData();
            }
        }catch(error) {
            console.log(error.message);
        }
    }
  return (
    <div className="flex flex-col justify-center p-[30px]">
        <table className='border-collapse'>
          <thead>
            <th className='px-[20px] py-[10px] border border-[#ddd]'>Book Type</th>
            <th className='px-[20px] py-[10px] border border-[#ddd]'>booked Truck</th>
            <th className='px-[20px] py-[10px] border border-[#ddd]'>Customer Name</th>
            <th className='px-[20px] py-[10px] border border-[#ddd]'>Customer No.</th>
            <th className='px-[20px] py-[10px] border border-[#ddd]'>Customer Email</th>
            <th className='px-[20px] py-[10px] border border-[#ddd]'>Customer Id</th>
            <th className='px-[20px] py-[10px] border border-[#ddd]'>Customer Country</th>
            <th className='px-[20px] py-[10px] border border-[#ddd]'>Description</th>
            <th className='px-[20px] py-[10px] border border-[#ddd]'>Paid Amount</th>
            <th className='px-[20px] py-[10px] border border-[#ddd]'>From</th>
            <th className='px-[20px] py-[10px] border border-[#ddd]'>To</th>
            <th className='px-[20px] py-[10px] border border-[#ddd]'>Departure Date</th>
            <th className='px-[20px] py-[10px] border border-[#ddd]'>Booking Code</th>
          </thead>
          <tbody>
            {bookingsList.map((data) => (
              <React.Fragment key={data.id}>
                <tr key={data.id}>
                  <td className='px-[20px] py-[10px] border border-[#ddd]'>{data.book_type}</td>
                  <td className='px-[20px] py-[10px] border border-[#ddd]'>{data.booked_truck}</td>
                  <td className='px-[20px] py-[10px] border border-[#ddd]'>{data.customer_name}</td>
                  <td className='px-[20px] py-[10px] border border-[#ddd]'>{data.customer_tel}</td>
                  <td className='px-[20px] py-[10px] border border-[#ddd]'>{data.customer_email}</td>
                  <td className='px-[20px] py-[10px] border border-[#ddd]'>{data.customer_national_id}</td>
                  <td className='px-[20px] py-[10px] border border-[#ddd]'>{data.customer_country}</td>
                  <td className='px-[20px] py-[10px] border border-[#ddd]'>{data.goods_description}</td>
                  <td className='px-[20px] py-[10px] border border-[#ddd]'>{data.price}</td>
                  <td className='px-[20px] py-[10px] border border-[#ddd]'>{data.route_from}</td>
                  <td className='px-[20px] py-[10px] border border-[#ddd]'>{data.route_to}</td>
                  <td className='px-[20px] py-[10px] border border-[#ddd]'>{data.departure_date}</td>
                  <td className='px-[20px] py-[10px] border border-[#ddd]'>{data.booking_code}</td>
                  {/* <td className='px-[20px] py-[10px] border border-[#ddd]'><span>{icons.eye}</span></td>
                  <td className='px-[20px] py-[10px] border border-[#ddd]'><span>{icons.edit}</span></td> */}
                  <td className='px-[20px] py-[10px] border border-[#ddd]'><span onClick={()=>handleDelete(data.id)}>{icons.delete}</span></td>
                </tr>
              </React.Fragment>
            ))}
            
          </tbody>
        </table>
    </div>
  )
}

export default Bookings