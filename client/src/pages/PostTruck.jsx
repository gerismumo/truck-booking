import axios from 'axios';
import React, { useEffect, useState } from 'react';
import DashHeader from './DashHeader';
import { useRoutesList } from './Stations';
import { API_URL, useTruckTypeList } from './TruckTypes';

const PostTruck = () => {
    const {truckTypeList} = useTruckTypeList();
    const {routesList} =useRoutesList();
    const [formData , setFormData ] = useState({
        truckType: '',
        truckModel: '',
        numberPlate: '',
        driverName: '',
        driverLicense: '',
        nationalId: '',
        startRoute: '',
        endRoute: '',
    });

    const[truckImages, setTruckImages] = useState(null);

    const [bookType, setBookType] = useState(null);
    const selectData = truckTypeList.find(truck => truck.truck_type === formData.truckType);

    useEffect(() => {
        if(selectData) {
            setBookType(selectData.book_type);
        }
    }, [selectData]);
    
    const[pricingData, setPricingData] = useState({
        fullTruck: '',
        perSquareMeter: '',
        PerNumberItems:'',
    })
    
    const[price, setPrice] = useState('');
    const[maxSquareMeter, setMaxSquareMeter] = useState('');
    const[maxVehicleNumber, setMaxVehicleNumber]  = useState('');
    const[amount, setAmount] = useState('');

    const handleTruckAddition = async(e) => {
        e.preventDefault();

        const maxAmount = {
            maxSquareMeter,
            maxVehicleNumber,
        }

        function getNonEmptyPropertyValue(obj) {
            for (const key in obj) {
              if (obj.hasOwnProperty(key) && obj[key] !== '') {
                return obj[key];
              }
            }
            return null; 
          }

        const result = getNonEmptyPropertyValue(maxAmount);
            setAmount(result);
          console.log(amount);

        const entryWithValues = Object.entries(pricingData).find(([key, value]) => value !== '');
        setPrice(entryWithValues[1])
        console.log(price);


        if(price === '' || price === '') {
            alert('Please select a price');
            return;
        }
        const Data = new FormData();
        Data.append('truckImages',truckImages);
        Data.append('truckType', formData.truckType);
        Data.append('bookType', bookType);
        Data.append('price', price);
        Data.append('amount', amount);
        Data.append('truckModel', formData.truckModel);
        Data.append('numberPlate', formData.numberPlate);
        Data.append('driverName', formData.driverName);
        Data.append('driverLicense', formData.driverLicense);
        Data.append('nationalId', formData.nationalId);
        Data.append('startRoute', formData.startRoute);
        Data.append('endRoute', formData.endRoute);
        try {
            const response = await axios.post(API_URL + '/addTruck', Data);
            console.log(response);

        }catch (error) {
            console.error(error.message);
        }
    }
  return (
    <>
    <DashHeader />
    <div className=" absolute mt-[100px] flex   justify-center px-[60px] overflow-auto">    
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
                <option value=''>select an option</option>
                {truckTypeList.map((truck) => (
                    <option key={truck._id} value={truck.truck_type}>{truck.truck_type}</option>
                ))}
            </select>
            <label htmlFor="numberPlate" className='text-[17px] mb-[5px] font-[500] mt-[10px]'>Book Type:</label>
            <span className='text-[17px] mb-[5px] font-[400] mt-[10px]'>{bookType}</span>
            {bookType === 'Full Truck' && (
                <input type='number'
                min={0}
                value={pricingData.fullTruck}
                onChange={(e) => setPricingData({...pricingData, fullTruck: e.target.value})}
                placeholder='Enter Price Per Full Truck'
                className='border-[1px] border-lightBlue outline-none rounded-[3px] text-[17px] py-[4px] px-[3px]'
                />
            )}
            {bookType === 'Square Meter' && (
                <>
                    <input type='number'
                    min={0}
                    value={pricingData.perSquareMeter}
                    onChange={(e) => setPricingData({...pricingData, perSquareMeter: e.target.value})}
                    placeholder='Enter Price Per Square Meter'
                    className='border-[1px] border-lightBlue outline-none rounded-[3px] text-[17px] py-[4px] px-[3px]'
                    />
                    <label htmlFor="numberPlate" className='text-[17px] mb-[5px] font-[500] mt-[10px]'>MaxiMum Square Meters:</label>
                    <input type='number'
                    min={0}
                    value={maxSquareMeter}
                    onChange={(e) => setMaxSquareMeter(e.target.value)}
                    placeholder='Enter Maximum Square Meter'
                    className='border-[1px] border-lightBlue outline-none rounded-[3px] text-[17px] py-[4px] px-[3px]'
                    />
                </>
            )}
            {bookType === 'Number of Items' && formData.truckType === 'Car Transporter Truck' && (
                <>
                    <input type='number'
                    min={0}
                    value={pricingData.PerNumberItems}
                    onChange={(e) => setPricingData({...pricingData, PerNumberItems: e.target.value})}
                    placeholder='Enter Price Per Vehicle'
                    className='border-[1px] border-lightBlue outline-none rounded-[3px] text-[17px] py-[4px] px-[3px]'
                    />
                    <label htmlFor="numberPlate" className='text-[17px] mb-[5px] font-[500] mt-[10px]'>Max No. of Vehicles:</label>
                    <input type='number'
                    min={0}
                    value={maxVehicleNumber}
                    onChange={(e) => setMaxVehicleNumber(e.target.value)}
                    placeholder='Enter Max Number of Vehicles Carried'
                    className='border-[1px] border-lightBlue outline-none rounded-[3px] text-[17px] py-[4px] px-[3px]'
                    />
                </>
            ) }
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
            onChange={(e) => setTruckImages(e.target.files[0])}
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
                        {routesList.toReversed().filter((route) => route.route_name !== formData.startRoute).map((town) => (
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
    </>
    
  )
}

export default PostTruck