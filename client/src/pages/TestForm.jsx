import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from './Header';
import { useRoutesList } from './Stations';
import { API_URL, useTruckTypeList } from './TruckTypes';

const TestForm = () => {
    const navigate = useNavigate();

    const { truckTypeList } = useTruckTypeList();
    const {routesList} = useRoutesList();
    const[truckType, setTruckType] = useState('');
    const[from, setFrom] = useState('');
    const[to, setTo] = useState('');
    const[squareMeter, setSquareMeter] = useState('');
    const[itemsNumber, setItemsNumber] = useState('');
    const[departureDate, setDepartureDate] = useState('');

    const[bookType, setBookType] = useState(null);
    const getTruckTypeObject = truckTypeList.find(truck => truck.truck_type === truckType)

    useEffect(() => {
        if(getTruckTypeObject) {
            setBookType(getTruckTypeObject.book_type);
        }
    },[getTruckTypeObject, setBookType])
    

 


    const[errorMessage, setErrorMessage] = useState(null);
    const[successMessage, setSuccessMessage] = useState(null);
    const[fullTrucks, setFullTrucks] = useState([]);
    const[carsTransporterTrucks, setCarsTransporterTrucks] = useState([]);
    const[squareMetersTrucks, setSquareMetersTrucks] = useState([]);

    const[returnData, setReturnData] = useState([]);

    const handleSubmitForm = async(e) => {
        e.preventDefault();

        
        const bookingData = {
            truckType,
            from,
            to,
            squareMeter,
            itemsNumber,
            departureDate,
            bookType
        }
        
        try {
            const response = await axios.post(API_URL + '/booking', bookingData);
            console.log('seraching',response.data);
            if(response.data.success) {
                const trucksData = response.data.trucksData;
                const success = trucksData.status;

                if(success) {
                    setSuccessMessage(trucksData.message)
                   
                    const data = trucksData.data;
                    setReturnData(data);
                    const filteredDataNumberOfCars= data.filter(data => data.book_type === 'Number of Items');
                    setCarsTransporterTrucks(filteredDataNumberOfCars);
                
                    const filteredDataSquare = data.filter(data => data.book_type === 'Square Meter') ;
                    setSquareMetersTrucks(filteredDataSquare);
                
                    const filteredDataFullTrucks = data.filter(data => data.book_type === 'Full Truck');
                    setFullTrucks(filteredDataFullTrucks);
                    
                }else {
                    console.log(trucksData.message);
                    setErrorMessage(trucksData.message);
                }
            }
        }catch (error) {
            console.log(error.message)
        }

    }
    
    const[openPay,setOpenPay] = useState(false);
    const[closeBookBtn, setCloseBookBtn] = useState(true);
    const[currentId, setCurrentId] = useState(null);
    const handleBook = (id) => {
        setCurrentId(id);
        console.log(id);
        setOpenPay(true);
        setCloseBookBtn(false);
    }

    const[phoneNumber, setPhoneNumber] = useState('')
    const[email, setEmail] = useState('');
    const[fullName, setFullName] = useState('');
    const[customerId, setCustomerId] = useState('');
    const[customerCountry, setCustomerCountry] = useState('');
    const[goodsDescription, setGoodsDescription] = useState('');

    const handlePayAndBook = async(e,id) => {
        setCloseBookBtn(true);
        e.preventDefault();
        console.log(id);
        const currentBookData = returnData.find(item => item.id === id);
        currentBookData.phoneNumber = phoneNumber;
        currentBookData.email = email;
        currentBookData.fullName = fullName;
        currentBookData.customerId = customerId;
        currentBookData.customerCountry = customerCountry;
        currentBookData.goodsDescription = goodsDescription;

        
        try{
            const response = await axios.post(API_URL + '/payBooking', currentBookData);
            if(response.data.success) {
                navigate('/successPay');
            }
        }catch(error) {
            console.log(error.message);
        }
    }

    if(truckTypeList.length === 0) {
        return (
            <div className='flex justify-center items-center'>
                <p>loading....</p>
            </div>
        )
    }
  return (
    <>
  <Header />
    <div className="flex flex-col">
        <div className="mt-[80px] lg:mt-[70px] p-[10px] md:p-[20px]">
            <div className="flex justify-center mb-[50px] lg:flex-row gap-[40px] bg-[whitesmoke] py-[20px]">
                <form onSubmit={(e) => handleSubmitForm(e)} className='flex flex-col lg:flex-row justify-between lg:gap-[200px] w-[auto] '>
                    <div className=" flex flex-col">
                        <label htmlFor="" className='text-[17px] mb-[5px] font-[500] mt-[10px]'>Truck Types:</label>
                        <select name="" id=""
                        value={truckType}
                        onChange={(e) => setTruckType(e.target.value)}
                        className='w-[300px] border-[1px] border-lightBlue outline-none rounded-[3px] text-[17px] py-[4px] px-[3px]'
                        >
                            <option  value=''>Select a option</option>
                            {truckTypeList.map((truck) => (
                                <option key={truck._id} value={truck.truck_type}>{truck.truck_type}</option>
                            ))}
                        </select>
                        <label htmlFor="" className='text-[17px] mb-[5px] font-[500] mt-[10px]'>Book Type:</label>
                        <span>{bookType}</span>
                        {bookType === 'Square Meter' && (
                            <input type="number" 
                            min={0}
                            placeholder='Enter goods Square Meter'
                            value={squareMeter}
                            onChange={(e) => setSquareMeter(e.target.value)}
                            className='w-[300px] border-[1px] border-lightBlue outline-none rounded-[3px] text-[17px] py-[4px] px-[3px]'
                            />
                        )}
                        {bookType === 'Number of Items' && (
                            <input type="number" 
                                min={0}
                                placeholder='Enter Number of Items'
                                value={itemsNumber}
                                onChange={(e) => setItemsNumber(e.target.value)}
                                className='w-[300px] border-[1px] border-lightBlue outline-none rounded-[3px] text-[17px] py-[4px] px-[3px]'
                            />
                        )}
                    </div>
                    <div className="flex flex-col">
                        <label htmlFor="" className='text-[17px] mb-[5px] font-[500] mt-[10px]'>From:</label>
                        <select name="" id=""
                        value={from}
                        onChange={(e) => setFrom(e.target.value)}
                        className='w-[300px] border-[1px] border-lightBlue outline-none rounded-[3px] text-[17px] py-[4px] px-[3px]'
                        >
                            <option value="">select a route</option>
                            {routesList.filter((route) => route.route_name !== to).map((route) => (
                                <option key={route.id} value={route.route_name}>{route.route_name}</option>
                            ))}
                        </select>
                        <label htmlFor="" className='text-[17px] mb-[5px] font-[500] mt-[10px]'>To:</label>
                        <select name="" id=""
                        value={to}
                        onChange={(e) => setTo(e.target.value)}
                        className='w-[300px] border-[1px] border-lightBlue outline-none rounded-[3px] text-[17px] py-[4px] px-[3px]'
                        >
                            <option value="">select a route</option>
                        {routesList.reverse().filter((route) => route.route_name !== from).map((route) => (
                                <option key={route.id} value={route.route_name}>{route.route_name}</option>
                            ))}
                        </select>
                    </div>
                    <div className="flex flex-col">
                        <label htmlFor="" className='text-[17px] mb-[5px] font-[500] mt-[10px]'>Departure Date:</label>
                        <input type="date" name="" id="" 
                        value={departureDate}
                        onChange={(e) => setDepartureDate(e.target.value)}
                        className='w-[300px] border-[1px] border-lightBlue outline-none rounded-[3px] text-[17px] py-[4px] px-[3px]'
                        />
                        <div className="mt-[20px] flex justify-center">
                            <button className='bg-lightBlue px-[15px] py-[5px] rounded-[5px]'>Search</button>
                        </div>
                    </div>
                </form>
            </div>
            <div className="flex justify-center">
                <div className="flex flex-col">
                    {errorMessage !== null && (
                        <p className='text-[red]'>{errorMessage}</p>
                    )}
                    {fullTrucks.length > 0 && (
                        <div className="flex flex-col">
                            <div className="mb-[10px]">
                                <p className='text-[20px] font-[700] text-[orangered]'><span className='text-[black] text-[18px] font-[500] mr-[10px]'>Results:</span>{fullTrucks.length}</p>
                            </div>
                            {fullTrucks.map((item) => (
                                <div key={item.id} className="flex flex-col lg:flex-row justify-center gap-[30px] lg:gap-[80px] border-[1px] border-[#ccc] p-[10px]">
                                    <div className="flex flex-col gap-[20px] items-start">
                                        <div className="">
                                        <p><span>Book Type:</span>{item.book_type}</p>
                                        </div>
                                        <p>Choosen Route:</p>
                                        <div className="flex justify-center gap-[30px] items-center">
                                            <div className="">
                                                <p><span>From:</span>{item.from}</p>
                                            </div>
                                            <div className="">
                                                <p><span>To:</span>{item.to}</p>
                                            </div>
                                        </div>
                                        <p>Truck Route:</p>
                                        <div className="flex justify-center gap-[30px] items-center">
                                            <div className="">
                                                <p><span>From:</span>{item.start_route}</p>
                                            </div>
                                            <div className="">
                                                <p><span>To:</span>{item.end_route}</p>
                                            </div>
                                        </div>
                                        <div className="">
                                            <p><span>Departure Date:</span>{item.departureDate}</p>
                                        </div>
                                        <div className="">
                                            <p><span>Price To Pay:</span>Ksh.{item.pricing}</p>
                                        </div>
                                        {closeBookBtn &&(
                                            <div className="flex justify-center">
                                                <button className='bg-lightBlue px-[15px] py-[8px] rounded-[5px]' 
                                                onClick={() =>handleBook(item.id)}
                                                >Book
                                                </button>
                                            </div>
                                        )}
                                    </div>
                                    {openPay && currentId === item.id && (
                                        <form className='flex flex-col' onSubmit={(e) => handlePayAndBook(e, item.id)}>
                                            <label htmlFor="" className='text-[17px] mb-[5px] font-[500] mt-[10px]'>Phone Number:</label>
                                            <input type="tel"
                                            placeholder='Enter Phone number' 
                                            value={phoneNumber}
                                            onChange={(e) => setPhoneNumber(e.target.value)}
                                            className='border-[1px] border-lightBlue outline-none rounded-[3px] text-[17px] py-[4px] px-[3px]'
                                            />
                                            <label htmlFor="" className='text-[17px] mb-[5px] font-[500] mt-[10px]'>Email:</label>
                                            <input type="email"
                                            placeholder='Enter your Email address'
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            className='border-[1px] border-lightBlue outline-none rounded-[3px] text-[17px] py-[4px] px-[3px]'
                                            />
                                            <label htmlFor="" className='text-[17px] mb-[5px] font-[500] mt-[10px]'>Full Name:</label>
                                            <input type="text"
                                            placeholder='Enter full name'
                                            value={fullName}
                                            onChange={(e) => setFullName(e.target.value)}
                                            className='border-[1px] border-lightBlue outline-none rounded-[3px] text-[17px] py-[4px] px-[3px]'
                                            />
                                            <label htmlFor="" className='text-[17px] mb-[5px] font-[500] mt-[10px]'>National Id:</label>
                                            <input type="number"
                                            placeholder='Enter your national id'
                                            value={customerId}
                                            onChange={(e) => setCustomerId(e.target.value)}
                                            className='border-[1px] border-lightBlue outline-none rounded-[3px] text-[17px] py-[4px] px-[3px]'
                                            />
                                            <label htmlFor="" className='text-[17px] mb-[5px] font-[500] mt-[10px]'>Country:</label>
                                            <input type="text"
                                            placeholder='Enter your country'
                                            value={customerCountry}
                                            onChange={(e) => setCustomerCountry(e.target.value)}
                                            className='border-[1px] border-lightBlue outline-none rounded-[3px] text-[17px] py-[4px] px-[3px]'
                                            />
                                            <label htmlFor="" className='text-[17px] mb-[5px] font-[500] mt-[10px]'>Goods Description:</label>
                                            <textarea name="" id="" cols="30" rows="10"
                                            value={goodsDescription}
                                            onChange={(e) => setGoodsDescription(e.target.value)}
                                            className='h-[60px] border-[1px] border-lightBlue outline-none rounded-[3px] text-[17px] py-[4px] px-[3px]'
                                            >
                                            </textarea>
                                            <div className="flex justify-center mt-[20px]">
                                                <button type='submit'
                                                className='bg-lightBlue px-[30px] py-[10px] rounded-[10px] text-[18px] font-[500]'
                                                >
                                                    Pay
                                                </button>
                                            </div>
                                        </form>
                                    )}
                                </div>
                               
                            ))}
                        </div>
                    ) }
                    {squareMetersTrucks.length > 0 && (
                        <div  className="" >
                            <div className="">
                                <p><span>Results</span>{squareMetersTrucks.length}</p>
                            </div>
                            
                        { squareMetersTrucks.map((item) => (
                            <div key={item.id} className="flex flex-col gap-[30px] border-[1px] border-[#ccc] p-[10px]">
                                <div className="flex flex-col gap-[20px] items-start">
                                    <div className="">
                                    <p><span>Book Type:</span>{item.book_type}</p>
                                    </div>
                                    <div className="">
                                        <p><span>No of squares:</span>{item.no_of_squareMeter}</p>
                                    </div>
                                    <div className="">
                                        <p><span>Remaining Space:</span>{item.checkRemainingAmount}</p>
                                    </div>
                                    <p>Choosen Route:</p>
                                    <div className="flex justify-center gap-[30px] items-center">
                                        <div className="">
                                            <p><span>From:</span>{item.from}</p>
                                        </div>
                                        <div className="">
                                            <p><span>To:</span>{item.to}</p>
                                        </div>
                                    </div>
                                    <p>Truck Route:</p>
                                    <div className="flex justify-center gap-[30px] items-center">
                                        <div className="">
                                            <p><span>From:</span>{item.start_route}</p>
                                        </div>
                                        <div className="">
                                            <p><span>To:</span>{item.end_route}</p>
                                        </div>
                                    </div>
                                    <div className="">
                                        <p><span>Departure Date:</span>{item.departureDate}</p>
                                    </div>
                                    <div className="">
                                        <p><span>Price To Pay:</span>Ksh.{item.priceToPay}</p>
                                    </div>
                                    {closeBookBtn &&(
                                        <div className="flex justify-center">
                                            <button className='bg-lightBlue px-[15px] py-[8px] rounded-[5px]' 
                                            onClick={() =>handleBook(item.id)}
                                            >Book
                                            </button>
                                        </div>
                                    )}
                                </div>
                                {openPay && currentId === item.id && (
                                    <form className='flex flex-col' onSubmit={(e) => handlePayAndBook(e, item.id)}>
                                        <label htmlFor="" className='text-[17px] mb-[5px] font-[500] mt-[10px]'>Phone Number:</label>
                                        <input type="tel"
                                        placeholder='Enter Phone number' 
                                        value={phoneNumber}
                                        onChange={(e) => setPhoneNumber(e.target.value)}
                                        className='border-[1px] border-lightBlue outline-none rounded-[3px] text-[17px] py-[4px] px-[3px]'
                                        />
                                        <label htmlFor="" className='text-[17px] mb-[5px] font-[500] mt-[10px]'>Email:</label>
                                        <input type="email"
                                        placeholder='Enter your Email address'
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        className='border-[1px] border-lightBlue outline-none rounded-[3px] text-[17px] py-[4px] px-[3px]'
                                        />
                                        <label htmlFor="" className='text-[17px] mb-[5px] font-[500] mt-[10px]'>Full Name:</label>
                                        <input type="text"
                                        placeholder='Enter full name'
                                        value={fullName}
                                        onChange={(e) => setFullName(e.target.value)}
                                        className='border-[1px] border-lightBlue outline-none rounded-[3px] text-[17px] py-[4px] px-[3px]'
                                        />
                                        <label htmlFor="" className='text-[17px] mb-[5px] font-[500] mt-[10px]'>National Id:</label>
                                        <input type="number"
                                        placeholder='Enter your national id'
                                        value={customerId}
                                        onChange={(e) => setCustomerId(e.target.value)}
                                        className='border-[1px] border-lightBlue outline-none rounded-[3px] text-[17px] py-[4px] px-[3px]'
                                        />
                                        <label htmlFor="" className='text-[17px] mb-[5px] font-[500] mt-[10px]'>Country:</label>
                                        <input type="text"
                                        placeholder='Enter your country'
                                        value={customerCountry}
                                        onChange={(e) => setCustomerCountry(e.target.value)}
                                        className='border-[1px] border-lightBlue outline-none rounded-[3px] text-[17px] py-[4px] px-[3px]'
                                        />
                                        <label htmlFor="" className='text-[17px] mb-[5px] font-[500] mt-[10px]'>Goods Description:</label>
                                        <textarea name="" id="" cols="30" rows="10"
                                        value={goodsDescription}
                                        onChange={(e) => setGoodsDescription(e.target.value)}
                                        className='border-[1px] border-lightBlue outline-none rounded-[3px] text-[17px] py-[4px] px-[3px]'
                                        >
                                        </textarea>
                                        <div className="flex justify-center mt-[20px]">
                                            <button type='submit'
                                            className='bg-lightBlue px-[30px] py-[10px] rounded-[10px] text-[18px] font-[500]'
                                            >
                                                Pay
                                            </button>
                                        </div>
                                    </form>
                                )}
                            </div>
                        ))} 
                        </div>
                    )}
                    {carsTransporterTrucks.length > 0 && (
                        <div  className="" >
                            <div className="">
                                <p><span>Results</span>{carsTransporterTrucks.length}</p>
                            </div>
                            
                        {carsTransporterTrucks.map((item) => (
                            <div key={item.id} className="flex flex-col gap-[30px] border-[1px] border-[#ccc] p-[10px]">
                                <div className="flex flex-col gap-[20px] items-start">
                                    <div className="">
                                    <p><span>Book Type:</span>{item.book_type}</p>
                                    </div>
                                    <div className="">
                                        <p><span>No of Vehicles:</span>{item.no_of_your_vehicles}</p>
                                    </div>
                                    <div className="">
                                        <p><span>Remaining Space:</span>{item.checkRemainingSpace}</p>
                                    </div>
                                    <p>Choosen Route:</p>
                                    <div className="flex justify-center gap-[30px] items-center">
                                        <div className="">
                                            <p><span>From:</span>{item.from}</p>
                                        </div>
                                        <div className="">
                                            <p><span>To:</span>{item.to}</p>
                                        </div>
                                    </div>
                                    <p>Truck Route:</p>
                                    <div className="flex justify-center gap-[30px] items-center">
                                        <div className="">
                                            <p><span>From:</span>{item.start_route}</p>
                                        </div>
                                        <div className="">
                                            <p><span>To:</span>{item.end_route}</p>
                                        </div>
                                    </div>
                                    <div className="">
                                        <p><span>Departure Date:</span>{item.departureDate}</p>
                                    </div>
                                    <div className="">
                                        <p><span>Price To Pay:</span>Ksh.{item.priceToPay}</p>
                                    </div>
                                    {closeBookBtn &&(
                                        <div className="flex justify-center">
                                            <button className='bg-lightBlue px-[15px] py-[8px] rounded-[5px]' 
                                            onClick={() =>handleBook(item.id)}
                                            >Book
                                            </button>
                                        </div>
                                    )}
                                </div>
                                
                                
                                {openPay && currentId === item.id && (
                                    <form className='flex flex-col' onSubmit={(e) => handlePayAndBook(e, item.id)}>
                                        <label htmlFor="" className='text-[17px] mb-[5px] font-[500] mt-[10px]'>Phone Number:</label>
                                        <input type="tel"
                                        placeholder='Enter Phone number' 
                                        value={phoneNumber}
                                        onChange={(e) => setPhoneNumber(e.target.value)}
                                        className='border-[1px] border-lightBlue outline-none rounded-[3px] text-[17px] py-[4px] px-[3px]'
                                        />
                                        <label htmlFor="" className='text-[17px] mb-[5px] font-[500] mt-[10px]'>Email:</label>
                                        <input type="email"
                                        placeholder='Enter your Email address'
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        className='border-[1px] border-lightBlue outline-none rounded-[3px] text-[17px] py-[4px] px-[3px]'
                                        />
                                        <label htmlFor="" className='text-[17px] mb-[5px] font-[500] mt-[10px]'>Full Name:</label>
                                        <input type="text"
                                        placeholder='Enter full name'
                                        value={fullName}
                                        onChange={(e) => setFullName(e.target.value)}
                                        className='border-[1px] border-lightBlue outline-none rounded-[3px] text-[17px] py-[4px] px-[3px]'
                                        />
                                        <label htmlFor="" className='text-[17px] mb-[5px] font-[500] mt-[10px]'>National Id:</label>
                                        <input type="number"
                                        placeholder='Enter your national id'
                                        value={customerId}
                                        onChange={(e) => setCustomerId(e.target.value)}
                                        className='border-[1px] border-lightBlue outline-none rounded-[3px] text-[17px] py-[4px] px-[3px]'
                                        />
                                        <label htmlFor="" className='text-[17px] mb-[5px] font-[500] mt-[10px]'>Country:</label>
                                        <input type="text"
                                        placeholder='Enter your country'
                                        value={customerCountry}
                                        onChange={(e) => setCustomerCountry(e.target.value)}
                                        className='border-[1px] border-lightBlue outline-none rounded-[3px] text-[17px] py-[4px] px-[3px]'
                                        />
                                        <label htmlFor="" className='text-[17px] mb-[5px] font-[500] mt-[10px]'>Goods Description:</label>
                                        <textarea name="" id="" cols="30" rows="10"
                                        value={goodsDescription}
                                        onChange={(e) => setGoodsDescription(e.target.value)}
                                        className='border-[1px] border-lightBlue outline-none rounded-[3px] text-[17px] py-[4px] px-[3px]'
                                        >
                                        </textarea>
                                        <div className="flex justify-center mt-[20px]">
                                            <button type='submit'
                                            className='bg-lightBlue px-[30px] py-[10px] rounded-[10px] text-[18px] font-[500]'
                                            >
                                                Pay
                                            </button>
                                        </div>
                                    </form>
                                )}
                            </div>
                        ))} 
                        </div>
                    )}
                </div>
            </div>
            <div className="flex flex-col justify-center mt-[30px]">
                <div className="flex justify-center items-center mb-[20px]">
                    <h2 className='text-[20px] font-[600]'>Truck Types</h2>
                </div>
                <div className="flex flex-wrap gap-[50px] justify-center">
                    {truckTypeList.map((type) => (
                        <div className="flex flex-col justify-center gap-[20px] items-center">
                            <div className="">
                                <h2 className='text-[18px] font-[500]'>{type.truck_type}</h2>
                            </div>
                            <div className="">
                            <img src={URL.createObjectURL(new Blob([new Uint8Array(type.image.data)],{type: 'image/jpeg', }))} alt="" 
                                className='w-[300px] h-[250px] border-[1px] border-[#ddd]'
                            />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            
        </div>
        
    </div>
    </>
    
  )
}

export default TestForm