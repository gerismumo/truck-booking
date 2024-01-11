import React, { useState } from 'react';
import { trucksTypes } from './PostTruck';
import icons from './services/icons';

const TruckTypes = () => {
    const[openEdit, setOpenEdit] = useState(false);
    const[currentEditId, setCurrentEditId] = useState(null);

    const[truckImages, setTruckImages] = useState([]);
    const[truckTypeName, setTruckTypeName] = useState('');

    const handleFileChange = (event) => {
        setTruckImages(Array.from(event.target.files));

      };
    
    const handleAddTruckType = (e) => {
        e.preventDefault();
        console.log(truckImages);
        console.log(truckTypeName);
    }

    const handleOpenEditForm = (id) => {
        setCurrentEditId(id);
        setOpenEdit(!openEdit);
    } 
  return (
    <div className="flex justify-center py-[30px] px-[20px] gap-[100px]">
        <form onSubmit={(e) => handleAddTruckType(e)} className='flex flex-col'>
            <label htmlFor="" 
            className='text-[17px] mb-[5px] font-[500] mt-[10px]'>Type Name:</label>
            <input type="text" 
            placeholder='Truck Type'
            value={truckTypeName}
            onChange={(e) => setTruckTypeName(e.target.value)}
            className='border-[1px] border-lightBlue outline-none rounded-[3px] text-[17px] py-[4px] px-[3px]'
            />
            <label htmlFor="truckImage" className='text-[17px] mb-[5px] font-[500] mt-[10px]'>Truck Image:</label>
            <input type="file" 
            accept="image/*" multiple
            onChange={handleFileChange}
            className='border-[1px] border-lightBlue outline-none rounded-[3px] text-[17px] py-[4px] px-[3px]'
            />
            <div className="flex justify-center mt-[20px]">
                <button type='submit'
                className='px-[15px] py-[10px] bg-lightBlue rounded-[5px]'
                >
                    Add
                </button>
            </div>
        </form>
        <div className="">
            <table className='border-collapse'>
                <thead>
                    <th className='px-[20px] py-[10px] border border-[#ddd]'>Type</th>
                    <th className='px-[20px] py-[10px] border border-[#ddd]'>Image</th>
                </thead>
                <tbody>
                    
                        {trucksTypes.map((type) => (
                            <React.Fragment key={type.id}>
                                <tr key={type.id}>
                                    <td className='px-[20px] py-[10px] border border-[#ddd]'>{type.label}</td>
                                    <td className='px-[20px] py-[10px] border border-[#ddd]'>
                                        <img src="../../images/fesarta.jpg-1704007371558-281930063.jpg" alt="" 
                                        className='w-[100px] h-[50px]'
                                        />
                                    </td>
                                    <td className='px-[20px] py-[10px] border border-[#ddd]'><span>{icons.eye}</span></td>
                                    <td className='px-[20px] py-[10px] border border-[#ddd]'>
                                        <span onClick={() => handleOpenEditForm(type.id)}>{openEdit && currentEditId === type.id ? icons.eyeSlash : icons.edit}</span>
                                    </td>
                                    <td className='px-[20px] py-[10px] border border-[#ddd]'><span>{icons.delete}</span></td>
                                </tr>
                                {openEdit && currentEditId === type.id && (
                                <tr>
                                    <td colSpan='5' className='border border-[#ddd] m-[5px]'>
                                        <form onSubmit={(e) => handleAddTruckType(e)} className='flex flex-col m-[5px]'>
                                            <label htmlFor="" 
                                            className='text-[17px] mb-[5px] font-[500] mt-[10px]'>Type Name:</label>
                                            <input type="text" 
                                            placeholder='Truck Type'
                                            value={truckTypeName}
                                            onChange={(e) => setTruckTypeName(e.target.value)}
                                            className='border-[1px] border-lightBlue outline-none rounded-[3px] text-[17px] py-[4px] px-[3px]'
                                            />
                                            <label htmlFor="truckImage" className='text-[17px] mb-[5px] font-[500] mt-[10px]'>Truck Image:</label>
                                            <input type="file" 
                                            accept="image/*" multiple
                                            onChange={handleFileChange}
                                            className='border-[1px] border-lightBlue outline-none rounded-[3px] text-[17px] py-[4px] px-[3px]'
                                            />
                                            <div className="flex justify-center mt-[20px]">
                                                <button type='submit'
                                                className='px-[15px] py-[10px] bg-lightBlue rounded-[5px]'
                                                >
                                                    Add
                                                </button>
                                            </div>
                                        </form>
                                    </td>
                                </tr> 
                                )}
                            </React.Fragment>
                        ))}
                </tbody>
            </table>
        </div>
    </div>
  )
}

export default TruckTypes