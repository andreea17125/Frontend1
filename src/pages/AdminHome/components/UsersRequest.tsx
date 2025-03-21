import { use, useEffect, useState } from 'react';
import axios from 'axios';
import '../components/UserRequest.css';
import { GetUserRegistrationRequestsResponse, UserRegistrationRequest } from '../../../modal';
import { useNavigate } from 'react-router';

const UsersRequest = () => {
    const [Pendingusers, setPendingUsers] = useState<UserRegistrationRequest[]>([]);
    const [Approvedusers, setApprovedUsers] = useState<UserRegistrationRequest[]>([]);
    const [Rejectedusers, setRejectedUsers] = useState<UserRegistrationRequest[]>([]);
    const [expandedUser, setExpandedUser] = useState<string | null>(null);

    useEffect(() => {
        fetchUsers();
    }, []);
    const navigate = useNavigate();

    const fetchUsers = async () => {
        try {
            const token = localStorage.getItem('accessToken');


            const response = await axios.get<GetUserRegistrationRequestsResponse>('https://localhost:7000/api/admin/GetUserRegistrationRequests',{
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setPendingUsers(response.data.pendings || []);
            setApprovedUsers(response.data.approved || []);
            setRejectedUsers(response.data.rejected || []);
        } catch (error) {
            console.error('Error fetching users:', error);
            setPendingUsers([]);
        }
    };

    const handleApprove = async (id: string) => {
        if (!id) return;
        try {
            await axios.put(`https://localhost:7000/api/admin/ApproveUserRegistrationRequest/${id}`);
            fetchUsers();
        } catch (error) {
            console.error('Error approving user:', error);
        }
    };

    const handleReject = async (id: string) => {
        if (!id) return;
        try {
            await axios.put(`https://localhost:7000/api/admin/RejectUserRegistrationRequest/${id}`);
            fetchUsers();
        } catch (error) {
            console.error('Error rejecting user:', error);
        }
    };

    const toggleDetails = (id: string) => {
        setExpandedUser(expandedUser === id ? null : id);
    };

    useEffect(() => {
        const token = localStorage.getItem('accessToken');
        if (!token) {
            navigate('/Login');
        }
    }, []);

    return (
        <div className="admin-container">
            <h1 className="admin-title">User Registration Requests</h1>
            <div className="user-container">

                <div className="user-list pending">
                    <h2>Pendings</h2>
                    {Pendingusers.map(user => (
                        <div 
                            key={user?.id || Math.random()} 
                            className={`user-card ${expandedUser === user.id ? 'expanded' : ''}`}
                            onClick={() => toggleDetails(user.id)}
                        >
                            <p className="username">{user?.username || "Unknown"}</p>
                            {expandedUser === user.id && (
                                <div className="user-details">
                                    <p><strong>Email:</strong> {user?.email || "Unknown"}</p>
                                    <p><strong>Location:</strong> {user?.location?.city || "Unknown"}, {user?.location?.country || "Unknown"}, {user?.location?.address || "Unknown"}</p>
                                    <div className="actions">
                                        <button onClick={() => handleApprove(user?.id)} className="approve-btn">Approve</button>
                                        <button onClick={() => handleReject(user?.id)} className="reject-btn">Reject</button>
                                    </div>
                                </div>
                            )}
                        </div>
                    ))}
                </div>

                <div className="user-list approved">
                    <h2>Approved</h2>
                    {Approvedusers.map(user => (
                        <div 
                            key={user?.id || Math.random()} 
                            className={`user-card ${expandedUser === user.id ? 'expanded' : ''}`}
                            onClick={() => toggleDetails(user.id)}
                        >
                            <p className="username">{user?.username || "Unknown"}</p>
                            {expandedUser === user.id && (
                                <div className="user-details">
                                    <p><strong>Email:</strong> {user?.email || "Unknown"}</p>
                                    <p><strong>Location:</strong> {user?.location?.city || "Unknown"}, {user?.location?.country || "Unknown"}, {user?.location?.address || "Unknown"}</p>
                                </div>
                            )}
                        </div>
                    ))}
                </div>

               
                <div className="user-list rejected">
                    <h2>Rejected</h2>
                    {Rejectedusers.map(user => (
                        <div 
                            key={user?.id || Math.random()} 
                            className={`user-card ${expandedUser === user.id ? 'expanded' : ''}`}
                            onClick={() => toggleDetails(user.id)}
                        >
                            <p className="username">{user?.username || "Unknown"}</p>
                            {expandedUser === user.id && (
                                <div className="user-details">
                                    <p><strong>Email:</strong> {user?.email || "Unknown"}</p>
                                    <p><strong>Location:</strong> {user?.location?.city || "Unknown"}, {user?.location?.country || "Unknown"}, {user?.location?.address || "Unknown"}</p>
                                </div>
                            )}
                        </div>
                    ))}
                </div>

            </div>
        </div>
    );
};

export default UsersRequest;
