import React from 'react';
import { Link } from 'react-router-dom';
const Header = () => {
  return (
    <div className="fixed w-[100%] bg-white shadow-md">
        <nav className='flex justify-between items-center px-[10px] lg:px-[30px] py-[20px]'>
            <div className="">
                <h2 className='text-[20px] lg:text-[25px] font-[700]'>Truck Booking</h2>
            </div>
            <div className="flex justify-center items-center gap-[20px] lg:gap-[40px]">
                <div className="">
                    <Link to='/progress' className='text-[18px] font-[500] hover:text-lightBlue'>Track Truck</Link>
                </div>
                <div className="">
                    <Link to='/login' className='text-[18px] font-[500] hover:text-lightBlue'>Login</Link>
                </div>
            </div>
        </nav>
    </div>
  )
}

export default Header