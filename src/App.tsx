import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Authentification from './pages/Auth/Autentificare';
import Home from './pages/Auth/Home/components';
import Login from './pages/Auth/Login';
import AdminHome from './pages/AdminHome';
import UsersRequest from "./pages/AdminHome/components/UsersRequest";
import ResetPassword from "./pages/Auth/ResetPassword";
import { CustomAuthProvider } from "./context/LoginContext";
import Logout from "./components/Logout";


function App() {
  return (
    <CustomAuthProvider>
      <Router>
      <Logout />
      <Routes>
       
        <Route path="/" element={<Authentification />} />
        <Route path="/AdminHome" element={<AdminHome />} />
        <Route path="/AdminHome/UsersRequest" element={<UsersRequest />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/CustomerHome" element={<Home />} />
        <Route path="/resetPassword/:pk" element={<ResetPassword />} />
      </Routes>
    </Router>
    
    </CustomAuthProvider>
      
    
  );
}

export default App;
