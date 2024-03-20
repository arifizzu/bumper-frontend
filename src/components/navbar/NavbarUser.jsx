import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import { Dropdown } from "react-bootstrap";

import { PieChart, Settings, User, LogOut } from "react-feather";

import { useDispatch, useSelector } from "react-redux";

import { logout } from "../../repositories/api/services/authServices";
import {
  logoutStart,
  logoutSuccess,
  logoutFailure,
} from "../../redux/slices/authSlice";

import avatar1 from "../../assets/img/avatars/avatar.jpg";
import defaultUser from "../../assets/img/avatars/default-user.png";

const NavbarUser = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const loading = useSelector((state) => state.auth.loading);
  const error = useSelector((state) => state.auth.error);
  const user = JSON.parse(localStorage.getItem("user"));
  // console.log("user in navbar", user);

  const handleLogout = async () => {
    try {
      dispatch(logoutStart());
      await logout();
      dispatch(logoutSuccess());
      window.location.href = "/auth/sign-in";
    } catch (error) {
      dispatch(logoutFailure(error));
      console.error("Logout failed:", error);
    }
  };

  const handleViewProfile = async (id) => {
    try {
      navigate(`/users/view/${id}`);
    } catch (error) {
      console.error("View failed:", error);
    }
  };

  return (
    <Dropdown className="nav-item" align="end">
      <span className="d-inline-block d-sm-none">
        <Dropdown.Toggle as="a" className="nav-link">
          <Settings size={18} className="align-middle" />
        </Dropdown.Toggle>
      </span>
      <span className="d-none d-sm-inline-block">
        <Dropdown.Toggle as="a" className="nav-link">
          <img
            // src={avatar1}
            src={defaultUser}
            className="avatar img-fluid rounded-circle me-1"
            alt="Chris Wood"
          />
          {/* <span className="text-dark">Chris Wood</span> */}
          <span className="text-dark">{user ? user.name : "Loading..."}</span>
        </Dropdown.Toggle>
      </span>
      <Dropdown.Menu drop="end">
        <div
          onClick={() => handleViewProfile(user.id)} // Pass id inside an arrow function
          className="dropdown-item-wrapper"
        >
          <Dropdown.Item>
            <User size={18} className="align-middle me-2" />
            Profile
          </Dropdown.Item>
        </div>
        {/* <Dropdown.Item>
          <PieChart size={18} className="align-middle me-2" />
          Analytics
        </Dropdown.Item>
        <Dropdown.Divider />
        <Dropdown.Item>Settings & Privacy</Dropdown.Item>
        <Dropdown.Item>Help</Dropdown.Item> */}
        <div onClick={handleLogout} className="dropdown-item-wrapper">
          <Dropdown.Item>
            <LogOut size={18} className="align-middle me-2" />
            Sign out
          </Dropdown.Item>
        </div>
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default NavbarUser;
