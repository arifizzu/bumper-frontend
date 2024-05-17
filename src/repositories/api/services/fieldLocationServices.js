import axios from "axios";

import { API_URL, authHeader } from "../Api";

export const updateFieldLocation = async (fieldLocationData) => {
  try {
    const response = await axios.put(
      `${API_URL}/fields-locations/update`,
      fieldLocationData,
      {
        headers: authHeader(),
      }
    );
    return response.data;
  } catch (error) {
    throw error.response.data.errors;
  }
};
