import axios from "axios";
const BASE_URL_API = "http://localhost:4000/";

export const apiCall = axios.create({
  baseURL: BASE_URL_API,
});
