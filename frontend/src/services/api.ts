import axios from 'axios';
import { Post, AdminPostsResponse, GetAllPostsParams, UserPostsParams, UserPostsResponse, CommentsResponse, CreateCommentData, Comment } from '@/types';
import { handleApiError } from '@/utils/api-error';
import DOMPurify from 'dompurify';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api',
  timeout: 10000,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.code === 'ECONNABORTED') {
      throw new Error('Request timeout. Please try again.');
    }
    
    if (!error.response) {
      throw new Error('Network error. Please check your connection and try again.');
    }
    
    return Promise.reject(await handleApiError(error));
  }
);

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

interface SearchParams {
  query?: string;
  tags?: string;
  page?: number;
  limit?: number;
}

interface SearchResponse {
  posts: Post[];
  pagination: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}

interface PostsResponse {
  posts: Post[];
  pagination: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}

export const postService = {
  getPosts: async () => {
    const { data } = await api.get('/posts');
    return data;
  },
  
  getPost: async (id: string): Promise<Post> => {
    try {
      const response = await api.get(`/posts/${id}`);
      console.log('API Response:', response.data);
      
      // Ensure we have an author object
      if (!response.data.author) {
        response.data.author = {
          _id: 'deleted',
          username: 'Deleted User'
        };
      }
      
      return response.data;
    } catch (error) {
      console.error('API Error:', error);
      throw handleApiError(error);
    }
  },
  
  createPost: async (postData: {
    title: string;
    content: string;
    tags: string[];
    status: Post['status'];
  }) => {
    try {
      const response = await api.post('/posts', postData);
      return response.data;
    } catch (error) {
      throw handleApiError(error);
    }
  },
  
  updatePost: async (id: string, postData: {
    title: string;
    content: string;
    tags: string[];
    status: Post['status'];
  }) => {
    const { data } = await api.put(`/posts/${id}`, postData);
    return data;
  },
  
  deletePost: async (id: string) => {
    const { data } = await api.delete(`/posts/${id}`);
    return data;
  },
  
  getUserPosts: async (params: UserPostsParams): Promise<UserPostsResponse> => {
    try {
      const queryParams = new URLSearchParams();
      if (params.page) queryParams.set('page', params.page);
      if (params.limit) queryParams.set('limit', params.limit);
      if (params.status && params.status !== 'all') {
        queryParams.set('status', params.status);
      }

      const response = await api.get(`/posts/user?${queryParams.toString()}`);
      return {
        posts: response.data.posts || [],
        pagination: response.data.pagination
      };
    } catch (error) {
      throw handleApiError(error);
    }
  },
  
  searchPosts: async (params: SearchParams): Promise<SearchResponse> => {
    const searchParams = new URLSearchParams();
    if (params.query) searchParams.append('query', params.query);
    if (params.tags) searchParams.append('tags', params.tags);
    if (params.page) searchParams.append('page', params.page.toString());
    if (params.limit) searchParams.append('limit', params.limit.toString());
    
    const { data } = await api.get(`/posts/search?${searchParams.toString()}`);
    return data;
  },
};

export const adminService = {
  getAllUsers: async () => {
    const { data } = await api.get('/admin/users');
    return data;
  },
  
  updateUserRole: async (userId: string, role: string) => {
    const { data } = await api.put(`/admin/users/${userId}`, { role });
    return data;
  },
  
  getStats: async () => {
    const { data } = await api.get('/admin/stats');
    return data;
  },
  
  getAllPosts: async (params?: GetAllPostsParams): Promise<AdminPostsResponse> => {
    const searchParams = new URLSearchParams();
    if (params?.status) searchParams.append('status', params.status);
    if (params?.search) searchParams.append('search', params.search);
    if (params?.page) searchParams.append('page', params.page.toString());
    if (params?.limit) searchParams.append('limit', params.limit.toString());
    
    const { data } = await api.get(`/admin/posts?${searchParams.toString()}`);
    return data;
  },
  
  updatePostStatus: async (postId: string, status: 'draft' | 'pending' | 'published'): Promise<Post> => {
    const { data } = await api.put(`/admin/posts/${postId}/status`, { status });
    return data;
  },
  
  getPostById: async (postId: string): Promise<Post> => {
    const { data } = await api.get(`/admin/posts/${postId}`);
    return data;
  },
  
  deletePost: async (postId: string): Promise<void> => {
    await api.delete(`/admin/posts/${postId}`);
  }
};

export const commentService = {
  getComments: async (postId: string, page: number = 1, limit: number = 10): Promise<CommentsResponse> => {
    try {
      const { data } = await api.get(`/posts/${postId}/comments`, {
        params: { page, limit }
      });
      return data;
    } catch (error) {
      throw handleApiError(error);
    }
  },

  createComment: async (data: CreateCommentData): Promise<Comment> => {
    try {
      // Sanitize content before sending
      const sanitizedContent = DOMPurify.sanitize(data.content);
      
      const response = await api.post(`/posts/${data.postId}/comments`, {
        content: sanitizedContent
      });
      return response.data;
    } catch (error) {
      throw handleApiError(error);
    }
  },

  deleteComment: async (postId: string, commentId: string): Promise<void> => {
    try {
      await api.delete(`/posts/${postId}/comments/${commentId}`);
    } catch (error) {
      throw handleApiError(error);
    }
  }
};

export const services = {
  auth: authService,
  post: postService,
  comment: commentService,
  admin: adminService
};

export default services; 