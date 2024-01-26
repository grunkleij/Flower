import logo from './logo.svg';
import './App.css';
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import NavBar from './components/NavBar/NavBar';
import Signup from './components/Signup/Signup';
import Home from './components/Home/Home';
import Login from './components/Login/Login';
import Admin from './components/Admin/Admin';
import FlowerAdmin from './components/Admin/FlowerAdmin/FlowerAdmin';
import EmpSignup from './components/Signup/EmpSingup/EmpSginup';


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
    </Routes>
    </BrowserRouter>
  );
}

export default App;
