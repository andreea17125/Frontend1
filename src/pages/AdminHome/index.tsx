import React from 'react';
import UsersRequest from './components/UsersRequest.tsx'; 
import './components/UserRequest.css'; 

const AdminHome = () => {
  return (
    <div className="admin-container">
      <h1>Admin Dashboard</h1>
      <UsersRequest /> {}
    </div>
  );
};

export default AdminHome;
