import React from 'react'
import icons from './services/icons'
const Trucks = () => {
  return (
    <div className="flex justify-center py-[30px] px-[20px]">
      <div className="">
        <table className='border-collapse'>
          <thead>
            <th className='px-[20px] py-[10px] border border-[#ddd]'>Truck Type</th>
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
            <React.Fragment>
              <tr>
                <td className='px-[20px] py-[10px] border border-[#ddd]'>Box Truck</td>
                <td className='px-[20px] py-[10px] border border-[#ddd]'>Scannia</td>
                <td className='px-[20px] py-[10px] border border-[#ddd]'>Kcp 6797</td>
                <td className='px-[20px] py-[10px] border border-[#ddd]'>
                  <img src="../../images/fesarta.jpg-1704007371558-281930063.jpg" alt="" 
                  className='w-[100px] h-[70px]'
                  />
                </td>
                <td className='px-[20px] py-[10px] border border-[#ddd]'>John Doe</td>
                <td className='px-[20px] py-[10px] border border-[#ddd]'>1234707</td>
                <td className='px-[20px] py-[10px] border border-[#ddd]'>Mombasa</td>
                <td className='px-[20px] py-[10px] border border-[#ddd]'>Nakuru</td>
                <td className='px-[20px] py-[10px] border border-[#ddd]'>Active</td>
                <td className='px-[20px] py-[10px] border border-[#ddd]'>On Delivery</td>
                <td className='px-[20px] py-[10px] border border-[#ddd]'>Unavailable</td>
                <td className='px-[20px] py-[10px] border border-[#ddd]'><span>{icons.eye}</span></td>
                <td className='px-[20px] py-[10px] border border-[#ddd]'><span>{icons.edit}</span></td>
                <td className='px-[20px] py-[10px] border border-[#ddd]'><span>{icons.delete}</span></td>
              </tr>
            </React.Fragment>
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default Trucks