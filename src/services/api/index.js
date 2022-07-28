import axios from 'axios';

export class ApiService {
  constructor() {
    this.controller = new AbortController();
    this.accessToken = localStorage.getItem('accessToken') || null;

    const axiosConfig = {
      baseURL: import.meta.env.VITE_BASE_API_URL,
      signal: this.controller.signal,
    };
    if (this.accessToken)
      axiosConfig.headers = { Authorization: `Bearer ${this.accessToken}` };
    this.client = axios.create(axiosConfig);
  }

  get(url, config, ...args) {
    return this.client.get(url, config, ...args).catch((err) =>
      this.handleRequestError(err).then(() => {
        return this.get(url, config, ...args);
      })
    );
  }

  post(url, data, config, ...args) {
    return this.client.post(url, data, config, ...args).catch((err) =>
      this.handleRequestError(err).then(() => {
        return this.post(url, data, config, ...args);
      })
    );
  }

  patch(url, data, config, ...args) {
    return this.client.patch(url, data, config, ...args).catch((err) =>
      this.handleRequestError(err).then(() => {
        return this.patch(url, data, config, ...args);
      })
    );
  }

  delete(url, data, config, ...args) {
    return this.client
      .delete(
        url,
        {
          data,
          ...config,
        },
        ...args
      )
      .catch((err) =>
        this.handleRequestError(err).then(() => {
          return this.delete(url, { data, ...config }, ...args);
        })
      );
  }

  handleRequestError(err) {
    if (err.response) {
      // Request was made but server responded with a 4xx or 5xx code
      switch (err.response.status) {
        case 401: {
          //todo get refresh token
          localStorage.removeItem('accessToken');
          return Promise.reject(err);
        }
        default:
          return Promise.reject(err);
      }
    } else if (err.request) {
      // The request was made but no response was received
      console.log(err.request);
    } else {
      throw err;
    }
  }

  abort() {
    this.controller.abort();
  }
}
