import axios from 'axios';
import { 
  Type, 
  Duty, 
  DutyLog, 
  CreateDutyDto, 
  UpdateDutyDto, 
  CreateTypeDto, 
  UpdateTypeDto,
  PaginatedResponse 
} from '../types/models';

const baseURL = process.env.NODE_ENV === 'production' 
  ? '/api'  // In production, this will be proxied through nginx
  : 'http://localhost:3000/api'; // In development, use the backend URL directly

const api = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add request interceptor for logging
api.interceptors.request.use(
  (config) => {
    console.log('API Request:', {
      url: config.url,
      method: config.method,
      data: config.data,
      headers: config.headers,
    });
    return config;
  },
  (error) => {
    console.error('API Request Error:', error);
    return Promise.reject(error);
  }
);

// Add response interceptor for logging
api.interceptors.response.use(
  (response) => {
    console.log('API Response:', {
      status: response.status,
      data: response.data,
      headers: response.headers,
    });
    return response;
  },
  (error) => {
    console.error('API Response Error:', {
      status: error.response?.status,
      data: error.response?.data,
      config: {
        url: error.config?.url,
        method: error.config?.method,
        data: error.config?.data,
      },
    });
    return Promise.reject(error);
  }
);

export const dutiesApi = {
  getAll: async (page = 1, limit = 10): Promise<PaginatedResponse<Duty>> => {
    const response = await api.get(`/duties?page=${page}&limit=${limit}`);
    return response.data;
  },

  getById: async (id: string): Promise<Duty> => {
    const response = await api.get(`/duties/${id}`);
    return response.data;
  },

  create: async (duty: CreateDutyDto): Promise<Duty> => {
    const response = await api.post('/duties', duty);
    return response.data;
  },

  update: async (id: string, duty: UpdateDutyDto): Promise<Duty> => {
    const response = await api.put(`/duties/${id}`, duty);
    return response.data;
  },

  delete: async (id: string): Promise<void> => {
    await api.delete(`/duties/${id}`);
  },

  getLogs: async (id: string): Promise<DutyLog[]> => {
    const response = await api.get(`/duties/${id}/logs`);
    return response.data;
  },
};

export const typesApi = {
  getAll: async (): Promise<Type[]> => {
    const response = await api.get('/types');
    return response.data;
  },

  getById: async (id: string): Promise<Type> => {
    const response = await api.get(`/types/${id}`);
    return response.data;
  },

  create: async (type: CreateTypeDto): Promise<Type> => {
    const response = await api.post('/types', type);
    return response.data;
  },

  update: async (id: string, type: UpdateTypeDto): Promise<Type> => {
    const response = await api.put(`/types/${id}`, type);
    return response.data;
  },
}; 