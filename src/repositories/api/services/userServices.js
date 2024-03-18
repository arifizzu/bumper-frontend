import axios from "axios";

import { API_URL, authHeader } from "../Api";

export const getUsers = async () => {
  try {
    const response = await axios.get(`${API_URL}/users`, {
      headers: authHeader(),
    });
    // const token = JSON.parse(localStorage.getItem("token"));
    // console.log("token from userServices", token);
    console.log("response from userServices", response.data.data);
    return response.data.data;
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
  try {
    const response = await axios.post(`${API_URL}/users`, userData, {
      headers: authHeader(),
    });
    return response.data;
  } catch (error) {
    throw error.response.data.error;
  }
};

export const showUser = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/users/${id}`, {
      headers: authHeader(),
    });
    return response.data;
  } catch (error) {
    throw error.response.data.error;
  }
};

export const editUser = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/users/${id}/edit`, {
      headers: authHeader(),
    });
    return response.form;
  } catch (error) {
    throw error.response.form.error;
  }
};

export const updateUser = async (id, userData) => {
  try {
    const response = await axios.put(`${API_URL}/users/${id}`, userData, {
      headers: authHeader(),
    });
    return response.data;
  } catch (error) {
    throw error.response.data.error;
  }
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
