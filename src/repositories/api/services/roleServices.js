import axios from "axios";

import { API_URL, authHeader } from "../Api";

export const getRoles = async () => {
  try {
    const response = await axios.get(`${API_URL}/roles`, {
      headers: authHeader(),
    });
    return response.data.data;
  } catch (error) {
    throw error.response.data.error;
  }
};

export const createRole = async () => {
  try {
    const response = await axios.get(`${API_URL}/roles/create`, {
      headers: authHeader(),
    });
    return response.data.form;
  } catch (error) {
    throw error.response.form.error;
  }
};

export const storeRole = async (roleData) => {
  try {
    const response = await axios.post(`${API_URL}/roles`, roleData, {
      headers: authHeader(),
    });
    return response.data;
  } catch (error) {
    throw error.response.data.errors;
  }
};

export const showRole = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/roles/${id}`, {
      headers: authHeader(),
    });
    // console.log("response from showUser", response.data.data);
    return response.data.data;
  } catch (error) {
    throw error.response.data.error;
  }
};

export const editRole = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/roles/${id}/edit`, {
      headers: authHeader(),
    });
    return response.data.form;
  } catch (error) {
    throw error.response.form.error;
  }
};

export const updateRole = async (id, roleData) => {
  try {
    const response = await axios.put(`${API_URL}/roles/${id}`, roleData, {
      headers: authHeader(),
    });
    return response.data;
  } catch (error) {
    throw error.response.data.errors;
  }
};

export const deleteRole = async (id) => {
  try {
    await axios.delete(`${API_URL}/roles/${id}`, {
      headers: authHeader(),
    });
    return true;
  } catch (error) {
    throw error;
  }
};
