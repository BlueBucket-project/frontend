import axios from "axios";

export const instance = axios.create({
  baseURL: "http://13.125.29.219:8080/api/v1",
});
