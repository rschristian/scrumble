import { apiService as ApiService } from 'ts-api-toolkit';

const apiService = ApiService;

export default apiService;

export type ApiResponse<T> = Promise<T>;
