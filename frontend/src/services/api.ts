import axios from 'axios';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api',
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const authService = {
  login: async (email: string, password: string) => {
    const { data } = await api.post('/users/login', { email, password });
    return data;
  },
  
  register: async (userData: { username: string; email: string; password: string }) => {
    const { data } = await api.post('/users/register', userData);
    return data;
  },
  
  getProfile: async () => {
    const { data } = await api.get('/users/profile');
    return data;
  },
  
  updateProfile: async (data: {
    username?: string;
    email?: string;
    currentPassword?: string;
    newPassword?: string;
  }) => {
    const { data: response } = await api.put('/users/profile', data);
    return response;
  }
};

export const postService = {
  getPosts: async () => {
    const { data } = await api.get('/posts');
    return data;
  },
  
  getPost: async (id: string) => {
    const { data } = await api.get(`/posts/${id}`);
    return data;
  },
  
  createPost: async (postData: { title: string; content: string; tags: string[] }) => {
    const { data } = await api.post('/posts', postData);
    return data;
  },
  
  updatePost: async (id: string, postData: {
    title: string;
    content: string;
    tags: string[];
    status: string;
  }) => {
    const { data } = await api.put(`/posts/${id}`, postData);
    return data;
  },
  
  deletePost: async (id: string) => {
    const { data } = await api.delete(`/posts/${id}`);
    return data;
  },
  
  getUserPosts: async () => {
    const { data } = await api.get('/posts/user');
    return data;
  },
  
  searchPosts: async (params: { query?: string; tags?: string }) => {
    const searchParams = new URLSearchParams();
    if (params.query) searchParams.append('query', params.query);
    if (params.tags) searchParams.append('tags', params.tags);
    
    const { data } = await api.get(`/posts/search?${searchParams.toString()}`);
    return data;
  },
};

export default api; 