import logo from './logo.svg';
import './App.css';
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import NavBar from './components/NavBar/NavBar';
import Signup from './components/Signup/Signup';
import Home from './components/Home/Home';
import Login from './components/Login/Login';
import Admin from './components/Admin/Admin';
import EmpSignup from './components/Signup/EmpSingup/EmpSginup';
import EmpLogin from './components/Login/EmpLogin/EmpLogin';
import BuyPage from './components/BuyPage/BuyPage';
import Employee from './components/Employee/Employee';
import DeliveryPage from './components/Delivery/DeliveryPage';
import Packs from './components/Packs/Packs';
import PacksBuyPage from './components/Packs/PacksBuyPage';
import PackOrderAdmin from './components/Admin/PackOrderAdmin/PackOrderAdmin';
import SellingPage from './components/Selling/SellingPage';


function App() {
  return (
    <BrowserRouter>
    <NavBar/>
    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="login" element={<Login/>}/>
      <Route path="signup" element={<Signup/>}/>
      <Route path="admin" element={<Admin/>}/>
      <Route path="/signup/emp" element={<EmpSignup/>}/>
      <Route path="/login/empsignup" element={<EmpLogin/>}/>
      <Route path="buypage" element={<BuyPage/>}/>
      <Route path="emp" element={<Employee/>}/>
      <Route path="pack" element={<Packs/>}/>
      <Route path="delivery" element={<DeliveryPage/>}/>
      <Route path="packbuy" element={<PacksBuyPage/>}/>
      <Route path="packorder" element={<PackOrderAdmin/>}/>
      <Route path="selling" element={<SellingPage/>}/>
    </Routes>
    </BrowserRouter>
  );
}

export default App;
