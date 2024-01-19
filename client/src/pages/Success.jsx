import React from 'react'
import DashHeader from './DashHeader'
import icons from './services/icons'
const Success = () => {
  return (
    <>
    <DashHeader />
    <div className="absolute mt-[100px] w-[100%]">
        <div className="flex flex-row justify-center items-center mt-[70px]">
            <p className='flex items-center font-[400] text-[20px] text-[#3468C0]'><span className='text-[30px] mr-[15px] text-[black]'>{icons.check}</span>Successfully paid your booking, Confirm the progress with emails</p>
        </div>
    </div>
    </>
  )
}

export default Success