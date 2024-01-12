import axios from 'axios';
import React, { useEffect, useState } from 'react';
import icons from './services/icons';

export const API_URL = `${process.env.REACT_App_API_URL}/api`;

export const useTruckTypeList = () => {
    const[truckTypeList, setTruckTypeList] = useState([]);

    useEffect(() => {
        const truckTypeData= async() => {
            try {
                const response = await axios.get(API_URL + '/getTruckTypes');
                console.log(response)
                const success = response.data.success;
                if(success) {
                    setTruckTypeList(response.data.data);
                }
            }catch (error) {
                console.error(error.message);
            }
        }
        truckTypeData();
    },[API_URL]);

    return { truckTypeList, setTruckTypeList };
}


const TruckTypes = () => {
    const[openEdit, setOpenEdit] = useState(false);
    const[currentEditId, setCurrentEditId] = useState(null);
    const { truckTypeList } = useTruckTypeList();

    const [formData, setFormData] = useState({
        truckTypeName:'',
        file: null,
    })

    const handleChange =(e) => {
        const {name, value, files } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: name === 'file' ? files[0] : value,
        }));
    }

    const handleAddTruckType = async (e) => {
        e.preventDefault();
        try {
            const Data = new FormData();
            Data.append('file', formData.file);
            Data.append('truckTypeName', formData.truckTypeName);

            const response = await axios.post(API_URL + '/addTruckType', Data);
            console.log(response);
        } catch (error) {
            console.error(error.message);
        } 
    }
    
    


    const[editForm, setEditForm] = useState(null);
    const[editTruckTypeName, setEditTruckName] = useState('');
    const[editFile, setEditFile] = useState(null);

    const handleOpenEditForm = (id) => {
        setCurrentEditId(id);
        const currentEdit = truckTypeList.find(truck => truck._id === id);
        setEditForm(currentEdit);
        setEditTruckName(currentEdit.truck_type);
        setOpenEdit(!openEdit);
    } 
   
   
    const handleEditTruckType = async(e) => {
        e.preventDefault();

        console.log(editFile);
        console.log(editTruckTypeName);
        try {
            const editForm = new FormData();
            editForm.append('editTruckType', editTruckTypeName);
            editForm.append('editFile', editFile);

            const response = await axios.put(`${API_URL}/updateTruckType/${currentEditId}`, editForm);
            console.log(response);
        } catch (error) {
            console.error(error.message);
        }
    } 

    const handleDelete = async(id) => {
        console.log(id);

        try {
            const response = await axios.delete(`${API_URL}/deleteTruckType/${id}`);
            console.log(response);
        }catch (error) {
            console.error(error.message);
        }
    }
  return (
    <div className="flex justify-center py-[30px] px-[20px] gap-[100px]">
        <form onSubmit={(e) => handleAddTruckType(e)} className='flex flex-col'>
            <label htmlFor="" 
            className='text-[17px] mb-[5px] font-[500] mt-[10px]'>Type Name:</label>
            <input type="text" 
            placeholder='Truck Type'
            name='truckTypeName'
            value={formData.truckTypeName}
            onChange={handleChange}
            className='border-[1px] border-lightBlue outline-none rounded-[3px] text-[17px] py-[4px] px-[3px]'
            />
            <label htmlFor="truckImage" className='text-[17px] mb-[5px] font-[500] mt-[10px]'>Truck Image:</label>
            <input type="file" 
            accept="image/*"
            name='file'
            onChange={handleChange}
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
                        {truckTypeList.map((type) => (
                            <React.Fragment key={type._id}>
                                <tr key={type._id}>
                                    <td className='px-[20px] py-[10px] border border-[#ddd]'>{type.truck_type}</td>
                                    <td className='px-[20px] py-[10px] border border-[#ddd]'>
                                        <img src={URL.createObjectURL(new Blob([new Uint8Array(type.image.data)],{type: 'image/jpeg', }))} alt="" 
                                        className='w-[100px] h-[50px]'
                                        />
                                    </td>
                                    <td className='px-[20px] py-[10px] border border-[#ddd]'><span>{icons.eye}</span></td>
                                    <td className='px-[20px] py-[10px] border border-[#ddd]'>
                                        <span onClick={() => handleOpenEditForm(type._id)}>{openEdit && currentEditId === type._id ? icons.eyeSlash : icons.edit}</span>
                                    </td>
                                    <td className='px-[20px] py-[10px] border border-[#ddd]'><span onClick={() => handleDelete(type._id)}>{icons.delete}</span></td>
                                </tr>
                                {openEdit && currentEditId === type._id && (
                                <tr>
                                    <td colSpan='5' className='border border-[rgb(221,221,221)] m-[5px]'>
                                        <form onSubmit={(e) => handleEditTruckType(e)} className='flex flex-col m-[5px]'>
                                            <label htmlFor="" 
                                            className='text-[17px] mb-[5px] font-[500] mt-[10px]'>Type Name:</label>
                                            <input type="text" 
                                            placeholder='Truck Type'
                                            value={editTruckTypeName}
                                            onChange={(e) =>  setEditTruckName(e.target.value)}
                                            className='border-[1px] border-lightBlue outline-none rounded-[3px] text-[17px] py-[4px] px-[3px]'
                                            />
                                            <label htmlFor="truckImage" className='text-[17px] mb-[5px] font-[500] mt-[10px]'>Truck Image:</label>
                                            <input type="file" 
                                            accept="image/*" multiple
                                            onChange={(e) => setEditFile(e.target.files[0])}
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