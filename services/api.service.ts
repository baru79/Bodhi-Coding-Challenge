import axios from "axios";

const URL_BASE = "https://challenge.bodhilabs.dev";

const api = axios.create({
  baseURL: URL_BASE,
  auth: {
    username: process.env.NEXT_PUBLIC_API_USERNAME as string,
    password: process.env.NEXT_PUBLIC_API_PASSWORD as string,
  },
});

export default api;
