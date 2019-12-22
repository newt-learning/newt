import axios from "axios";

// Set base URL based on whether it's a development or production environment
const baseURL =
  process.env.NODE_ENV === "production"
    ? "https://www.newtlearning.com/api"
    : "https://c9afcde0.ngrok.io/api";

const instance = axios.create({
  baseURL
});

export default instance;
