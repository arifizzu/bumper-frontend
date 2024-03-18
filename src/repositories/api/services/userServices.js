import axios from "axios";

import { API_URL, authHeader } from "../Api";

export const getUsers = async () => {
  try {
    const response = await axios.get(`${API_URL}/users`, {
      headers: authHeader(),
    });
    const token = JSON.parse(localStorage.getItem("token"));
    // console.log("token from userServices", token);
    // console.log("response from userServices", response);
    return response.data;
  } catch (error) {
    throw error.response.data.error;
  }
};

export const createUser = async () => {
  try {
    const response = await axios.get(`${API_URL}/users/create`, {
      headers: authHeader(),
    });
    return response.form;
  } catch (error) {
    throw error.response.form.error;
  }
};

export const storeUser = async (id, userData) => {
  return await axios.post(`${API_URL}/users`, userData);
};

export const showUser = async (id) => {
  return await axios.get(`${API_URL}/users/${id}`);
};

export const editUser = async (id, userData) => {
  return await axios.get(`${API_URL}/users/${id}/edit`);
};

export const updateUser = async (id, userData) => {
  return await axios.put(`${API_URL}/users/${id}`, userData);
};

export const deleteUser = async (id) => {
  try {
    await axios.delete(`${API_URL}/users/${id}`, {
      headers: authHeader(),
    });
    return true;
  } catch (error) {
    throw error;
  }
};
