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
};

export default api; 