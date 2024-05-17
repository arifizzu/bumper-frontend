import axios from "axios";

import { API_URL, authHeader } from "../Api";

export const storeFieldListValue = async (fieldId, fieldListValueData) => {
  try {
    const response = await axios.post(
      `${API_URL}/fields-values/${fieldId}`,
      fieldListValueData,
      {
        headers: authHeader(),
      }
    );
    return response.data;
  } catch (error) {
    throw error.response.data.errors;
  }
};

// export const updateFieldListValue = async (id, fieldListValueData) => {
//   try {
//     const response = await axios.put(
//       `${API_URL}/fields-values/individual${id}`,
//       fieldListValueData,
//       {
//         headers: authHeader(),
//       }
//     );
//     return response.data;
//   } catch (error) {
//     throw error.response.data.errors;
//   }
// };

export const deleteFieldListValue = async (fieldId) => {
  try {
    await axios.delete(`${API_URL}/fields-values/${fieldId}`, {
      headers: authHeader(),
    });
    return true;
  } catch (error) {
    throw error;
  }
};
