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