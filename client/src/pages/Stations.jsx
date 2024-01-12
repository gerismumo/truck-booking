import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { API_URL } from './TruckTypes';
import icons from './services/icons';

export const useRoutesList = () => {
    const [routesList, setRoutesList] = useState([]);

    useEffect(() => {
        const routesData = async() => {
            try {
                const response = await axios.get(API_URL + '/getRoutes');
                const success = response.data.success;
                if(success) {
                    setRoutesList(response.data.data);
                }
                console.log(response);
            }catch (error) {
                console.log(error);
            }
        }
         routesData();
    },[]);

    return {routesList, setRoutesList}
}

const Stations = () => {
    const { routesList} = useRoutesList();
    const [stationName, setStationName] = useState('');
    const [openEditForm, setOpenEditForm] = useState(false);
    const [clickedId, setClickedId] =useState(null);
    const [editRouteName, setEditRouteName] = useState(null);

    const handleOpenEditForm = (id) => {
        setClickedId(id);
        const editObject = routesList.find(route => route.id === id);
        setEditRouteName(editObject.route_name);
        setOpenEditForm(!openEditForm);
    }

    const handleEditRoute = async(e) => {
        e.preventDefault();

        const editData = {
            editRouteName: editRouteName,
        }
        try{
            const response = await axios.put(`${API_URL}/updateRoute/${clickedId}`, editData);
            console.log(response);
        }catch (error) {
            console.log(error.message);
        }
    }
    const handleAddRoute = async(e) => {
        e.preventDefault();
        const formData = {
            stationName: stationName,
        }
        try {
            const response = await axios.post(API_URL +'/addRoute' , formData);
            console.log(response);
        }catch (error) {
            console.log(error.message);
        }
    }

    const handleDeleteRoute = async(id) => {
        console.log(id);
        try {
            const response = await axios.delete(`${API_URL}/deleteRoute/${id}`);
            console.log(response);
        }catch (error) {
            console.log(error.message);
        }
    }

    
    return (
        <div className="flex flex-row justify-center gap-[90px] mt-[30px]">
            <div className="">
                <form onSubmit={(e) =>handleAddRoute(e)} className='flex flex-col'>
                    <label htmlFor="Name" className='text-[17px] mb-[5px] font-[500] mt-[10px]'>Route Name:</label>
                    <input type="text"
                    placeholder='Voi..'
                    name='routeName'
                    value={stationName}
                    onChange={(e) => setStationName(e.target.value)}
                    className='border-[1px] border-lightBlue outline-none rounded-[3px] text-[17px] py-[4px] px-[3px]'
                    />
                    <div className="flex justify-center items-center mt-[20px]">
                        <button type='submit'
                        className='bg-lightBlue px-[12px] py-[8px] rounded-[5px]'
                        >Add</button>
                    </div>
                </form>
            </div>
            <div className="">
                <table>
                    <thead>
                        <th className='px-[35px] py-[10px]  border-[1px] border-[#ddd]'>Route</th>
                    </thead>
                    <tbody>
                        {routesList.map((town) => (
                            <React.Fragment key={town.id}>
                                <tr key={town.id}>
                                    <td className='px-[35px] py-[10px] border-l-[1px] border-b-[1px] border-[#ddd]'>{town.route_name}</td>
                                    <td className='px-[35px] py-[10px] border-l-[1px] border-b-[1px] border-t-[1px] border-[#ddd]'> 
                                    <span onClick={() => handleOpenEditForm(town.id)}>{openEditForm && clickedId === town.id ? icons.eyeSlash : icons.edit }</span>
                                    </td>
                                    <td className='px-[35px] py-[10px] border-l-[1px] border-r-[1px] border-b-[1px] border-t-[1px] border-[#ddd]' > <span onClick={()=>handleDeleteRoute(town.id)} className='text-[grey]'>{icons.delete}</span></td>
                                </tr>
                                    {openEditForm && clickedId === town.id && (
                                        <tr>
                                            <td colSpan='3' className='border-[1px] border-[#ddd]' >
                                            <form  onSubmit={(e) => handleEditRoute(e)} className='flex flex-col m-[5px]'>
                                                <input type="text"
                                                placeholder='Voi..'
                                                name='routeName'
                                                value={editRouteName}
                                                onChange={(e) => setEditRouteName(e.target.value)}
                                                className='border-[1px] border-lightBlue outline-none rounded-[3px] text-[17px] py-[4px] px-[3px]'
                                                />
                                                <div className="flex justify-center items-center mt-[20px]">
                                                    <button type='submit'
                                                    className='bg-lightBlue px-[12px] py-[8px] rounded-[5px]'
                                                    >Edit</button>
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

export default Stations