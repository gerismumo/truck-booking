import axios from 'axios';
import React, { useState } from 'react';
import DashHeader from './DashHeader';
import { API_URL } from './TruckTypes';
const Progress = () => {
    const[bookingCode, setBookingCode] = useState('');
    const[progressData, setProgressData] = useState('');

    const handleSubmit = async(e) => {
        e.preventDefault();
        console.log(bookingCode);
        try {
            const response = await axios.get(`${API_URL}/checkProgress`,{
                params: {
                    bookingCode: bookingCode
                }
            });
            if(response.data.success){
                setProgressData(response.data.result);
            }
        }catch(error) {
            console.error(error)
        }
    }
   
  return (
    <>
    <DashHeader />
    <div className="absolute mt-[100px] w-[100%]">
        <div className="flex flex-col justify-center items-center mt-[70px] ">
            <div className="bg-[whitesmoke] p-[20px] rounded-[5px] flex flex-col items-center">
                <form onSubmit={(e) => handleSubmit(e)}>
                    <input type="number" 
                    value={bookingCode}
                    min={0}
                    onChange={(e) => setBookingCode(e.target.value)}
                    placeholder='Enter your booking code'
                    className=' w-[300px] border-[1px] border-lightBlue outline-none rounded-[3px] text-[17px] py-[4px] px-[3px]'
                    />
                    <div className="flex justify-center mt-[20px]">
                        <button type='submit'
                        className='bg-lightBlue px-[15px] py-[5px] rounded-[4px]'
                        >Check</button>
                    </div>
                </form>
                {progressData.length === 0 ? (
                    <div className="flex flex-col mt-[20px]">
                        <p className='text-[16px] text-[red] font-[500]'>No Data</p>
                    </div>
                ) : progressData.map((data) => (
                    <div className="mt-[30px] ">
                        <div className="flex flex-col gap-[20px]">
                            <div className="flex justify-between items-center">
                                <p className='text-[18px] text-[#0B60B0]'><span className='font-[700] text-[black] mr-[20px]'>Start Delivery Date:</span>{data.start_delivery_date === '' || 'null' ? 'Not yet': data.start_delivery_date}</p>
                            </div>
                            <div className="flex justify-between  items-center">
                                <p className='text-[18px] text-[#0B60B0]'><span className='font-[700] text-[black] mr-[20px]'>Delivered Date:</span>{data.delivery_date === '' || 'null' ? 'Not yet' : data.delivery_date}</p>
                            </div>
                            <div className="flex justify-between  items-center">
                                <p className='text-[18px] text-[#0B60B0]'><span className='font-[700] text-[black] mr-[20px]'>Status:</span>{data.delivery_status === 'not delivered' ? 'On delivery': 'Delivered'}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            
            
        </div>
    </div>
    </>
  )
}

export default Progress