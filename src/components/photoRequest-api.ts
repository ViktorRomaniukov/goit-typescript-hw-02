import axios from 'axios';
import { UnsplashImage } from './types/image';


const ACCESS_KEY = 'Z3LcOAdn4ndWlif87XHXlbsCZcO6_DPmYNrxXhcH2W8';

interface SearchResponse {
  total: number;
  total_pages: number;
  results: UnsplashImage[];
}

export const searchImages = async (
  query: string,
  page = 1,
  perPage = 12
): Promise<SearchResponse> => {
  const response = await axios.get<SearchResponse>('https://api.unsplash.com/search/photos', {
    params: {
      query,
      page,
      per_page: perPage,
    },
    headers: {
      Authorization: `Client-ID ${ACCESS_KEY}`,
    },
  });
  return response.data;
};