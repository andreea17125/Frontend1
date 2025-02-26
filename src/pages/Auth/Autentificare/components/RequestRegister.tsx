import React, {  useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Snackbar, Alert } from '@mui/material';
import './RequestRegister.css';
import PersonalDataRequest from './PersonalDataRequest';
import LocationDataRequest from './LocationDataRequest';
import { CheckCircle, XCircle } from 'lucide-react';
import logo from '../../../../assets/logoo.png';

const Register = () => {
    const [formData, setFormData] = useState({
        email: "",
        password: "",
        username: "",
        location: {
            country: "",
            city: "",
            address: "",
            postalCode: "",
        }
    });

    const handleLocationChange = (name, value) => {
        setFormData(prev => ({
            ...prev,
            location: { ...prev.location, [name]: value }
        }));
    };

    const [step, setStep] = useState(1);
    const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "info" });
    const navigate = useNavigate();

    const handleChange = (name, value) => {
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('https://localhost:7000/api/User/RequestRegister', formData);
            if (response.data.statusCode === 201) {
                setSnackbar({ open: true, message: "Registration successful!", severity: "success" });
            } else {
                setSnackbar({ open: true, message: "Registration failed!", severity: "error" });
            }
        } catch (error) {
            setSnackbar({ open: true, message: "Error submitting request!", severity: "error" });
        }
    };

    const handleCloseSnackbar = () => {
        setSnackbar({ ...snackbar, open: false });
    };

    return (
        <div className="signup-container">
            <Snackbar open={snackbar.open} autoHideDuration={4000} onClose={handleCloseSnackbar}>
                <Alert
                    onClose={handleCloseSnackbar}
                    severity={snackbar.severity}
                    icon={snackbar.severity === "success"
                        ? <CheckCircle style={{ color: "white", marginRight: 8 }} />
                        : <XCircle style={{ color: "white", marginRight: 8 }} />}
                    sx={{
                        width: "100%",
                        backgroundColor: snackbar.severity === 'success' ? '#6ECA96' : '#FF6B6B',
                        color: 'white'
                    }}
                >
                    {snackbar.message}
                </Alert>
            </Snackbar>

            <div className="ellipse-top"></div>
            <div className="ellipse-bottom"></div>

            <div className="content">
               
                <div className="title-container">
                <h1 className="app-title">TerrainApp</h1>
                <img src={logo} alt="TerrainApp Logo" className="app-logo" />
                </div>

                <form onSubmit={handleSubmit}>
                    {step === 1 ? <PersonalDataRequest handleChange={handleChange} /> : <LocationDataRequest handleLocationChange={handleLocationChange} />}

                    <div className="button-group">
                        {step === 2 && (
                            <button type="submit" className="signup-button">
                                Request
                            </button>
                        )}

                        {step === 2 && (
                            <button type="button" onClick={() => setStep(1)} className="signup-button back-button">
                                Back
                            </button>
                        )}

                        {step === 1 && (
                            <button type="button" onClick={() => setStep(2)} className="signup-button">
                                Next
                            </button>
                        )}
                    </div>

                    {step === 1 && (
                        <p className="login-link">
                            Already have an account? <Link to="/Login">Login</Link>
                        </p>
                    )}
                </form>

                <div className="bottom-indicator"></div>
            </div>
        </div>
    );
}

export default Register;
