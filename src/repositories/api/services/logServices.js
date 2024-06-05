import axios from "axios";

import { API_URL, authHeader } from "../Api";

export const getUserLog = async () => {
  try {
    const response = await axios.get(`${API_URL}/users-log/showUserLog`, {
      headers: authHeader(),
    });
    return response.data.data;
  } catch (error) {
    throw error.response.data.error;
  }
};

export const getFormLog = async () => {
  try {
    const response = await axios.get(`${API_URL}/forms-log/showFormLog`, {
      headers: authHeader(),
    });
    return response.data.data;
  } catch (error) {
    throw error.response.data.error;
  }
};

export const insertFormLog = async (formLog) => {
  try {
    const response = await axios.post(
      `${API_URL}/forms-log/insertFormLog`,
      formLog,
      {
        headers: authHeader(),
      }
    );
    return response.data;
  } catch (error) {
    throw error.response.data.errors;
  }
};
