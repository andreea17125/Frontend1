import { useEffect, useState } from 'react';
import axios from 'axios';
import '../components/UserRequest.css';

const UsersRequest = () => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            const response = await axios.get('http://localhost:7000/api/admin/GetUserRegistrationRequest');
            setUsers(response.data || []);
        } catch (error) {
            console.error('Error fetching users:', error);
            setUsers([]);
        }
    };

    const handleApprove = async (id) => {
        if (!id) {
            console.error("ID is undefined, cannot approve.");
            return;
        }
        try {
            await axios.put(`http://localhost:7000/api/admin/ApproveUserRegistrationRequest/${id}`);
            fetchUsers();
        } catch (error) {
            console.error('Error approving user:', error);
        }
    };

    const handleReject = async (id) => {
        if (!id) {
            console.error("ID is undefined, cannot reject.");
            return;
        }
        try {
            await axios.put(`http://localhost:7000/api/admin/RejectUserRegistrationRequest/${id}`);
            fetchUsers();
        } catch (error) {
            console.error('Error rejecting user:', error);
        }
    };

    return (
        <div className="admin-container">
            <h1 className="admin-title">User Registration Requests</h1>
            <div className="user-list">
                {users?.length > 0 ? (
                    users.map(user => (
                        <div key={user?.id || Math.random()} className="user-card">
                            <p><strong>Name:</strong> {user?.name || "Unknown"}</p>
                            <p><strong>Email:</strong> {user?.email || "Unknown"}</p>
                            <p><strong>Status:</strong> 
                                <span className={`status ${user?.status?.toLowerCase() || "unknown"}`}>
                                    {user?.status || "Unknown"}
                                </span>
                            </p>
                            {user?.status === 'Pending' && (
                                <div className="actions">
                                    <button className="approve-btn" onClick={() => handleApprove(user?.id)}>Approve</button>
                                    <button className="reject-btn" onClick={() => handleReject(user?.id)}>Reject</button>
                                </div>
                            )}
                        </div>
                    ))
                ) : (
                    <p>No registration requests found.</p>
                )}
            </div>
        </div>
    );
};

export default UsersRequest;