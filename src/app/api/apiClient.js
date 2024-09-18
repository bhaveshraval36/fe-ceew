import axios from 'axios';
import qs from 'qs';
import { toast } from 'react-toastify';
// import { signOut } from 'next-auth/react';
import { baseUrl } from '../global_config';
import Cookies from 'js-cookie'; // Import the js-cookie library


class ApiClient {
  constructor() {
    this.client = this.createAxiosClient();
    this.client.interceptors.request.use(
      config => {
        // Check if Authorization header is already set
        if (config?.headers?.Authorization != null) {
          return config;
        }

        // Retrieve the authUser cookie
        const authUserCookie = Cookies.get('authUser');
        let token;

        if (authUserCookie) {
          const authUser = JSON.parse(authUserCookie.replace("j:",""));
          token = authUser.token;
        }

        // Set the Authorization header if the token is available
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }

        return config;
      },
      error => Promise.reject(error)
    );

    this.client.interceptors.response.use(
      value => value,
      error => this.handleError(error)
    );
  }

  createAxiosClient(apiConfiguration) {
    return axios.create({
      baseURL: baseUrl,
      responseType: 'json',
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }

  async get(path, queryParam, config) {
    try {
      if (queryParam) {
        path = `${path}?${qs.stringify(queryParam)}`;
      }

      const response = config ? await this.client.get(path, config) : await this.client.get(path);
      return response.data;
    } catch (error) {
      this.handleError(error);
      throw error;
    }
  }

  async post(path, payload, config) {
    try {
      const response = config ? await this.client.post(path, payload, config) : await this.client.post(path, payload);
      return response.data;
    } catch (error) {
      this.handleError(error);
      throw error;
    }
  }

  async delete(path, queryParam, config) {
    try {
      if (queryParam) {
        path = `${path}?${qs.stringify(queryParam)}`;
      }

      const response = config ? await this.client.delete(path, config) : await this.client.delete(path);
      return response.data;
    } catch (error) {
      this.handleError(error);
      throw error;
    }
  }

  async patch(path, payload) {
    try {
      const response = await this.client.patch(path, payload);
      return response.data;
    } catch (error) {
      this.handleError(error);
      throw error;
    }
  }

  async put(path, payload) {
    try {
      const response = await this.client.put(path, payload);
      return response.data;
    } catch (error) {
      this.handleError(error);
      throw error;
    }
  }

  handleError(error) {
    if (error.response?.status === 401) {
      window.location.replace("/login")
    }

    const status = error.response?.status;
    const { message } = error.response?.data ?? error;

    console.log(message, status);

    switch (status) {
      case 500:
      case 403:
      case 401:
      case 429:
      case 404:
        toast.error(message);
        break;
      default:
        toast.error(message);
        break;
    }

    throw error;
  }
}

export const apiClient = new ApiClient();
