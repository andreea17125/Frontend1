import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Authentification from './pages/auth';
import Home from './pages/Home';
import Login from './pages/Login';

function App() {
return (
  <Router>

          <Routes>
            <Route path="/" element={<Authentification/>} />
            <Route path="/Home" element={<Home/>} />
            <Route path="/Login" element={<Login/>} />
            
          </Routes>
          
        </Router>
    
      
  )
}

export default App
