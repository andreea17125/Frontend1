import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import './App.css'
import Authentification from './pages/Auth/Autentificare';
import Home from './pages/Auth/Home/components';
import Login from './pages/Auth/Login';

function App() {
  const [count, setCount] = useState(0)

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
