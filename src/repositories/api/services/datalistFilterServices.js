import axios from "axios";

import { API_URL, authHeader } from "../Api";

export const getDatalistFilters = async () => {
  try {
    const response = await axios.get(`${API_URL}/datalist-filter`, {
      headers: authHeader(),
    });
    return response.data.data;
  } catch (error) {
    throw error.response.data.error;
  }
};

export const createDatalistFilter = async () => {
  try {
    const response = await axios.get(`${API_URL}/datalist-filter/create`, {
      headers: authHeader(),
    });
    return response.data.form;
  } catch (error) {
    throw error.response.form.error;
  }
};

export const storeDatalistFilter = async (datalistData) => {
  try {
    const response = await axios.post(
      `${API_URL}/datalist-filter`,
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

export const showDatalistFilter = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/datalist-filter/${id}`, {
      headers: authHeader(),
    });
    return response.data.data;
  } catch (error) {
    throw error.response.data.error;
  }
};

export const editDatalistFilter = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/datalist-filter/${id}/edit`, {
      headers: authHeader(),
    });
    return response.data.form;
  } catch (error) {
    throw error.response.form.error;
  }
};

export const updateDatalistFilter = async (id, datalistData) => {
  try {
    const response = await axios.put(
      `${API_URL}/datalist-filter/${id}`,
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

export const deleteDatalistFilter = async (id) => {
  try {
    await axios.delete(`${API_URL}/datalist-filter/${id}`, {
      headers: authHeader(),
    });
    return true;
  } catch (error) {
    throw error;
  }
};
