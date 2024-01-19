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
    console.log(progressData);
  return (
    <>
    <DashHeader />
    <div className="absolute mt-[100px] w-[100%]">
        <div className="flex flex-row justify-center items-center mt-[70px]">
            <form onSubmit={(e) => handleSubmit(e)}>
                <input type="number" 
                value={bookingCode}
                onChange={(e) => setBookingCode(e.target.value)}
                className=' w-[200px] border-[1px] border-lightBlue outline-none rounded-[3px] text-[17px] py-[4px] px-[3px]'
                />
                <div className="flex justify-center mt-[20px]">
                    <button type='submit'
                    className='bg-lightBlue px-[15px] py-[8px] rounded-[4px]'
                    >Check</button>
                </div>
            </form>
        </div>
    </div>
    </>
  )
}

export default Progress