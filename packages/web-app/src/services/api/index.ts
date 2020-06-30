import { apiService as ApiService } from 'ts-api-toolkit';

const apiService = ApiService;

export default apiService;

interface ResponseData<T> {
    data: T;
    error: string;
}

export type ApiResponse<T> = Promise<ResponseData<T>>;
