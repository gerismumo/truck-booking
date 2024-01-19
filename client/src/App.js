import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Bookings from './pages/Bookings';
import Dashboard from './pages/Dashboard';
import PostTruck from './pages/PostTruck';
import Stations from './pages/Stations';
import TestForm from './pages/TestForm';
import TruckTypes from './pages/TruckTypes';
import Trucks from './pages/Trucks';
import Success from './pages/Success';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Dashboard />} />
          <Route path='/stations' element={<Stations />}/>
          <Route path='/addTruck' element={<PostTruck />}/>
          <Route path='/trucksList' element={<Trucks />}/>
          <Route path='/truckTypes' element={<TruckTypes />}/>
          <Route path='/test' element={<TestForm />}/>
          <Route path='/bookings' element={<Bookings />}/>
          <Route path='/successPay' element={<Success />}/>
      </Routes>
    </Router>
  );
}

export default App;
