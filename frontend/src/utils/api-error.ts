interface ErrorResponse {
  status: number;
  statusText: string;
  errors?: Array<{ field: string; message: string }>;
}

export class ApiError extends Error {
  constructor(
    public statusCode: number,
    message: string,
    public errors?: Array<{ field: string; message: string }>
  ) {
    super(message);
    this.name = 'ApiError';
  }

  static fromResponse(response: ErrorResponse) {
    return new ApiError(
      response.status,
      response.statusText,
      response.errors
    );
  }
}

export const handleApiError = async (error: any) => {
  if (error.response) {
    // Error response from API
    const { status, data } = error.response;
    
    if (status === 401) {
      // Token expired or invalid
      localStorage.removeItem('token');
      window.location.href = '/login';
      throw new ApiError(status, 'Session expired. Please login again.');
    }
    
    if (status === 403) {
      throw new ApiError(status, 'You do not have permission to perform this action.');
    }
    
    if (status === 404) {
      throw new ApiError(status, 'Resource not found.');
    }
    
    if (status === 422 || status === 400) {
      throw new ApiError(status, data.message, data.errors);
    }
    
    throw new ApiError(status, data.message || 'An error occurred');
  }
  
  if (error.request) {
    // Request was made but no response received
    throw new ApiError(0, 'No response from server. Please check your connection.');
  }
  
  // Error occurred while creating the request
  throw new ApiError(0, error.message || 'An unexpected error occurred');
}; 