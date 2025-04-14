import { BrowserRouter as Router, Route, Routes, useLocation } from "react-router-dom";
import Authentification from './pages/Auth/Autentificare';
import Home from './pages/Auth/Home/components';
import Login from './pages/Auth/Login';
import AdminHome from './pages/AdminHome';
import UsersRequest from "./pages/AdminHome/components/UsersRequest";
import ResetPassword from "./pages/Auth/ResetPassword";
import { CustomAuthProvider } from "./context/LoginContext";
import Logout from "./components/Logout";
import AdminImport from "./pages/AdminHome/AdminImport";
import LeafletMap from "./pages/Map/map"; // Import the LeafletMap component
import PropertyForm from './pages/Form/PropertyForm'; // Import the PropertyForm component

// Create a wrapper component to conditionally render Logout
const LogoutWrapper = () => {
  const location = useLocation();
  const isAuthPage = location.pathname === '/' || location.pathname === '/Login' || location.pathname.includes('/resetPassword');
  
  return !isAuthPage ? <Logout /> : null;
};

function App() {
  return (
    <CustomAuthProvider>
      <Router>
        <LogoutWrapper />
        <Routes>
          <Route path="/" element={<Authentification />} />
          <Route path="/AdminHome" element={<AdminHome />} />
          <Route path="/AdminHome/UsersRequest" element={<UsersRequest />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/CustomerHome" element={<Home />} />
          <Route path="/resetPassword/:pk" element={<ResetPassword />} />
          <Route path="/AdminHome/AdminImport" element={<AdminImport />} />
          <Route path="/map" element={<LeafletMap />} />
          <Route path="/LeafletMap" element={<LeafletMap />} /> 
          <Route path="/PropertyForm" element={<PropertyForm />} /> 
        </Routes>
      </Router>
    </CustomAuthProvider>
  );
}

export default App;
