import axios from "axios";

import { API_URL, authHeader } from "../Api";

export const getDatalists = async () => {
  try {
    const response = await axios.get(`${API_URL}/datalist`, {
      headers: authHeader(),
    });
    return response.data.data;
  } catch (error) {
    throw error.response.data.error;
  }
};

export const createDatalist = async () => {
  try {
    const response = await axios.get(`${API_URL}/datalist/create`, {
      headers: authHeader(),
    });
    return response.data.form;
  } catch (error) {
    throw error.response.form.error;
  }
};

export const storeDatalist = async (datalistData) => {
  try {
    const response = await axios.post(`${API_URL}/datalist`, datalistData, {
      headers: authHeader(),
    });
    return response.data;
  } catch (error) {
    throw error.response.data.errors;
  }
};

export const showDatalist = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/datalist/${id}`, {
      headers: authHeader(),
    });
    return response.data.data;
  } catch (error) {
    throw error.response.data.error;
  }
};

export const editDatalist = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/datalist/${id}/edit`, {
      headers: authHeader(),
    });
    return response.data.form;
  } catch (error) {
    throw error.response.form.error;
  }
};

export const updateDatalist = async (id, datalistData) => {
  try {
    const response = await axios.put(
      `${API_URL}/datalist/${id}`,
      datalistData,
      {
        headers: authHeader(),
      }
    );
    return response.data;
  } catch (error) {
    throw error.response.data.errors;
  }
};

export const deleteDatalist = async (id) => {
  try {
    await axios.delete(`${API_URL}/datalist/${id}`, {
      headers: authHeader(),
    });
    return true;
  } catch (error) {
    throw error;
  }
};

export const retrieveDataFromDatabase = async (dataInformation) => {
  try {
    const response = await axios.post(
      `${API_URL}/datalist/retrieveData`,
      dataInformation,
      {
        headers: authHeader(),
      }
    );
    return response.data;
  } catch (error) {
    throw error.response.data.errors;
  }
};
