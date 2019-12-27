import axios from "axios";
import firebase from "../config/firebase";

// Set base URL based on whether it's a development or production environment
const baseURL =
  process.env.NODE_ENV === "production"
    ? "https://www.newtlearning.com/api"
    : "https://56ac3ded.ngrok.io/api";

const instance = axios.create({
  baseURL
});

instance.interceptors.request.use(
  async config => {
    // Get current user token
    const token = await firebase.auth().currentUser.getIdToken(true);

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  error => {
    return Promise.reject(err);
  }
);

export default instance;
