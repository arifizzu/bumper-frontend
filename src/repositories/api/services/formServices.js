import axios from "axios";

import { API_URL, authHeader } from "../Api";

export const getForms = async () => {
  try {
    const response = await axios.get(`${API_URL}/forms`, {
      headers: authHeader(),
    });
    return response.data.data;
  } catch (error) {
    throw error.response.data.error;
  }
};

export const createForm = async () => {
  try {
    const response = await axios.get(`${API_URL}/forms/create`, {
      headers: authHeader(),
    });
    return response.data.form;
  } catch (error) {
    throw error.response.form.error;
  }
};

export const storeForm = async (formData) => {
  try {
    const response = await axios.post(`${API_URL}/forms`, formData, {
      headers: authHeader(),
    });
    return response.data;
  } catch (error) {
    throw error.response.data.errors;
  }
};

export const showForm = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/forms/${id}`, {
      headers: authHeader(),
    });
    // console.log("response from showForm", response.data.data);
    return response.data.data;
  } catch (error) {
    throw error.response.data.error;
  }
};

export const editForm = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/forms/${id}/edit`, {
      headers: authHeader(),
    });
    return response.data.form;
  } catch (error) {
    throw error.response.form.error;
  }
};

export const updateForm = async (id, formData) => {
  try {
    const response = await axios.put(`${API_URL}/forms/${id}`, formData, {
      headers: authHeader(),
    });
    return response.data;
  } catch (error) {
    throw error.response.data.errors;
  }
};

export const deleteForm = async (id) => {
  try {
    await axios.delete(`${API_URL}/forms/${id}`, {
      headers: authHeader(),
    });
    return true;
  } catch (error) {
    throw error;
  }
};
