import axios from "axios";
const BASE_URL_API = "https://yudha.inovasisolusimuda.com/";
const BASE_URL_DEVELOPMENT = "https://localhost:7889/";

export const apiCall = axios.create({
  baseURL: BASE_URL_API,
});
