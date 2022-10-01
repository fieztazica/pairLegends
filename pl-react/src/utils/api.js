import axios from "axios";
const api = "api";

export function getToken() {
  return axios.get(api + "/authenticate", {
    withCredentials: true,
  });
}

export function register() {
  return axios.get(api + "/authenticate", {
    withCredentials: true,
  });
}

export function logout() {
  return axios.get(api + "/logout", {
    withCredentials: true,
  });
}
