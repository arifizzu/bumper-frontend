export const API_URL = "http://bumper-backend.test/api";

export function authHeader() {
  const token = JSON.parse(localStorage.getItem("token"));
  // console.log(token);

  if (token) {
    return { Authorization: "Bearer " + token };
  } else {
    return null;
  }
}
