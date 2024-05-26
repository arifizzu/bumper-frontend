import axios from "axios";

import { API_URL, authHeader } from "../Api";

export const getDatalistColumns = async () => {
  try {
    const response = await axios.get(`${API_URL}/datalist-item`, {
      headers: authHeader(),
    });
    return response.data.data;
  } catch (error) {
    throw error.response.data.error;
  }
};

export const createDatalistColumn = async () => {
  try {
    const response = await axios.get(`${API_URL}/datalist-item/create`, {
      headers: authHeader(),
    });
    return response.data.form;
  } catch (error) {
    throw error.response.form.error;
  }
};

export const storeDatalistColumn = async (datalistData) => {
  try {
    const response = await axios.post(
      `${API_URL}/datalist-item`,
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

export const showDatalistColumn = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/datalist-item/${id}`, {
      headers: authHeader(),
    });
    return response.data.data;
  } catch (error) {
    throw error.response.data.error;
  }
};

export const editDatalistColumn = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/datalist-item/${id}/edit`, {
      headers: authHeader(),
    });
    return response.data.form;
  } catch (error) {
    throw error.response.form.error;
  }
};

export const updateDatalistColumn = async (id, datalistData) => {
  try {
    const response = await axios.put(
      `${API_URL}/datalist-item/${id}`,
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

export const updateDatalistColumnOrder = async (id, datalistDataOrder) => {
  try {
    const response = await axios.put(
      `${API_URL}/datalist-item/order/${id}`,
      datalistDataOrder,
      {
        headers: authHeader(),
      }
    );
    return response.data;
  } catch (error) {
    throw error.response.data.errors;
  }
};

export const deleteDatalistColumn = async (id) => {
  try {
    await axios.delete(`${API_URL}/datalist-item/${id}`, {
      headers: authHeader(),
    });
    return true;
  } catch (error) {
    throw error;
  }
};
