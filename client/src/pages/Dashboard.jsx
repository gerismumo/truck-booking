import axios from 'axios';
import React, { useEffect, useState } from 'react';
import DashHeader from './DashHeader';

const Dashboard = () => {
  const API_URL = `${process.env.REACT_App_API_URL}/api`

const[someOfMoneyEarned, setSomeOfMoneyEarned] = useState('');
const[noOfTrucks, setNoOfTruck] = useState('');
const[noOfRoutes, setNoOfRoute] = useState('');
const[doneDeliveries, setDoneDeliveries] = useState('');
const[pendingDeliveries, setPendingDeliveries] = useState('');
const[trucksMoney, setTrucksMoney] = useState('');

  const getApis = async() => {
    try{
      const sumOfMoney = await axios.get(API_URL + '/sumOfMoneyEarned');
      if(sumOfMoney.data.success) {
        setSomeOfMoneyEarned(sumOfMoney.data.result[0].total);
      }

      const noOfTruck = await axios.get(API_URL + '/noOfTrucks');
      if(noOfTruck.data.success) {
        setNoOfTruck(noOfTruck.data.result[0].noOfTrucks)
      }

      const noOfRoute = await axios.get(API_URL + '/noOfRoutes');
      if(noOfRoute.data.success) {
        setNoOfRoute(noOfRoute.data.result[0].noOfRoutes);
      }

      const noOfDoneDeliveries = await axios.get(API_URL + '/noOfDoneDeliveries')
      if(noOfDoneDeliveries.data.success) {
        setDoneDeliveries(noOfDoneDeliveries.data.result[0].noOfDoneDeliveries);
      }

      const noOfPendingDeliveries = await axios.get(API_URL + '/noOfPendingDeliveries');
      if(noOfPendingDeliveries.data.success) {
        setPendingDeliveries(noOfPendingDeliveries.data.result[0].noOfDoneDeliveries);
      }

      const trucksTotalMoney = await axios.get(API_URL + '/moneyMadeByEachTruck');
      if(trucksTotalMoney.data.success) {
        setTrucksMoney(trucksTotalMoney.data.result);
      }

      
    }catch(error) {
      console.log(error.message);
    }
  }
  useEffect(() => {
    getApis();
  },[]);
  console.log(noOfRoutes);
  console.log(noOfTrucks);
  console.log(someOfMoneyEarned);
  console.log(doneDeliveries);
  console.log(pendingDeliveries);
  console.log(trucksMoney);

 
  return (
    <>
    <DashHeader />
    <div className="absolute mt-[100px] w-[100%] px-[20px]">
      <div className=" flex flex-col justify-center items-center">
        <div className="flex flex-row justify-center items-center">
          <div className="flex flex-row flex-wrap gap-[50px]">
            <div className="bg-lightBlue w-[300px] h-[180px] rounded-[8px] flex flex-col justify-center items-center">
              <div className="flex flex-col gap-[30px] items-center">
                <div className="">
                  <p className='font-[700] text-[20px]'>Total Money Earned</p>
                </div>
                <div className="">
                  <p className='text-[18px] font-[500]'>{someOfMoneyEarned}</p>
                </div>
              </div>
            </div>
            <div className="bg-[whitesmoke] w-[250px] h-[180px] rounded-[8px] flex flex-col justify-center items-center">
              <div className="flex flex-col gap-[30px] items-center">
                <div className="">
                  <p className='font-[700] text-[20px]'>Number of Trucks</p>
                </div>
                <div className="">
                  <p className='text-[18px] font-[500]'>{noOfTrucks}</p>
                </div>
              </div>
            </div>
            <div className="bg-[whitesmoke] w-[250px] h-[180px] rounded-[8px] flex flex-col justify-center items-center">
              <div className="flex flex-col gap-[30px] items-center">
                <div className="">
                  <p className='font-[700] text-[20px]'>Number of Routes</p>
                </div>
                <div className="">
                  <p className='text-[18px] font-[500]'>{noOfRoutes}</p>
                </div>
              </div>
            </div>
            <div className="bg-[whitesmoke] w-[250px] h-[180px] rounded-[8px] flex flex-col justify-center items-center">
              <div className="flex flex-col gap-[30px] items-center">
                <div className="">
                  <p className='font-[700] text-[20px]'>Done Deliveries</p>
                </div>
                <div className="">
                  <p className='text-[18px] font-[500]'>{doneDeliveries}</p>
                </div>
              </div>
            </div>
            <div className="bg-[whitesmoke] w-[250px] h-[180px] rounded-[8px] flex flex-col justify-center items-center">
              <div className="flex flex-col gap-[30px] items-center">
                <div className="">
                  <p className='font-[700] text-[20px]'>Pending Deliveries</p>
                </div>
                <div className="">
                  <p className='text-[18px] font-[500]'>{pendingDeliveries}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="flex justify-center">
          <table>
            <caption className='mb-[10px] font-[500] text-[grey] text-[18px]'>
              Money made by Each Truck
            </caption>
            <thead>
              <th className='px-[50px] py-[10px] border border-[#ddd]'>Truck Plate</th>
              <th className='px-[50px] py-[10px] border border-[#ddd]'>Truck Type</th>
              <th className='px-[50px] py-[10px] border border-[#ddd]'>Truck Model</th>
              <th className='px-[50px] py-[10px] border border-[#ddd]'>Total Money</th>
            </thead>
            <tbody>
              {trucksMoney.length > 0 && trucksMoney.map((truck) => (
                <tr key={truck.truck_id}>
                  <td className='px-[50px] py-[10px] border border-[#ddd]'>{truck.number_plate}</td>
                  <td className='px-[50px] py-[10px] border border-[#ddd]'>{truck.truck_type}</td>
                  <td className='px-[50px] py-[10px] border border-[#ddd]'>{truck.truck_model}</td>
                  <td className='px-[50px] py-[10px] border border-[#ddd]'>{truck.total_money}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
    
    </>
   
  )
}

export default Dashboard;