import { shuffle } from '../helpers';
import { ApiService } from './api';

export class HomeService {
  constructor() {
    this.api = new ApiService();
  }

  async getHomeData(auth = false) {
    const { data: categories } = await this.api.get('browse/categories', {
      params: {
        limit: 50,
        country: 'VN',
      },
    });
    const selectedCategories = shuffle(categories.categories.items).slice(0, 5);
    for await (let category of selectedCategories) {
      const playlists = await this.api.get(
        `browse/categories/${category.id}/playlists`,
        {
          params: {
            limit: 10,
            country: 'VN',
          },
        }
      );
      if (playlists.playlists?.items?.length > 0) {
        category.playlists = playlists.playlists;
      }
    }
    console.log(selectedCategories);
  }
}
