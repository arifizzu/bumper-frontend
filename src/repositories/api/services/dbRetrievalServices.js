import axios from "axios";

import { API_URL, authHeader } from "../Api";

export const getTables = async () => {
  try {
    const response = await axios.get(`${API_URL}/database/tables`, {
      headers: authHeader(),
    });
    return response.data.data;
  } catch (error) {
    throw error.response.data.error;
  }
};

export const getColumns = async (tableName) => {
  try {
    // const response = await axios.get(`${API_URL}/database/columns`, tableName, {
    //   headers: authHeader(),
    // });
    const response = await axios.get(`${API_URL}/database/columns`, {
      params: { tableName }, // Pass tableName as a query parameter
      headers: authHeader(),
    });
    return response.data.data;
  } catch (error) {
    throw error.response.data.error;
  }
};
