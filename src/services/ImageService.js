import { ApiService } from './api';

export class ImageService extends ApiService {
  async upload(file) {
    const form = new FormData();
    form.append('image', file);
    const response = await this.post('upload', form);
    return response;
  }
}
