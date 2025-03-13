import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Authentification from './pages/Auth/Autentificare';
import Home from './pages/Auth/Home/components';
import Login from './pages/Auth/Login';
import AdminHome from './pages/AdminHome';
import UsersRequest from "./pages/AdminHome/components/UsersRequest";


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Authentification />} />
        <Route path="/AdminHome" element={<AdminHome />} />
        <Route path="/AdminHome/UsersRequest" element={<UsersRequest />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/CustomerHome" element={<Home />} />
      </Routes>
    </Router>
  );
}

export default App;
