import axios from "axios";

import { API_URL, authHeader } from "../Api";

export const getProcesses = async () => {
  try {
    const response = await axios.get(`${API_URL}/processes`, {
      headers: authHeader(),
    });
    return response.data.data;
  } catch (error) {
    throw error.response.data.error;
  }
};

export const createProcess = async () => {
  try {
    const response = await axios.get(`${API_URL}/processes/create`, {
      headers: authHeader(),
    });
    return response.data.form;
  } catch (error) {
    throw error.response.form.error;
  }
};

export const storeProcess = async (processData) => {
  try {
    const response = await axios.post(`${API_URL}/processes`, processData, {
      headers: authHeader(),
    });
    return response.data;
  } catch (error) {
    throw error.response.data.errors;
  }
};

export const showProcess = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/processes/${id}`, {
      headers: authHeader(),
    });
    // console.log("response from showForm", response.data.data);
    return response.data.data;
  } catch (error) {
    throw error.response.data.error;
  }
};

export const editProcess = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/processes/${id}/edit`, {
      headers: authHeader(),
    });
    return response.data.form;
  } catch (error) {
    throw error.response.form.error;
  }
};

export const updateProcess = async (id, processData) => {
  try {
    const response = await axios.put(
      `${API_URL}/processes/${id}`,
      processData,
      {
        headers: authHeader(),
      }
    );
    return response.data;
  } catch (error) {
    throw error.response.data.errors;
  }
};

export const deleteProcess = async (id) => {
  try {
    await axios.delete(`${API_URL}/processes/${id}`, {
      headers: authHeader(),
    });
    return true;
  } catch (error) {
    throw error;
  }
};
