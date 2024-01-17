import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useRoutesList } from './Stations';
import { API_URL, bookTypes, useTruckTypeList } from './TruckTypes';
import icons from './services/icons';
export const useTrucksData = () => {
  const[trucksList, setTrucksList] = useState([]);

  const trucksData = async() => {
    try {
      const response = await axios.get(API_URL +'/getTrucks');

      const success = response.data.success;
      if(success) {
        setTrucksList(response.data.data);
      }
      console.log(response);
    }catch(error) {
      console.error(error.message);
    }
  }

  useEffect(() => {
    trucksData();
  }, []);

  return {trucksList, setTrucksList , trucksData};
}
const Trucks = () => {
  const {trucksList,trucksData} = useTrucksData();
  const {truckTypeList} = useTruckTypeList();
  const {routesList} = useRoutesList();
  console.log(truckTypeList)

  const handleDeleteTruck = async(id) => {
    console.log(id);
    try {
      const response = await axios.delete(`${API_URL}/deleteTrucks/${id}`);
      if(response.data.success) {
        trucksData();
      }
    }catch (error) {
      console.error(error.message);
    }
  }

  const[openEdit, setOpenEdit] = useState(false);
  const[editId, setEditId] = useState(null);
  const[currentForm, setCurrentForm] = useState(null);
  const[editFile, setEditFile] = useState(null);

  const handleOpenEdit =(id) => {
    setEditId(id);
    const currentEdit = trucksList.find(data => data.id === id);
    setCurrentForm(currentEdit);
    if(id) {
      setOpenEdit(!openEdit);
    }
   
  }

  const handleSubmitEditData = async(e) => {
    e.preventDefault();

    console.log('currentForm',currentForm);
    console.log(editFile)
    try {
      const formData = new FormData();
      formData.append('editFile', editFile);
      formData.append('book_type', currentForm.book_type);
      formData.append('driver_license', currentForm.driver_license);
      formData.append('driver_name', currentForm.driver_name);
      formData.append('end_route', currentForm.end_route);
      formData.append('full_space', currentForm.full_space);
      formData.append('available_space', currentForm.max_amount);
      formData.append('number_plate', currentForm.number_plate);
      formData.append('pricing', currentForm.pricing);
      formData.append('start_route', currentForm.start_route);
      formData.append('truck_model', currentForm.truck_model);
      formData.append('truck_type', currentForm.truck_type);

      const response = await axios.put(`${API_URL}/editTrucks/${editId}`, formData);
      if(response.data.success){
        trucksData();
        setOpenEdit(false);
      }
      console.log(response);
    }catch(error) {
      console.log(error.message);
    }
  }
  return (
    <div className="flex justify-center py-[30px]">
      <div className="">
        <table className='border-collapse'>
          <thead>
            <th className='px-[20px] py-[10px] border border-[#ddd]'>Truck Type</th>
            <th className='px-[20px] py-[10px] border border-[#ddd]'>Book Type</th>
            <th className='px-[20px] py-[10px] border border-[#ddd]'>Pricing</th>
            <th className='px-[20px] py-[10px] border border-[#ddd]'>Full Space</th>
            <th className='px-[20px] py-[10px] border border-[#ddd]'>Available Space</th>
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
            {trucksList.map((trucks) => (
              <React.Fragment key={trucks.id}>
                <tr>
                  <td className='px-[20px] py-[10px] border border-[#ddd]'>{trucks.truck_type}</td>
                  <td className='px-[20px] py-[10px] border border-[#ddd]'>{trucks.book_type}</td>
                  <td className='px-[20px] py-[10px] border border-[#ddd]'>{trucks.book_type === 'Square Meter' ? `Per Square: ${trucks.pricing} `:  trucks.book_type === 'Number of Items' ? `Per Vehicle: ${trucks.pricing}` : ''}</td>
                  <td className='px-[20px] py-[10px] border border-[#ddd]'>{trucks.full_space ? trucks.full_space : 'unavailable'}</td>
                  <td className='px-[20px] py-[10px] border border-[#ddd]'>{trucks.max_amount}</td>
                  <td className='px-[20px] py-[10px] border border-[#ddd]'>{trucks.truck_model}</td>
                  <td className='px-[20px] py-[10px] border border-[#ddd]'>{trucks.number_plate}</td>
                  <td className='px-[20px] py-[10px] border border-[#ddd]'>
                    <img src={URL.createObjectURL(new Blob([new Uint8Array(trucks.truck_image.data)],{type: 'image/jpeg', }))} alt="" 
                    className='w-[130px] h-[50px]'
                    />
                  </td>
                  <td className='px-[20px] py-[10px] border border-[#ddd]'>{trucks.driver_name}</td>
                  <td className='px-[20px] py-[10px] border border-[#ddd]'>{trucks.driver_license}</td>
                  <td className='px-[20px] py-[10px] border border-[#ddd]'>
                    <div className="flex flex-col">
                      <p className='font-[500]'>From:</p>
                      <span>{trucks.start_route}</span>
                    </div>
                    </td>
                  <td className='px-[20px] py-[10px] border border-[#ddd]'>
                    <div className="flex flex-col">
                      <p className='font-[500]'>To:</p>
                      <span>{trucks.end_route}</span>
                    </div>
                  </td>
                  <td className='px-[20px] py-[10px] border border-[#ddd]'>Active</td>
                  <td className='px-[20px] py-[10px] border border-[#ddd]'>On Delivery</td>
                  <td className='px-[20px] py-[10px] border border-[#ddd]'>Unavailable</td>
                  <td className='px-[20px] py-[10px] border border-[#ddd]'><span onClick={() => handleOpenEdit(trucks.id)}>{openEdit && trucks.id === editId ? icons.eyeSlash : icons.edit}</span></td>
                  <td className='px-[20px] py-[10px] border border-[#ddd]'><span onClick={() => handleDeleteTruck(trucks.id)}>{icons.delete}</span></td>
                </tr>
                {openEdit && editId === trucks.id && (
                  <tr>
                    <td colSpan='18' className='px-[20px] py-[10px] border border-[#ddd]'>
                      <div className="w-[100%]">
                        <form onSubmit={(e) => handleSubmitEditData(e)}  className='w-[100%] flex flex-col'>
                          <div className="flex justify-between">
                            <div className="flex flex-col">
                              <label htmlFor="" className='text-[17px] mb-[5px] font-[500] mt-[10px]'>Truck Type:</label>
                              <select name="" id=""
                              defaultValue={currentForm.truck_type}
                              onChange={(e) => setCurrentForm({...currentForm, truck_type: e.target.value})}
                              className=' w-[200px] border-[1px] border-lightBlue outline-none rounded-[3px] text-[17px] py-[4px] px-[3px]'
                              >
                                <option value="">Select a type</option>
                                {truckTypeList.map((data) => (
                                  <option key={data._id} value={data.truck_type}>{data.truck_type}</option>
                                ))}
                              </select>
                              <label htmlFor="" className='text-[17px] mb-[5px] font-[500] mt-[10px]'>Book Type:</label>
                              <select name="" id=""
                              defaultValue={currentForm.book_type}
                              onChange={(e) => setCurrentForm({...currentForm, book_type: e.target.value})}
                              className=' w-[200px] border-[1px] border-lightBlue outline-none rounded-[3px] text-[17px] py-[4px] px-[3px]'
                              >
                                  {bookTypes.map((data) => (
                                    <option key={data.id}  value={data.name}>{data.name}</option>
                                  ))}
                              </select>
                              <label htmlFor="" className='text-[17px] mb-[5px] font-[500] mt-[10px]'>Pricing:</label>
                              <input type="number"
                                value={currentForm.pricing}
                                onChange={(e) => setCurrentForm({...currentForm,pricing: e.target.value})}
                                className=' w-[200px] border-[1px] border-lightBlue outline-none rounded-[3px] text-[17px] py-[4px] px-[3px]'
                              />
                              
                            </div>
                            <div className="flex flex-col">
                              <label htmlFor="" className='text-[17px] mb-[5px] font-[500] mt-[10px]'>Full Space</label>
                              <input type="number" 
                              value={currentForm.full_space}
                              onChange={(e) => setCurrentForm({...currentForm, full_space: e.target.value})}
                              className=' w-[200px] border-[1px] border-lightBlue outline-none rounded-[3px] text-[17px] py-[4px] px-[3px]'
                              />
                              <label htmlFor="" className='text-[17px] mb-[5px] font-[500] mt-[10px]'>Available Space:</label>
                              <input type="text"
                              value={currentForm.max_amount}
                              className=' w-[200px] border-[1px] border-lightBlue outline-none rounded-[3px] text-[17px] py-[4px] px-[3px]'
                              />
                              <label htmlFor="" className='text-[17px] mb-[5px] font-[500] mt-[10px]'>Model:</label>
                              <input type="text" 
                                value={currentForm.truck_model}
                                onChange={(e) => setCurrentForm({...currentForm, truck_model: e.target.value })}
                                className=' w-[200px] border-[1px] border-lightBlue outline-none rounded-[3px] text-[17px] py-[4px] px-[3px]'
                              />
                            </div>
                            <div className="flex flex-col">
                              <label htmlFor="" className='text-[17px] mb-[5px] font-[500] mt-[10px]'>No Plate:</label>
                              <input type="text" 
                              value={currentForm.number_plate}
                              onChange={(e) => setCurrentForm({...currentForm, number_plate: e.target.value})}
                              className=' w-[200px] border-[1px] border-lightBlue outline-none rounded-[3px] text-[17px] py-[4px] px-[3px]'
                              />
                              <label htmlFor="" className='text-[17px] mb-[5px] font-[500] mt-[10px]'>Image:</label>
                              <input type="file" 
                              accept="image/*" multiple
                              onChange={(e) => setEditFile(e.target.files[0])}
                              className=' w-[200px] border-[1px] border-lightBlue outline-none rounded-[3px] text-[17px] py-[4px] px-[3px]'
                              />
                              <label htmlFor="" className='text-[17px] mb-[5px] font-[500] mt-[10px]'>Driver Name:</label>
                              <input type="text"
                              value={currentForm.driver_name}
                              onChange={(e) => setCurrentForm({...currentForm, driver_name: e.target.value})}
                              className=' w-[200px] border-[1px] border-lightBlue outline-none rounded-[3px] text-[17px] py-[4px] px-[3px]'
                              />
                            </div>
                            <div className="flex flex-col">
                              
                              <label htmlFor="" className='text-[17px] mb-[5px] font-[500] mt-[10px]'>Driver License:</label>
                              <input type="number"
                              value={currentForm.driver_license}
                              onChange={(e) => setCurrentForm({...currentForm, driver_license: e.target.value})}
                              className=' w-[200px] border-[1px] border-lightBlue outline-none rounded-[3px] text-[17px] py-[4px] px-[3px]'
                               />
                               <label htmlFor="" className='text-[17px] mb-[5px] font-[500] mt-[10px]'>From:</label>
                              <select name="" id=""
                              defaultValue={currentForm.start_route}
                              onChange={(e) => setCurrentForm({...currentForm, start_route: e.target.value})}
                              className=' w-[200px] border-[1px] border-lightBlue outline-none rounded-[3px] text-[17px] py-[4px] px-[3px]'
                              >
                                {routesList.filter((route) => route.route_name !== currentForm.end_route).map((route) => (
                                  <option key={route.id} value={route.route_name}>{route.route_name}</option>
                                ))}
                              </select>
                              <label htmlFor="" className='text-[17px] mb-[5px] font-[500] mt-[10px]'>To:</label>
                              <select name="" id=""
                              defaultValue={currentForm.end_route}
                              onChange={(e) => setCurrentForm({...currentForm, end_route: e.target.value})}
                              className=' w-[200px] border-[1px] border-lightBlue outline-none rounded-[3px] text-[17px] py-[4px] px-[3px]'
                              >
                                {routesList.filter((route) => route.route_name !== currentForm.start_route).map((route) => (
                                  <option key={route.id} value={route.route_name}>{route.route_name}</option>
                                ))}
                              </select>
                            </div>
                          </div>
                          <div className="flex w-[100%] mt-[20px]">
                            <button
                            type='submit'
                            className='bg-lightBlue w-[100%] tracking-[15px] rounded-[4px] py-[8px] text-[20px] font-[900] text-white'
                             >Edit</button>
                          </div>
                        </form>
                      </div>
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

export default Trucks