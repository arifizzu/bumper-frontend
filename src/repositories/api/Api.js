import appConfig from "../../config";

export const API_URL = appConfig.apiHostname;

export function authHeader() {
  const token = JSON.parse(localStorage.getItem("token"));
  // console.log(token);

  if (token) {
    return { Authorization: "Bearer " + token };
  } else {
    return null;
  }
}
