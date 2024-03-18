import React, { useState } from "react";

import { Dropdown } from "react-bootstrap";

import { PieChart, Settings, User } from "react-feather";

import { useDispatch, useSelector } from "react-redux";

import { logout } from "../../repositories/api/services/authServices";
import {
  logoutStart,
  logoutSuccess,
  logoutFailure,
} from "../../redux/slices/authSlice";

import avatar1 from "../../assets/img/avatars/avatar.jpg";

const NavbarUser = () => {
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.auth.loading);
  const error = useSelector((state) => state.auth.error);

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
            src={avatar1}
            className="avatar img-fluid rounded-circle me-1"
            alt="Chris Wood"
          />
          <span className="text-dark">Chris Wood</span>
        </Dropdown.Toggle>
      </span>
      <Dropdown.Menu drop="end">
        <Dropdown.Item>
          <User size={18} className="align-middle me-2" />
          Profile
        </Dropdown.Item>
        <Dropdown.Item>
          <PieChart size={18} className="align-middle me-2" />
          Analytics
        </Dropdown.Item>
        <Dropdown.Divider />
        <Dropdown.Item>Settings & Privacy</Dropdown.Item>
        <Dropdown.Item>Help</Dropdown.Item>
        {/* <Dropdown.Item>Sign out</Dropdown.Item> */}
        <Dropdown.Item onClick={handleLogout}>Sign out</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default NavbarUser;
