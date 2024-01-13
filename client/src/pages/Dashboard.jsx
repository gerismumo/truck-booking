import React from 'react'
import { Outlet } from 'react-router-dom'
import DashHeader from './DashHeader'

const Dashboard = () => {
  return (
    <>
    <DashHeader />
    <div className="absolute mt-[90px] flex flex-col px-[20px] ">
        <Outlet />
    </div>
    </>
  )
}

export default Dashboard