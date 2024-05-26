import axios from "axios";

import { API_URL, authHeader } from "../Api";

export const getDatalistActions = async () => {
  try {
    const response = await axios.get(`${API_URL}/datalist-action`, {
      headers: authHeader(),
    });
    return response.data.data;
  } catch (error) {
    throw error.response.data.error;
  }
};

export const createDatalistAction = async () => {
  try {
    const response = await axios.get(`${API_URL}/datalist-action/create`, {
      headers: authHeader(),
    });
    return response.data.form;
  } catch (error) {
    throw error.response.form.error;
  }
};

export const storeDatalistAction = async (datalistData) => {
  try {
    const response = await axios.post(
      `${API_URL}/datalist-action`,
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

export const showDatalistAction = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/datalist-action/${id}`, {
      headers: authHeader(),
    });
    return response.data.data;
  } catch (error) {
    throw error.response.data.error;
  }
};

export const editDatalistAction = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/datalist-action/${id}/edit`, {
      headers: authHeader(),
    });
    return response.data.form;
  } catch (error) {
    throw error.response.form.error;
  }
};

export const updateDatalistAction = async (id, datalistData) => {
  try {
    const response = await axios.put(
      `${API_URL}/datalist-action/${id}`,
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

export const updateDatalistActionOrder = async (id, datalistDataOrder) => {
  try {
    const response = await axios.put(
      `${API_URL}/datalist-action/order/${id}`,
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

export const deleteDatalistAction = async (id) => {
  try {
    await axios.delete(`${API_URL}/datalist-action/${id}`, {
      headers: authHeader(),
    });
    return true;
  } catch (error) {
    throw error;
  }
};
