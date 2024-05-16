import axios from "axios";

import { API_URL, authHeader } from "../Api";

export const getGroups = async () => {
  try {
    const response = await axios.get(`${API_URL}/groups`, {
      headers: authHeader(),
    });
    return response.data.data;
  } catch (error) {
    throw error.response.data.error;
  }
};

export const createGroup = async () => {
  try {
    const response = await axios.get(`${API_URL}/groups/create`, {
      headers: authHeader(),
    });
    return response.data.form;
  } catch (error) {
    throw error.response.form.error;
  }
};

export const storeGroup = async (groupData) => {
  try {
    const response = await axios.post(`${API_URL}/groups`, groupData, {
      headers: authHeader(),
    });
    return response.data;
  } catch (error) {
    throw error.response.data.errors;
  }
};

export const showGroup = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/groups/${id}`, {
      headers: authHeader(),
    });
    // console.log("response from showGroup", response.data.data);
    return response.data.data;
  } catch (error) {
    throw error.response.data.error;
  }
};

export const editGroup = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/groups/${id}/edit`, {
      headers: authHeader(),
    });
    return response.data.form;
  } catch (error) {
    throw error.response.form.error;
  }
};

export const updateGroup = async (id, groupData) => {
  try {
    const response = await axios.put(`${API_URL}/groups/${id}`, groupData, {
      headers: authHeader(),
    });
    return response.data;
  } catch (error) {
    throw error.response.data.errors;
  }
};

export const deleteGroup = async (id) => {
  try {
    await axios.delete(`${API_URL}/groups/${id}`, {
      headers: authHeader(),
    });
    return true;
  } catch (error) {
    throw error;
  }
};
