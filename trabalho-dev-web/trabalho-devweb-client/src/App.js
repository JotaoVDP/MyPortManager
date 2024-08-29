import './App.css';
import {BrowserRouter as Router, Route, Routes } from "react-router-dom"
import Login from './pages/Login';
import PortManagement from './pages/PortManagement';
import LandingPage from './pages/LandingPage';
import Register from './pages/Register';
import ContainerDashBoard from './pages/ContainerDashBoard';
import OperationDashBoard from './pages/OperationDashBoard';
import ShipDashBoard from './pages/ShipDashBoard';
import ProductDashBoard from './pages/ProductDashBoard';
import ProcessAndDowntimeDashBoard from './pages/ProcessAndDowntimeDashBoard';
import ContainerRegister from './pages/ContainerRegister';

function App() {

  return (
    <div className='App'>
      <Router>
        <Routes>
          <Route path='/' element={<LandingPage/>} />
          <Route path='/landing' element={<LandingPage/>} />
          <Route path='/home' element={<PortManagement/>} />
          <Route path='/login' element={<Login/>} />
          <Route path='/register' element={<Register/>} />
          <Route path='/container-dash' element={<ContainerDashBoard/>} />
          <Route path='/operation-dash' element={<OperationDashBoard/>} />
          <Route path='/ship-dash' element={<ShipDashBoard/>} />
          <Route path='/product-dash' element={<ProductDashBoard/>} />
          <Route path='/process-dash' element={<ProcessAndDowntimeDashBoard/>} />
          <Route path='/container-register' element={<ContainerRegister/>} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
