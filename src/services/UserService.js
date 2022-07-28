import { ApiService } from './api';
import { ImageService } from './ImageService';

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

  async updateUser(data) {
    if (data.avatar) {
      const uploadResponse = await new ImageService().upload(data.avatar);
      data.avatar = uploadResponse.data.url;
    }

    const updateResponse = await this.patch('user', data);
    return updateResponse;
  }

  logout() {
    this.removeToken();
  }

  saveToken(token) {
    localStorage.setItem('accessToken', token);
    this.client.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  }

  removeToken() {
    localStorage.removeItem('accessToken');
    this.client.defaults.headers.common['Authorization'] = null;
  }
}
