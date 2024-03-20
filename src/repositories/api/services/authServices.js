import axios from "axios";

import { API_URL, authHeader } from "../Api";

export const login = async (email, password) => {
  try {
    const response = await axios.post(API_URL + "/auth/login", {
      email,
      password,
    });
    // console.log(response);
    localStorage.setItem("user", JSON.stringify(response.data.user));
    localStorage.setItem("token", JSON.stringify(response.data.access_token));

    const expires_in = response.data.expires_in;
    const currentTime = Math.floor(Date.now() / 1000); // Current time in seconds
    const tokenExpiration = currentTime + expires_in; // Token expiration time
    localStorage.setItem("tokenExpiration", tokenExpiration);

    // console.log("tokenExpiration", tokenExpiration);
    // const token = JSON.parse(localStorage.getItem("token"));
    // console.log("token", token);
    return response.data;
  } catch (error) {
    throw error.response.data.error;
  }
};

export const logout = async () => {
  try {
    await axios.post(API_URL + "/auth/logout", {}, { headers: authHeader() });
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    return true;
  } catch (error) {
    throw error;
  }
};
