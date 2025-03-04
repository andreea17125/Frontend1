import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './components/LoginComponent.css';
import { Alert, Snackbar } from '@mui/material';
import logo from '../Login/components/logoo.png';
import { useAuth } from '../../../context/LoginContext';
import { jwtDecode } from 'jwt-decode';


const Login = () => {
    const [open, setOpen] = useState(false);
    const [messages, setMessages] = useState('');
    const [email, setEmail] = useState('');
    const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "info" });

    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    //@ts-ignore
    const { login } = useAuth()

    const handleSubmit = async (event) => {
        event.preventDefault();
        console.log('Login Details:', { email, password });

        try {

            const token = await login(email, password)
            var decoded:{
                unique_name:string,
                role:string
            } = jwtDecode(token);
            const user = decoded
            if (!user) {
                setSnackbar({ open: true, message: "Invalid credentials", severity: "danger" });
                return;
            }
            if (user?.role === "admin") {
                navigate('/AdminHome');
            }
            else {
                navigate("/CustomerHome")
            }

        } catch (error) {
            console.error('Login failed:', error);
        }
    };

    return (
        <div className="login-container">
            <div className="background-ellipse top"></div>
            <div className="background-ellipse bottom"></div>

            <div className="content">

                <div className="title-container">
                    <h1 className="app-title">TerrainApp</h1>
                    <img src={logo} alt="TerrainApp Logo" className="app-logo" />
                </div>

                <form onSubmit={handleSubmit}>
                    <div className="input-group">
                        <label>Email</label>
                        <input
                            type="email"
                            placeholder="Input your email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>

                    <div className="input-group">
                        <label>Password</label>
                        <input
                            type="password"
                            placeholder="********"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <div className="forgot-password">
                            <a href="#">Forgot Password?</a>
                        </div>
                    </div>

                    <button type="submit" className="login-button">
                        Login
                    </button>
                </form>

                <p className="signup-text">
                    Don't have an account? <Link to="/">Sign up</Link>
                </p>
            </div>

            <div className="bottom-indicator"></div>
            <Snackbar open={snackbar.open} autoHideDuration={3000} onClose={() => setSnackbar(prev => ({ ...prev, open: false }))}>
                <Alert onClose={() => setSnackbar(prev => ({ ...prev, open: false }))} severity={snackbar.severity}>
                    {snackbar.message}
                </Alert>
            </Snackbar>
        </div>
    );
}

export default Login;
