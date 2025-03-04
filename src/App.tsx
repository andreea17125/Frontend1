import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import './App.css'
import Authentification from './pages/Auth/Autentificare';
import Home from './pages/Auth/Home/components';
import Login from './pages/Auth/Login';
import AdminHome from './pages/AdminHome';
import { CustomAuthProvider } from './context/LoginContext';
import ResetPassword from './pages/Auth/ResetPassword';

function App() {

  return (
    <CustomAuthProvider>
      <Router>
        <Routes>
          <Route path='/resetPassword/:pk' element={<ResetPassword/>}/>
          <Route path="/" element={<Authentification />} />
          <Route path="/AdminHome" element={<AdminHome />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/CustomerHome" element={<Home />} />
        </Routes>
      </Router>
    </CustomAuthProvider>

  )
}

export default App
