import { ApiService } from './api';

export class UserService extends ApiService {
  async getUser() {
    const response = await this.get('user');
    return response;
  }

  async login(data) {
    const response = await this.post('login', data);
    this.saveToken(response.data.token);
    return response;
  }

  async register(data) {
    const response = await this.post('register', data);
    this.saveToken(response.data.token);
    return response;
  }

  async searchUsers(name) {
    const response = await this.get('users/search', {
      params: {
        name,
      },
    });
    return response;
  }

  saveToken(token) {
    localStorage.setItem('accessToken', token);
    this.client.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  }
}
