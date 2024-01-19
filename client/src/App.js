import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Bookings from './pages/Bookings';
import Dashboard from './pages/Dashboard';
import LoginForm from './pages/LoginForm';
import PostTruck from './pages/PostTruck';
import Progress from './pages/Progress';
import Stations from './pages/Stations';
import Success from './pages/Success';
import TestForm from './pages/TestForm';
import TruckTypes from './pages/TruckTypes';
import Trucks from './pages/Trucks';

function App() {
  return (
    <Router>
      <Routes>
          <Route path='/' element={<TestForm />}/>
          <Route path='/dashboard' element={<Dashboard />} />
          <Route path='/stations' element={<Stations />}/>
          <Route path='/addTruck' element={<PostTruck />}/>
          <Route path='/trucksList' element={<Trucks />}/>
          <Route path='/truckTypes' element={<TruckTypes />}/>
          <Route path='/bookings' element={<Bookings />}/>
          <Route path='/successPay' element={<Success />}/>
          <Route path='/progress' element={<Progress />}/>
          <Route path='/login' element={<LoginForm />}/>
      </Routes>
    </Router>
  );
}

export default App;
