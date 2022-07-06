import axios from 'axios';

export class ApiService {
  constructor(auth = false) {
    this.controller = new AbortController();
    this.auth = auth;
    this.accessToken = localStorage.getItem('accessToken') || null;
    this.client = axios.create({
      baseURL: import.meta.env.VITE_BASE_API_URL,
      signal: this.controller.signal,
      headers: { Authorization: `Bearer ${this.accessToken}` },
    });
  }

  get(url, config, ...args) {
    return this.client.get(url, config, ...args).catch((err) => {
      this.handleRequestError(err).then(() => {
        return this.get(url, config, ...args);
      });
    });
  }

  handleRequestError(err) {
    if (err.response) {
      // Request was made but server responded with a 4xx or 5xx code
      switch (err.response.status) {
        case 401: {
          // handle 401
          if (this.auth) {
            //todo
            return Promise.reject();
            // const refreshToken = localStorage.getItem('refreshToken');
            // if (refreshToken)
            //   axios.post('/api/login/refresh', { refreshToken });
            // else throw err;
          } else {
            return axios.get('/api/token').then((response) => {
              localStorage.setItem('accessToken', response.data.access_token);
              this.client.defaults.headers.common.Authorization =
                'Bearer ' + response.data.access_token;

              return Promise.resolve();
            });
          }
        }
        default:
          return Promise.reject();
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
