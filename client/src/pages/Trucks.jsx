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

  const[openStartDelivery, setOpenStartDelivery] = useState(false);
  const[openUpdateDelivery, setOpenUpdateDelivery] = useState(false);

  const[openEdit, setOpenEdit] = useState(false);
  const[editId, setEditId] = useState(null);
  const[currentForm, setCurrentForm] = useState(null);
  const[editFile, setEditFile] = useState(null);

  const handleOpenEdit =(id) => {
    setOpenStartDelivery(false);
    setOpenUpdateDelivery(false);
    
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

  //delivery

  
  const[deliveredId, setDeliveredId] = useState(null);
  const handleOpenUpdateDelivery = (id) => {
    setOpenStartDelivery(false);
    setOpenEdit(false);
    setDeliveredId(id);
    if(id) {
      setOpenUpdateDelivery(!openUpdateDelivery);
    }
  }

  const[deliveryStatus, setDeliveryStatus] = useState('')
  const[deliveryDate, setDeliveryDate] = useState('')

  const handleChangeDelivery = (e) => {
    setDeliveryStatus(e.target.value)
  }

  const handleUpdateDelivery = async(e) => {
    e.preventDefault();

    if(deliveryStatus === 'delivered') {
      if(deliveryDate === '') {
        alert('Please enter delivered Date');
        return;
      }
    }

    console.log('deliveryStatus',deliveryStatus);
    console.log('deliveryDate',deliveryDate);
    const deliveryData = {
      deliveryStatus,
      deliveryDate
    }

    try {
      const response = await axios.put(`${API_URL}/updateTrucksEndDelivery/${deliveredId}`, deliveryData);
      if(response.data.success) {
        trucksData();
        setOpenUpdateDelivery(false);
      }
    }catch(error) {
      console.log(error.message);
    }
  }

  const[startDeliveryId, setStartDeliveryId] = useState(null);
 
  const[startDeliveryDate, setStartDeliveryDate] = useState('');

   const handleStartDelivery = (id) => {
    setOpenEdit(false);
    setOpenUpdateDelivery(false);
    setStartDeliveryId(id);
    if(id) {
      setOpenStartDelivery(!openStartDelivery);
    }
  }

const handleStartDeliverySubmit = async(e) => {
  e.preventDefault();
  try {
    const startDate = {
      startDeliveryDate
    }
  
    const response = await axios.put(`${API_URL}/updateStartDelivery/${startDeliveryId}`, startDate)
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
                  <td className='px-[20px] py-[10px] border border-[#ddd]'>{trucks.status === 1 ? 'Full' : 'No Full'}</td>
                  <td className='px-[20px] py-[10px] border border-[#ddd]'>On Delivery</td>
                  <td className='px-[20px] py-[10px] border border-[#ddd]'>unavailable</td>
                  {trucks.status === 1 ?  (
                    
                    <td className='px-[20px] py-[10px] border border-[#ddd]'><button onClick={() => handleStartDelivery(trucks.id)} className='bg-lightBlue px-[15px] py-[8px] rounded-[4px]'>Start Delivery</button></td>
                  ) : (
                    <td className='px-[20px] py-[10px] border border-[#ddd]'>Not full yet</td>
                  )}
                  {trucks.status === 1 ? (
                    <td className='px-[20px] py-[10px] border border-[#ddd]'><button onClick={() =>handleOpenUpdateDelivery(trucks.id)} className='bg-lightBlue px-[15px] py-[8px] rounded-[4px]'>{openUpdateDelivery && trucks.id === deliveredId ? 'Close' : 'Delivered'}</button></td>
                  ): (
                    <td className='px-[20px] py-[10px] border border-[#ddd]'>Not full yet</td>
                  )}
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
                              <div className="">
                                <img src={URL.createObjectURL(new Blob([new Uint8Array(currentForm.truck_image.data)],{type: 'image/jpeg', }))} alt="" 
                                className='w-[200px] h-[180px]'
                                />
                              </div>
                              <label htmlFor="" className='text-[17px] mb-[5px] font-[500] mt-[10px]'>Image:</label>
                              <input type="file" 
                              accept="image/*" multiple
                              onChange={(e) => setEditFile(e.target.files[0])}
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
                              <label htmlFor="" className='text-[17px] mb-[5px] font-[500] mt-[10px]'>Driver Name:</label>
                                <input type="text"
                                value={currentForm.driver_name}
                                onChange={(e) => setCurrentForm({...currentForm, driver_name: e.target.value})}
                                className=' w-[200px] border-[1px] border-lightBlue outline-none rounded-[3px] text-[17px] py-[4px] px-[3px]'
                                />
                              
                              <label htmlFor="" className='text-[17px] mb-[5px] font-[500] mt-[10px]'>Driver License:</label>
                              <input type="number"
                              value={currentForm.driver_license}
                              onChange={(e) => setCurrentForm({...currentForm, driver_license: e.target.value})}
                              className=' w-[200px] border-[1px] border-lightBlue outline-none rounded-[3px] text-[17px] py-[4px] px-[3px]'
                               />
                              
                            </div>
                            <div className="flex flex-col">
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
                {openUpdateDelivery && trucks.id === deliveredId && (
                  <tr>
                    <td colSpan='17' className='px-[20px] py-[10px] border border-[#ddd]'>
                      <form onSubmit={(e) => handleUpdateDelivery(e)} className='flex justify-center'>
                        <div className=" flex flex-col">
                          <label htmlFor="" className='text-[17px] mb-[5px] font-[500] mt-[10px]'>Status:</label>
                          <div className="">
                            <input type="radio" name="checkDelivery"  id="" 
                            value='delivered'
                            checked={deliveryStatus === 'delivered'}
                            onChange={handleChangeDelivery}
                            />
                            <label htmlFor="">Delivered</label>
                          </div>
                          {/* <div className="justify-center gap-[10px] items-center">
                            <input type="radio" name="checkDelivery" id="" 
                            value='notDelivered'
                            checked={deliveryStatus === 'notDelivered'}
                            onChange={handleChangeDelivery}
                            />
                            <label htmlFor="">Not Delivered</label>
                          </div> */}
                          {deliveryStatus === 'delivered' && (
                            <>
                            <label htmlFor="" className='text-[17px] mb-[5px] font-[500] mt-[10px]'>Delivered Date:</label>
                            <input type="date" name="" id="" 
                            value={deliveryDate}
                            onChange={(e) => setDeliveryDate(e.target.value)}
                             className='border-[1px] border-lightBlue outline-none rounded-[3px] text-[17px] py-[4px] px-[3px]'
                            />
                            </>
                          )}
                          <div className="mt-[20px] flex justify-center" >
                            <button className='bg-lightBlue px-[15px] py-[8px] rounded-[4px]'>Update</button>
                          </div>
                        </div>
                        
                      </form>
                    </td>
                  </tr>
                )}
                {openStartDelivery && startDeliveryId === trucks.id && (
                  <tr>
                    <td colSpan='18'>
                      <form onSubmit={(e) => handleStartDeliverySubmit(e)} className='flex justify-center gap-[40px]'>
                        <div className="flex flex-col">
                          <label htmlFor="" className='text-[17px] mb-[5px] font-[500] mt-[10px]'>Start Label:</label>
                          <input type="date" name="" id=""
                          value={startDeliveryDate}
                          onChange={(e) => setStartDeliveryDate(e.target.value)}
                          className='border-[1px] border-lightBlue outline-none rounded-[3px] text-[17px] py-[4px] px-[3px]'
                          />
                          <div className="flex justify-center mt-[30px]">
                            <button type='submit' className='bg-lightBlue px-[15px] py-[8px] rounded-[4px]' >Update</button>
                          </div>
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

export default Trucks