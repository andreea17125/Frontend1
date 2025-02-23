import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './RequestRegister.css'
import PersonalDataRequest from './PersonalDataRequest';
import LocationDataRequest from './LocationDataRequest';

const Register = () => {

    const navigate = useNavigate()
    useEffect(()=>{

        const access = localStorage.getItem("accessToken")
        if(access)
        {
            navigate("/Home")
        }
    },[])
    const [formData, setFormData] = useState(
        {
            email: "",
            password: "",
            username: "",
            location: {
                country: "",
                city: "",
                address: "",
                postalCode: "",
               
            }

        }

    )

    const handleLocationChange = (name:string,value:string|number) => {
        setFormData((prev)=>({
            ...prev, 
            location:{...prev.location,[name]:value}
           }))
    
    };

    const [step, setStep] = useState(1);

    const handleChange = (name:string,value:string|number) => {
        setFormData((prev) => ({
            ...prev,
            [name]: value
        }))
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await axios.post('https://localhost:7000/api/User/RequestRegister', formData);
        console.log("response", response);
        if (response.data.statusCode === 201) {
           // navigate('/Login');
        }
    };

   
    return (
        <div className="signup-container">
            <div className="ellipse-top"></div>
            <div className="ellipse-bottom"></div>

            <div className="content">
                <h1 className="app-title">TerrainApp</h1>

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
