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
    </Routes>
    </BrowserRouter>
  );
}

export default App;
