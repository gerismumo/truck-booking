import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import HomeDash from './pages/HomeDash';
import PostTruck from './pages/PostTruck';
import Trucks from './pages/Trucks';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Dashboard />}>
          <Route path='' element={<HomeDash />}/>
          <Route path='addTruck' element={<PostTruck />}/>
          <Route path='trucksList' element={<Trucks />}/>
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
