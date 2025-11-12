// src/api/api.ts
import axios from "axios";

const api = axios.create({
  baseURL: "https://jsonplaceholder.typicode.com",
  timeout: 10000, // Optional timeout
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
