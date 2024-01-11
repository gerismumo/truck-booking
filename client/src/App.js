import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import HomeDash from './pages/HomeDash';
import PostTruck from './pages/PostTruck';
import Stations from './pages/Stations';
import Trucks from './pages/Trucks';
import TruckTypes from './pages/TruckTypes';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Dashboard />}>
          <Route path='' element={<HomeDash />}/>
          <Route path='stations' element={<Stations />}/>
          <Route path='addTruck' element={<PostTruck />}/>
          <Route path='trucksList' element={<Trucks />}/>
          <Route path='truckTypes' element={<TruckTypes />}/>
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
