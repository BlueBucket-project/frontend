import axios from "axios";

export const instance = axios.create({
  baseURL: "http://13.125.29.219:8080/api/v1",
});

export const instanceH = (accessToken: string) =>
  axios.create({
    baseURL: "http://13.125.29.219:8080/api/v1",
    headers: {
      Authorization: `${accessToken}`,
    },
  });
