import React, { useState } from 'react';
import { useTruckTypeList } from './TruckTypes';
import { useRoutesList } from './Stations';


const PostTruck = () => {
    const {truckTypeList} = useTruckTypeList();
    const {routesList} =useRoutesList();
    const [formData , setFormData ] = useState({
        truckType: '',
        truckModel: '',
        numberPlate: '',
        truckImage: '',
        driverName: '',
        driverLicense: '',
        nationalId: '',
        startRoute: '',
        endRoute: '',
    });

    const[truckImages, setTruckImages] = useState([]);

    const handleFileChange = (event) => {
        setTruckImages(Array.from(event.target.files));

      }; 
      
    const handleTruckAddition = (e) => {
        e.preventDefault();
        console.log(formData)
        console.log(truckImages)
    }
  return (
    <div className="flex  justify-center px-[60px] overflow-auto">    
        <form onSubmit={(e) =>handleTruckAddition(e)} className='flex flex-col w-[500px] mt-[30px] mb-[70px] overflow-auto'>
            <label htmlFor="truckType"
            className='text-[17px] mb-[5px] font-[500]'>
                Truck Type:
            </label>
            <select name="truckType" id="truckType"
            value={formData.truckType}
            onChange={(e) => setFormData({ ...formData, truckType: e.target.value})}
            className='border-[1px] border-lightBlue outline-none rounded-[3px] text-[17px] py-[4px] px-[3px]'
            >
                {truckTypeList.map((truck) => (
                    <option key={truck._id} value={truck.truck_type}>{truck.truck_type}</option>
                ))}
            </select>
            <label htmlFor="model" 
            className='text-[17px] mb-[5px] font-[500] mt-[10px]'
            >
                Model:
            </label>
            <input type="text"
            placeholder='Enter truck model...'
            name='truckModel'
            value={formData.truckModel}
            onChange={(e) => setFormData({...formData, truckModel: e.target.value})}
            className='border-[1px] border-lightBlue outline-none rounded-[3px] text-[17px] py-[4px] px-[3px]'
            />
            <label htmlFor="numberPlate" className='text-[17px] mb-[5px] font-[500] mt-[10px]'>No. Plate:</label>
            <input type="text"
            placeholder=' No. Plate' 
            name='numberPlate'
            value={formData.numberPlate}
            onChange={(e) => setFormData({...formData, numberPlate:e.target.value})}
            className='border-[1px] border-lightBlue outline-none rounded-[3px] text-[17px] py-[4px] px-[3px]'
            />
            <label htmlFor="truckImage" className='text-[17px] mb-[5px] font-[500] mt-[10px]'>Truck Image:</label>
            <input type="file" accept="image/*" multiple
            name="truckImage" 
            id="truckImage" 
            onChange={handleFileChange}
             className='border-[1px] border-lightBlue outline-none rounded-[3px] text-[17px] py-[4px] px-[3px]'
            />
            <label htmlFor="driverName" className='text-[17px] mb-[5px] font-[500] mt-[10px]'>Driver name:</label>
            <input type="text"
            placeholder='John Doe'
            name='driverName'
            value={formData.driverName}
            onChange={(e) => setFormData({...formData, driverName: e.target.value})}
            className='border-[1px] border-lightBlue outline-none rounded-[3px] text-[17px] py-[4px] px-[3px]'
             />
            <label htmlFor="driverLicense" className='text-[17px] mb-[5px] font-[500] mt-[10px]'>Driver License:</label>
            <input type="number" 
            name="driverLicense" 
            id="driverLicense" 
            min={0}
            placeholder='License no.'
            value={formData.driverLicense}
            onChange={(e) => setFormData({...formData, driverLicense: e.target.value})}
            className='border-[1px] border-lightBlue outline-none rounded-[3px] text-[17px] py-[4px] px-[3px]'
            />
            <label htmlFor="nationalId" className='text-[17px] mb-[5px] font-[500] mt-[10px]'>National Identity:</label>
            <input type="number" 
            min={0}
            placeholder='National Identity no.'
            name='nationalId'
            value={formData.nationalId}
            onChange={(e) => setFormData({...formData, nationalId: e.target.value})}
            className='border-[1px] border-lightBlue outline-none rounded-[3px] text-[17px] py-[4px] px-[3px]'
            />
            <label htmlFor="route" className='text-[17px] mb-[5px] font-[500] mt-[10px]'>Route</label>
            <div className="flex justify-between gap-[10px] items-center">
                <div className="flex flex-col w-[100%]">
                    <label htmlFor="from" className='text-[17px] mb-[5px] font-[500] mt-[10px]'>From:</label>
                    <select name="startRoute" id="startRoute"
                    value={formData.startRoute}
                    onChange={(e) => setFormData({...formData, startRoute: e.target.value})}
                    className='border-[1px] border-lightBlue outline-none rounded-[3px] text-[17px] py-[4px] px-[3px]'
                    >
                        {routesList.map((town) => (
                            <option key={town.id} value={town.route_name}>{town.route_name}</option>
                        ))}
                    </select>
                </div>
                <div className="flex flex-col w-[100%]">
                    <label htmlFor="from" className='text-[17px] mb-[5px] font-[500] mt-[10px]'>To:</label>
                    <select name="endRoute" id="endRoute"
                    value={formData.endRoute}
                    onChange={(e) => setFormData({...formData, endRoute: e.target.value})}
                    className='border-[1px] border-lightBlue outline-none rounded-[3px] text-[17px] py-[4px] px-[3px]'
                    >
                        {routesList.toReversed().map((town) => (
                            <option key={town.id} value={town.route_name}>{town.route_name}</option>
                        ))}
                    </select>
                </div>
            </div>
            <div className="flex justify-center items-center mt-[20px]">
                <button type='submit'
                className='bg-lightBlue px-[15px] py-[10px] rounded-[5px] font-[500] text-[18px] text-white'
                >Add Truck</button>
            </div>
        </form>
    </div>
  )
}

export default PostTruck