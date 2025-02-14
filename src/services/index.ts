import axios from 'axios';
import { BASE_URL } from '@/constants/api';
import type { ApiResponse } from '@/types';

export const characterService = {
  async getCharacters(page: number = 1, search?: string): Promise<ApiResponse> {
    const params = new URLSearchParams();
    params.append('page', page.toString());
    if (search) params.append('search', search);
    
    const response = await axios.get<ApiResponse>(`${BASE_URL}?${params.toString()}`);
    return response.data;
  }
};
