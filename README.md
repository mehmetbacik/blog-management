# Blog Management System

A comprehensive blog management system built with full-stack technologies. This project features role-based authentication for secure user access, real-time updates for dynamic content management, and a modern, responsive design for an optimal user experience across devices. Users can create, edit, and manage posts, while admins have full control over user roles and content moderation.

## Features

### Authentication & Authorization

- Role-based access control (Admin, Author, Visitor)
- JWT-based authentication
- Protected routes
- Secure password hashing

### Blog Management

- Create, read, update, and delete blog posts
- Rich text editor for post content
- Post status management (Draft, Pending, Published)
- Tag-based categorization
- Search and filter functionality
- Pagination

### Admin Dashboard

- User management
- Post moderation
- Analytics and statistics
- Role management
- Bulk actions

### User Features

- Profile management
- Personal post dashboard
- Comment system
- Post favorites
- Notification system

### Additional Features

- Responsive design
- Dark/Light theme
- Real-time updates
- Search functionality
- API documentation with Swagger
- Error handling and validation
- Loading states and animations

## Technologies

### Frontend

- **Next.js 14**: React framework with App Router
- **TypeScript**: Type-safe code
- **SASS/SCSS**: Advanced styling with variables, mixins, and modules
- **Context API**: State management
- **React Hooks**: Component logic
- **Axios**: HTTP client
- **React Toastify**: Toast notifications
- **DOMPurify**: XSS protection
- **Zod**: Schema validation

### Backend

- **Node.js**: Runtime environment
- **Express.js**: Web framework
- **TypeScript**: Type safety
- **MongoDB**: Database
- **Mongoose**: ODM for MongoDB
- **JWT**: Authentication
- **Bcrypt**: Password hashing
- **Swagger**: API documentation
- **Jest**: Testing
- **Supertest**: API testing

### Development Tools

- **ESLint**: Code linting
- **Prettier**: Code formatting
- **Git**: Version control
- **npm**: Package management
- **TypeScript**: Static typing
- **Jest**: Unit testing

## Pages and Features

### Public Pages

- **Home**:
  - Latest published posts
  - Infinite scroll
  - Search and filter options
- **Post Detail**:
  - Full post content
  - Comment section
  - Author information
- **Search**:
  - Advanced search functionality
  - Tag-based filtering
  - Category filtering
- **Authentication**:
  - Login (`/login`)
  - Register (`/register`)

### User Pages

- **Dashboard**:
  - User's posts management
  - Post statistics
  - Draft posts
- **Profile**:
  - User settings
  - Profile information
  - Account management
- **Post Management**:
  - Create post (`/posts/new`)
  - Edit post (`/posts/[id]/edit`)
  - Delete posts

### Admin Pages

- **Admin Dashboard**:
  - System overview
  - User statistics
  - Post statistics
  - Recent activities
- **User Management**:
  - User list
  - Role management
  - User actions
- **Post Management**:
  - All posts overview
  - Post moderation
  - Status management

## API Documentation

API documentation is available at `/api/docs` when running in development mode.

## Environment Setup

### Frontend Environment Variables

```env
NEXT_PUBLIC_API_URL=http://localhost:3000/api
```

### Backend Environment Variables

```env
PORT=3000
MONGODB_URI=mongodb://localhost:27017/blog-management
JWT_SECRET=your-secret-key
FRONTEND_URL=http://localhost:3001
```

## Getting Started

1. Clone the repository

```bash
git clone https://github.com/mehmetbacik/blog-management.git
cd blog-management
```

2. Install dependencies

```bash
# Frontend
cd frontend
npm install

# Backend
cd backend
npm install
```

3. Set up environment variables

```bash
# Frontend
cp .env.example .env.local

# Backend
cp .env.example .env
```

4. Start development servers

```bash
# Frontend
npm run dev

# Backend
npm run dev
```

## Testing

```bash
# Frontend
npm run test
npm run test:watch # Watch mode
npm run test:coverage

# Backend
npm run test
npm run test:watch
```

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Contributions

If you wish to contribute to the project, please open a pull request. Any contributions and feedback are welcome!