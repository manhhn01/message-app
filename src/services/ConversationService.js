import { ApiService } from './api';
import { ImageService } from './ImageService';

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
    const response = await this.post(`conversations/${conversationId}/users`, {
      userId,
    });
    return response;
  }

  async removeMember(conversationId, userId) {
    const response = await this.delete(
      `conversations/${conversationId}/users`,
      {
        userId,
      }
    );
    return response;
  }

  async removeConversation(conversationId) {
    const response = await this.delete(`conversations/${conversationId}`);
    return response;
  }

  // async update(id, data) {
  //   const response = await this.put(`conversations/${id}`, data);
  //   return response;
  // }

  async updateConversation(conversationId, data) {
    if (data.avatar) {
      const uploadResponse = await new ImageService().upload(data.avatar);
      data.avatar = uploadResponse.data.url;
    }
    const updateResponse = await this.patch(
      `conversations/${conversationId}`,
      data
    );
    return updateResponse;
  }

  async deleteConversation(id) {
    const response = await this.delete(`conversations/${id}`);
    return response;
  }
}
