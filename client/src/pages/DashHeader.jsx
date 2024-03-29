import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import icons from './services/icons';

const DashHeader = () => {
    const navigate = useNavigate();
    const[openToggleNav, setOpenToggleNav] = useState(false);

    const handleToggleNav = () => {
        setOpenToggleNav(!openToggleNav);
    }

    const logout = () => {
        localStorage.removeItem('truckAdmin');
        navigate('/');
    }
  return (
    <div className="bg-white fixed z-[1] w-[100%]">
        <nav className="flex flex-col  w-[100%] py-[10px]  px-[20px] shadow-md gap-[20px]">
            <div className="flex flex-row justify-between items-center">
                <div className="flex items-center">
                    <img src="../../images/images.png" alt="" 
                    className='w-[70px] h-[70px] md:w-[80px] md:h-[80px]'
                    />
                </div>
                <div className="hidden lg1:flex justify-center gap-[50px] items-center">
                    <Link to='/dashboard' className=' text-[18px] text-dark hover:text-lightBlue font-[500]'>Home</Link>
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
                        <h2 className=' text-[16px] Md:text-[18px] font-[700]'>Gerald Mumo</h2>
                        <p className=' text-[14px] md:text-[15px] font-[400]'>Admin</p> 
                    </div>
                    <div className="hidden lg1:flex">
                        <button onClick={logout}
                        className='bg-lightBlue px-[20px] py-[8px] rounded-[4px] text-[18px] font-[500]'
                        >
                            logout
                        </button>
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
                    <button
                    onClick={logout}
                    className='bg-lightBlue py-[6px] rounded-[4px] text-[18px]'
                    >Logout</button>
                </div>
            )}         
        </nav>
    </div>
    
  )
}

export default DashHeader