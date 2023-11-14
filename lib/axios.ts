import axios from "axios";

const baseURL = "http://localhost:3000/api";
const publicBaseURL = "https://biometric-app.vercel.app/api";

export default axios.create({
  baseURL: process.env.NODE_ENV === "production" ? publicBaseURL : baseURL,
});
// const token: any = resolveAuthToken();

export const privateInstance = axios.create({
  baseURL: process.env.NODE_ENV === "production" ? publicBaseURL : baseURL,
  headers: {
    "Content-Type": "application/json",
    accept: "text/plain",
    "Access-Control-Allow-Origin": "*",
    withCredentials: true,
  },
});
