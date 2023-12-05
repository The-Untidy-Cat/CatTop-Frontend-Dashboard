import axios from "axios";

const Axios = axios.create({
  baseURL: process.env.NEXT_PUBLIC_SERVER_URL,
  withCredentials: true,
});

const getCSRFToken = async () => {
  try {
    const response = await Axios.get("/auth/csrf");
    return response.data.data;
  } catch (error) {
    throw error;
  }
};

class api {
  static async get(url, config) {
    try {
      return Axios.get(url, config);
    } catch (error) {
      throw error;
    }
  }
  static async post(url, data, config = null) {
    try {
      const token = await getCSRFToken();
      return Axios.post(url, { ...data, _token: token }, config);
    } catch (error) {
      throw error;
    }
  }
  static async put(url, data, config = null) {
    try {
      const token = await getCSRFToken();
      return Axios.put(url, { ...data, _token: token }, config);
    } catch (error) {
      throw error;
    }
  }
  static async delete(url, config) {
    try {
      const token = await getCSRFToken();
      return Axios.delete(url, { _token: token }, config);
    } catch (error) {
      throw error;
    }
  }
}

export { api };
