import React, { useState } from 'react';

export const trucksTypes = [
    { id: 1, value: "any", label: "Any" },
    { id: 2, value: "rigid", label: "Rigid Truck" },
    { id: 3, value: "articulated", label: "Articulated Truck" },
    { id: 4, value: "box", label: "Box Lorry" },
    { id: 5, value: "flatbed", label: "Flatbed Lorry" },
    { id: 6, value: "tipper", label: "Tipper Lorry" },
    { id: 7, value: "refrigerated", label: "Refrigerated Lorry" },
    { id: 8, value: "curtain-side", label: "Curtain-side Lorry" },
    { id: 9, value: "low-loader", label: "Low-Loader Lorry" },
    { id: 10, value: "car", label: "Car Transporter" },
    { id: 11, value: "skip", label: "Skip Homes" },
    { id: 12, value: "livestock", label: "Livestock Lorry" }
]

export const townsRoutes = [
    { id: 1, town: "Mombasa" },
    { id: 2, town: "Mariakani" },
    { id: 3, town: "Voi" },
    { id: 4, town: "Mtito Andei" },
    { id: 5, town: "Kibwezi" },
    { id: 6, town: "Emali" },
    { id: 7, town: "Athi River" },
    { id: 8, town: "Nairobi" },
    { id: 9, town: "Nakuru" },
    { id: 10, town: "Kericho" },
    { id: 11, town: "Kisumu" }
  ];

const PostTruck = () => {
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
    })

    const handleTruckAddition = (e) => {
        e.preventDefault();
        console.log(formData)
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
                {trucksTypes.map((truck) => (
                    <option key={truck.id} value={truck.value}>{truck.label}</option>
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
            className='border-[1px] border-lightBlue outline-none rounded-[3px] text-[17px] py-[4px] px-[3px]'
            />
            <label htmlFor="truckImage" className='text-[17px] mb-[5px] font-[500] mt-[10px]'>Truck Image:</label>
            <input type="file" 
            name="truckImage" 
            id="truckImage" 
            value={formData.truckImage}
             className='border-[1px] border-lightBlue outline-none rounded-[3px] text-[17px] py-[4px] px-[3px]'
            />
            <label htmlFor="driverName" className='text-[17px] mb-[5px] font-[500] mt-[10px]'>Driver name:</label>
            <input type="text"
            placeholder='John Doe'
            name='driverName'
            value={formData.driverName}
            className='border-[1px] border-lightBlue outline-none rounded-[3px] text-[17px] py-[4px] px-[3px]'
             />
            <label htmlFor="driverLicense" className='text-[17px] mb-[5px] font-[500] mt-[10px]'>Driver License:</label>
            <input type="number" 
            name="driverLicense" 
            id="driverLicense" 
            min={0}
            placeholder='License no.'
            value={formData.driverLicense}
            className='border-[1px] border-lightBlue outline-none rounded-[3px] text-[17px] py-[4px] px-[3px]'
            />
            <label htmlFor="nationalId" className='text-[17px] mb-[5px] font-[500] mt-[10px]'>National Identity:</label>
            <input type="number" 
            min={0}
            placeholder='National Identity no.'
            name='nationalId'
            value={formData.nationalId}
            className='border-[1px] border-lightBlue outline-none rounded-[3px] text-[17px] py-[4px] px-[3px]'
            />
            <label htmlFor="route" className='text-[17px] mb-[5px] font-[500] mt-[10px]'>Route</label>
            <div className="flex justify-between gap-[10px] items-center">
                <div className="flex flex-col w-[100%]">
                    <label htmlFor="from" className='text-[17px] mb-[5px] font-[500] mt-[10px]'>From:</label>
                    <select name="startRoute" id="startRoute"
                    value={formData.startRoute}
                    className='border-[1px] border-lightBlue outline-none rounded-[3px] text-[17px] py-[4px] px-[3px]'
                    >
                        {townsRoutes.map((town) => (
                            <option key={town.id} value={town.town}>{town.town}</option>
                        ))}
                    </select>
                </div>
                <div className="flex flex-col w-[100%]">
                    <label htmlFor="from" className='text-[17px] mb-[5px] font-[500] mt-[10px]'>To:</label>
                    <select name="endRoute" id="endRoute"
                    value={formData.endRoute}
                    className='border-[1px] border-lightBlue outline-none rounded-[3px] text-[17px] py-[4px] px-[3px]'
                    >
                        {townsRoutes.toReversed().map((town) => (
                            <option key={town.id} value={town.town}>{town.town}</option>
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