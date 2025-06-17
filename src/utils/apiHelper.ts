import axios from "axios";
const BASE_URL_API = "https://yudha.inovasisolusimuda.com/";

export const apiCall = axios.create({
  baseURL: BASE_URL_API,
});
