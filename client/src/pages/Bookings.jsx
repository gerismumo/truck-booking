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
    const[openUpdateDelivery, setOpenUpdateDelivery] = useState(false);
    const[deliveredId, setDeliveredId] = useState(null);
    const handleOpenUpdateDelivery = (id) => {
      setDeliveredId(id);
      if(id) {
        setOpenUpdateDelivery(!openUpdateDelivery);
      }
    }

    const[deliveryStatus, setDeliveryStatus] = useState('')
    const[deliveryDate, setDeliveryDate] = useState('')

    const handleChangeDelivery = (e) => {
      setDeliveryStatus(e.target.value)
    }

    const handleUpdateDelivery = async(e) => {
      e.preventDefault();

      if(deliveryStatus === 'delivered') {
        if(deliveryDate === '') {
          alert('Please enter delivered Date');
          return;
        }
      }

      console.log('deliveryStatus',deliveryStatus);
      console.log('deliveryDate',deliveryDate);
      const deliveryData = {
        deliveryStatus,
        deliveryDate
      }

      try {
        const response = await axios.put(`${API_URL}/updateDelivery/${deliveredId}`, deliveryData);
        if(response.data.success) {
          getData();
          setOpenUpdateDelivery(false);
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
            <th className='px-[20px] py-[10px] border border-[#ddd]'>Delivery Status</th>
            <th className='px-[20px] py-[10px] border border-[#ddd]'>Start Delivery Date</th>
            <th className='px-[20px] py-[10px] border border-[#ddd]'>End Delivery Date</th>
            <th className='px-[20px] py-[10px] border border-[#ddd]'>Complete Status</th>
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
                  <td className='px-[20px] py-[10px] border border-[#ddd]'>{data.delivery_status}</td>
                  <td className='px-[20px] py-[10px] border border-[#ddd]'>{data.start_delivery_date}</td>
                  <td className='px-[20px] py-[10px] border border-[#ddd]'>{data.delivery_date}</td>
                  <td className='px-[20px] py-[10px] border border-[#ddd]'>{data.done_booking === 1 ? 'Done Delivery':'UnDone Delivery'}</td>
                  <td className='px-[20px] py-[10px] border border-[#ddd]'><span onClick={()=>handleDelete(data.id)}>{icons.delete}</span></td>
                </tr>
                {openUpdateDelivery && data.id === deliveredId && (
                  <tr>
                    <td colSpan='17' className='px-[20px] py-[10px] border border-[#ddd]'>
                      <form onSubmit={(e) => handleUpdateDelivery(e)} className='flex justify-center'>
                        <div className=" flex flex-col">
                          <label htmlFor="" className='text-[17px] mb-[5px] font-[500] mt-[10px]'>Status:</label>
                          <div className="">
                            <input type="radio" name="checkDelivery"  id="" 
                            value='delivered'
                            checked={deliveryStatus === 'delivered'}
                            onChange={handleChangeDelivery}
                            />
                            <label htmlFor="">Delivered</label>
                          </div>
                          <div className="justify-center gap-[10px] items-center">
                            <input type="radio" name="checkDelivery" id="" 
                            value='notDelivered'
                            checked={deliveryStatus === 'notDelivered'}
                            onChange={handleChangeDelivery}
                            />
                            <label htmlFor="">Not Delivered</label>
                          </div>
                          {deliveryStatus === 'delivered' && (
                            <>
                            <label htmlFor="" className='text-[17px] mb-[5px] font-[500] mt-[10px]'>Delivered Date:</label>
                            <input type="date" name="" id="" 
                            value={deliveryDate}
                            onChange={(e) => setDeliveryDate(e.target.value)}
                             className='border-[1px] border-lightBlue outline-none rounded-[3px] text-[17px] py-[4px] px-[3px]'
                            />
                            </>
                          )}
                          <div className="mt-[20px] flex justify-center" >
                            <button className='bg-lightBlue px-[15px] py-[8px] rounded-[4px]'>Update</button>
                          </div>
                        </div>
                        
                      </form>
                    </td>
                  </tr>
                )}
              </React.Fragment>
            ))}
          </tbody>
        </table>
    </div>
  )
}

export default Bookings