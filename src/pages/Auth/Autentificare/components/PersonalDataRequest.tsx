import React, { useEffect, useState, useRef } from "react";
import { Briefcase, Lock, Mail, User } from "lucide-react";
import axios from "axios";
import "./SignUpComponent.css";

const PersonalDataRequest = ({ handleChange }) => {
  const [roles, setRoles] = useState([]);
  const [selectedRole, setSelectedRole] = useState("");
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const fetchRoles = async () => {
      try {
        const response = await axios.get("https://localhost:7000/api/User/GetAvailableRoles");
        setRoles(response.data?.availableRoles || []);
      } catch (error) {
        console.error("Error fetching roles:", error);
      }
    };
    fetchRoles();
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleRoleChange = (role) => {
    setSelectedRole(role);
    handleChange("role", role);
    setOpen(false);
  };

  return (
    <div className="form-container">
    <div className="form-group">
      <label>Email</label>
      <div className="input-container">
        <Mail className="icon" />
        <input onChange={(e) => handleChange("email", e.target.value)} type="email" placeholder="Input your email" />
      </div>
    </div>

    <div className="form-group">
      <label>Username</label>
      <div className="input-container">
        <User className="icon" />
        <input onChange={(e) => handleChange("username", e.target.value)} type="text" placeholder="Input your username" />
      </div>
    </div>

    <div className="form-group" ref={dropdownRef} style={{ position: "relative" }}>
      <label>Role</label>
      <div className="input-container" onClick={() => setOpen(!open)}>
        <Briefcase className="icon" />
        <input type="text" value={selectedRole} readOnly placeholder="Select your role" />
      </div>
      {open && (
        <div className="dropdown-menu">
          {roles.length > 0 ? (
            roles.map((role, index) => (
              <div key={index} className="dropdown-item" onClick={() => handleRoleChange(role.name)}>
                {role.name}
              </div>
            ))
          ) : (
            <div className="dropdown-item disabled">No roles available</div>
          )}
        </div>
      )}
    </div>

    <div className="form-group">
      <label>Password</label>
      <div className="input-container">
        <Lock className="icon" />
        <input onChange={(e) => handleChange("password", e.target.value)} type="password" placeholder="********" />
      </div>
    </div>

    <div className="form-group">
      <label>Confirm Password</label>
      <div className="input-container">
        <Lock className="icon" />
        <input onChange={(e) => handleChange("confirmpassword", e.target.value)} type="password" placeholder="********" />
      </div>
    </div>
  </div>
);
};

export default PersonalDataRequest;
