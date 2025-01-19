export interface User {
  _id: string;
  username: string;
  email: string;
  role: 'admin' | 'author' | 'visitor';
  createdAt: string;
}

export interface Post {
  _id: string;
  title: string;
  content: string;
  author: User;
  status: 'draft' | 'pending' | 'published';
  tags: string[];
  createdAt: string;
  updatedAt: string;
}

export interface AuthResponse {
  user: User;
  token: string;
}

export interface GetAllPostsParams {
  status?: Post['status'];
  search?: string;
  page?: number;
  limit?: number;
}

export interface AdminPostsResponse {
  posts: Post[];
  pagination: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}

export interface AdminStats {
  users: {
    total: number;
    admins: number;
    authors: number;
    visitors: number;
  };
  posts: {
    total: number;
    published: number;
    pending: number;
    draft: number;
  };
}

export interface UserPostsParams {
  userId?: string;
  page?: number;
  limit?: number;
  status?: Post['status'];
}

export interface UserPostsResponse {
  posts: Post[];
  pagination: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}

export interface Comment {
  _id: string;
  content: string;
  author: User;
  post: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateCommentData {
  content: string;
  postId: string;
}

export interface CommentsResponse {
  comments: Comment[];
  pagination: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
} 