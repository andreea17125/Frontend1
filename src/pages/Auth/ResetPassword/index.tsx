import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import "./resetpassword.css"; 

const ResetPassword = () => {
    const [valid, setValid] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(true);
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");
    const { pk } = useParams();

    const handleUniqueResetCodeCheck = async () => {
        try {
            const res = await axios.get(`https://localhost:7000/ValidateUniqueResetPasswordCode/${pk}`);
            if (res.data.statusCode === 200) {
                setValid(true);
            } else {
                setValid(false);
            }
        } catch (error) {
            console.error("Error validating reset code:", error);
            setValid(false);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        handleUniqueResetCodeCheck();
    }, [pk]);

    const handleReset = async (e: React.FormEvent) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            setError("Passwords do not match!");
            return;
        }
        setError("");

        try {
            await axios.post("https://localhost:7000/ResetPassword", { pk, newPassword: password });
            alert("Password reset successfully!");
        } catch (err) {
            console.error("Error resetting password:", err);
            setError("Something went wrong. Try again.");
        }
    };

    if (loading) {
        return <p>Loading...</p>;
    }

    if (!valid) {
        return <p className="error-message">N-AI VOIE!</p>;
    }

    return (
        <div className="container">
            <h2>Reset Your Password</h2>
            <form onSubmit={handleReset}>
                <div className="form-group">
                    <label>New Password</label>
                    <input 
                        type="password" 
                        placeholder="Enter new password..." 
                        value={password} 
                        onChange={(e) => setPassword(e.target.value)} 
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Repeat Password</label>
                    <input 
                        type="password" 
                        placeholder="Repeat new password..." 
                        value={confirmPassword} 
                        onChange={(e) => setConfirmPassword(e.target.value)} 
                        required
                    />
                </div>
                {error && <p className="error-message">{error}</p>}
                <button type="submit">Reset Password</button>
            </form>
        </div>
    );
};

export default ResetPassword;
