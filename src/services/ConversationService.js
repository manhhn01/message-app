import { ApiService } from './api';

export class ConversationService extends ApiService {
  async list() {
    const response = await this.get('conversations');
    return response.data;
  }

  async get(id) {
    const response = await this.get(`conversation/${id}`);
    return response.data;
  }

  async create(data) {
    const response = await this.post('conversation', data);
    return response.data;
  }

  async update(id, data) {
    const response = await this.put(`conversation/${id}`, data);
    return response.data;
  }

  async delete(id) {
    const response = await this.delete(`conversation/${id}`);
    return response.data;
  }
}
