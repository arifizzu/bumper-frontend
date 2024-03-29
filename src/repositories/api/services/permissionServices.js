import axios from "axios";

import { API_URL, authHeader } from "../Api";

export const getPermissions = async () => {
  try {
    const response = await axios.get(`${API_URL}/permissions`, {
      headers: authHeader(),
    });
    return response.data.data;
  } catch (error) {
    throw error.response.data.error;
  }
};

export const createPermission = async () => {
  try {
    const response = await axios.get(`${API_URL}/permissions/create`, {
      headers: authHeader(),
    });
    return response.data.form;
  } catch (error) {
    throw error.response.form.error;
  }
};

export const storePermission = async (permissionData) => {
  try {
    const response = await axios.post(
      `${API_URL}/permissions`,
      permissionData,
      {
        headers: authHeader(),
      }
    );
    return response.data;
  } catch (error) {
    throw error.response.data.errors;
  }
};

export const showPermission = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/permissions/${id}`, {
      headers: authHeader(),
    });
    return response.data.data;
  } catch (error) {
    throw error.response.data.error;
  }
};

export const editPermission = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/permissions/${id}/edit`, {
      headers: authHeader(),
    });
    return response.data.form;
  } catch (error) {
    throw error.response.form.error;
  }
};

export const updatePermission = async (id, permissionData) => {
  try {
    const response = await axios.put(
      `${API_URL}/permissions/${id}`,
      permissionData,
      {
        headers: authHeader(),
      }
    );
    return response.data;
  } catch (error) {
    throw error.response.data.errors;
  }
};

export const deletePermission = async (id) => {
  try {
    await axios.delete(`${API_URL}/permissions/${id}`, {
      headers: authHeader(),
    });
    return true;
  } catch (error) {
    throw error;
  }
};
