import React from 'react';
import { Link } from 'react-router-dom';

const DashHeader = () => {
  return (
    <nav className="flex flex-col bg-white fixed w-[100%] py-[20px] px-[20px] shadow-md z-[1]">
        <div className="flex flex-row justify-between items-center">
            <div className="flex items-center">
                <h2 className='text-[20px] font-[700]'>Truck Dashboard</h2>
            </div>
            <div className="flex justify-center gap-[50px] items-center">
                <Link to='' className=' text-[18px] text-dark hover:text-lightBlue font-[500]'>Home</Link>
                <Link to='truckTypes' className=' text-[18px] text-dark hover:text-lightBlue font-[500]'>
                    Truck Type
                </Link>
                <Link to='stations' 
                className=' text-[18px] text-dark hover:text-lightBlue font-[500]'>
                    Add Route
                </Link>
                <Link to='addTruck' className=' text-[18px] text-dark hover:text-lightBlue font-[500]'>
                    Add Truck
                </Link>
                <Link to='trucksList' className=' text-[18px] text-dark hover:text-lightBlue font-[500]'>
                    Trucks
                </Link>
            </div>
            <div className="flex flex-col items-center">
                <h2 className='text-[18px] font-[500]'>Gerald Mumo</h2>
                <p className='text-[15px] font-[400]'>Admin</p>
            </div>
        </div>
            
    </nav>
  )
}

export default DashHeader