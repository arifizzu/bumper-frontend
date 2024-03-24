import axios from "axios";

import { API_URL, authHeader } from "../Api";

export const getFields = async (formId) => {
  try {
    const response = await axios.get(`${API_URL}/fields/${formId}`, {
      headers: authHeader(),
    });
    return response.data.data;
  } catch (error) {
    throw error.response.data.error;
  }
};

export const createField = async (formId) => {
  try {
    const response = await axios.get(`${API_URL}/fields/${formId}/create`, {
      headers: authHeader(),
    });
    return response.data.form;
  } catch (error) {
    throw error.response.form.error;
  }
};

export const storeField = async (fieldData) => {
  try {
    const response = await axios.post(`${API_URL}/fields`, fieldData, {
      headers: authHeader(),
    });
    return response.data;
  } catch (error) {
    throw error.response.data.errors;
  }
};

export const showField = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/fields/individual/${id}`, {
      headers: authHeader(),
    });
    // console.log("response from showForm", response.data.data);
    return response.data.data;
  } catch (error) {
    throw error.response.data.error;
  }
};

export const editField = async (id) => {
  try {
    const response = await axios.get(
      `${API_URL}/fields/individual/${id}/edit`,
      {
        headers: authHeader(),
      }
    );
    return response.data.form;
  } catch (error) {
    throw error.response.form.error;
  }
};

export const updateField = async (id, fieldData) => {
  try {
    const response = await axios.put(
      `${API_URL}/fields/individual/${id}`,
      fieldData,
      {
        headers: authHeader(),
      }
    );
    return response.data;
  } catch (error) {
    throw error.response.data.errors;
  }
};

export const deleteField = async (id) => {
  try {
    await axios.delete(`${API_URL}/fields/individual/${id}`, {
      headers: authHeader(),
    });
    return true;
  } catch (error) {
    throw error;
  }
};

export const showAllFieldTypes = async () => {
  try {
    const response = await axios.get(`${API_URL}/fields-types`, {
      headers: authHeader(),
    });
    return response.data.data;
  } catch (error) {
    throw error.response.data.error;
  }
};
