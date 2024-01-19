import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import icons from './services/icons';

const DashHeader = () => {
    const[openToggleNav, setOpenToggleNav] = useState(false);

    const handleToggleNav = () => {
        setOpenToggleNav(!openToggleNav);
    }
  return (
    <div className="bg-white fixed z-[1] w-[100%]">
        <nav className="flex flex-col  w-[100%] py-[20px]  px-[20px] shadow-md gap-[20px]">
            <div className="flex flex-row justify-between items-center">
                <div className="flex items-center">
                    <h2 className='text-[20px] font-[700]'>Truck Dashboard</h2>
                </div>
                <div className="hidden lg1:flex justify-center gap-[50px] items-center">
                    <Link to='/' className=' text-[18px] text-dark hover:text-lightBlue font-[500]'>Home</Link>
                    <Link to='/test' className=' text-[18px] text-dark hover:text-lightBlue font-[500]'>Search</Link>
                    <Link to='/progress' className=' text-[18px] text-dark hover:text-lightBlue font-[500]'>
                        Check Progress
                    </Link>
                    <Link to='/bookings' className=' text-[18px] text-dark hover:text-lightBlue font-[500]'>
                        Bookings
                    </Link>
                    <Link to='/trucksList' className=' text-[18px] text-dark hover:text-lightBlue font-[500]'>
                        Trucks
                    </Link>
                    <Link to='/addTruck' className=' text-[18px] text-dark hover:text-lightBlue font-[500]'>
                        Add Truck
                    </Link>
                    <Link to='/truckTypes' className=' text-[18px] text-dark hover:text-lightBlue font-[500]'>
                        Truck Type
                    </Link>
                </div>
                <div className="flex justify-center gap-[30px] items-center">
                    <div className="flex flex-col items-center">
                        <h2 className='text-[18px] font-[500]'>Gerald Mumo</h2>
                        <p className='text-[15px] font-[400]'>Admin</p> 
                    </div>
                    <div className="flex lg1:hidden">
                        <span onClick={handleToggleNav}
                        className={`text-[30px] ${openToggleNav ? `text-[red]`: `text-[black]`}`}
                        >
                            {openToggleNav ? icons.markX : icons.barsStaggered}
                        </span>
                    </div>
                </div>
            </div>
            {openToggleNav && (
                <div className="lg1:hidden flex flex-col">
                    <Link to='/' className='flex justify-between text-[18px] text-dark hover:text-lightBlue font-[500] py-[10px] border-b-[2px] border-[#ddd]'>
                        <p>Home</p>
                        <span>{icons.angleDown}</span>
                    </Link>
                    <Link to='/test' className='flex justify-between text-[18px] text-dark hover:text-lightBlue font-[500] py-[10px] border-b-[2px] border-[#ddd]'>
                        <p>Search</p>
                        <span>{icons.angleDown}</span>
                    </Link>
                    <Link to='/progress' className='flex justify-between text-[18px] text-dark hover:text-lightBlue font-[500] py-[10px] border-b-[2px] border-[#ddd]'>
                        <p>Check Progress</p>
                        <span>{icons.angleDown}</span>
                    </Link>
                    <Link to='/bookings' className='flex justify-between text-[18px] text-dark hover:text-lightBlue font-[500] py-[10px] border-b-[2px] border-[#ddd]'>
                        <p>Bookings</p>
                        <span>{icons.angleDown}</span>
                    </Link>
                    <Link to='/trucksList' className='flex justify-between text-[18px] text-dark hover:text-lightBlue font-[500] py-[10px] border-b-[2px] border-[#ddd]'>
                        <p>Trucks</p>
                        <span>{icons.angleDown}</span>
                    </Link>
                    <Link to='/addTruck' className='flex justify-between text-[18px] text-dark hover:text-lightBlue font-[500] py-[10px] border-b-[2px] border-[#ddd]'>
                        <p>Add Truck</p>
                        <span>{icons.angleDown}</span>
                    </Link>
                    <Link to='/truckTypes' className='flex justify-between text-[18px] text-dark hover:text-lightBlue font-[500] py-[10px] '>
                        <p>Truck Type</p>
                        <span>{icons.angleDown}</span>
                    </Link>
                </div>
            )}         
        </nav>
    </div>
    
  )
}

export default DashHeader