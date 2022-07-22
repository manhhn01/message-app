import { ApiService } from './api';

export class ConversationService extends ApiService {
  async getConversations() {
    const response = await this.get('conversations');
    return response;
  }

  async getConversation(id) {
    const response = await this.get(`conversations/${id}`);
    return response;
  }

  async createConversation(data) {
    const response = await this.post('conversations', data);
    return response;
  }

  async addMember(conversationId, userId) {
    const response = await this.post(
      `conversations/${conversationId}/add-user`,
      {
        userId,
      }
    );
    return response;
  }

  // async update(id, data) {
  //   const response = await this.put(`conversations/${id}`, data);
  //   return response;
  // }

  async deleteConversation(id) {
    const response = await this.delete(`conversations/${id}`);
    return response;
  }
}
