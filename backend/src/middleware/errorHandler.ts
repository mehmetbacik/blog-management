import { Request, Response, NextFunction } from 'express';
import { AppError } from '../utils/errors';

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  _next: NextFunction
) => {
  // For operational errors
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      status: 'error',
      code: err.statusCode,
      message: err.message,
      ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
    });
  }

  // MongoDB errors
  if (err.name === 'MongoServerError') {
    if ((err as any).code === 11000) { // Duplicate key error
      const field = Object.keys((err as any).keyValue)[0];
      return res.status(400).json({
        status: 'error',
        code: 400,
        message: `${field} already exists`
      });
    }
  }

  if (err.name === 'ValidationError') {
    return res.status(400).json({
      status: 'error',
      code: 400,
      message: 'Validation Error',
      errors: Object.values((err as any).errors).map((e: any) => ({
        field: e.path,
        message: e.message
      }))
    });
  }

  // JWT errors
  if (err.name === 'JsonWebTokenError') {
    return res.status(401).json({
      status: 'error',
      code: 401,
      message: 'Invalid token'
    });
  }

  if (err.name === 'TokenExpiredError') {
    return res.status(401).json({
      status: 'error',
      code: 401,
      message: 'Token expired'
    });
  }

  // For unknown errors
  console.error('Unexpected Error:', err);
  res.status(500).json({
    status: 'error',
    code: 500,
    message: 'Internal server error',
    ...(process.env.NODE_ENV === 'development' && {
      error: err.message,
      stack: err.stack
    })
  });
}; 