# BookLog 📚

BookLog is a quiet and minimal book logging & review platform where users can track, reflect, and remember books. A thoughtful space for readers to share their thoughts and discover new reads.

![BookLog Home](screenshot/home.png)

## 🎨 Theme

**Quiet Library** - A minimalist design focused on thoughtful reading and reflection.

## 🚀 Tech Stack

### Frontend
- **Next.js 16.1.4** - React framework with App Router
- **React 19.2.3** - UI library
- **TypeScript 5** - Type safety
- **Tailwind CSS 4** - Utility-first CSS framework
- **React Hook Form 7.71.1** - Form management
- **Zod 4.3.6** - Schema validation
- **Axios 1.13.3** - HTTP client
- **Radix UI** - Accessible component primitives
  - Alert Dialog
  - Dropdown Menu
  - Select
  - Tooltip
- **Lucide React** - Icon library
- **React Toastify** - Toast notifications
- **Next Themes** - Dark mode support

### Backend
- **Node.js** - Runtime environment
- **Express 5.2.1** - Web framework
- **MongoDB** - Database
- **Mongoose 9.1.5** - MongoDB ODM
- **JWT (jsonwebtoken)** - Authentication
- **bcryptjs** - Password hashing
- **CORS** - Cross-origin resource sharing

## 📄 Pages & Features

### Authentication
- **Login Page** (`/`) - User authentication with JWT
- **Signup Page** - New user registration

### Main Pages
- **Home Page** (`/home`) - Dashboard with:
  - Hero section with library background
  - Last added books showcase
  - Featured comments section
  - Quick navigation to all books

- **Books Page** (`/books`) - Browse all books in the library

- **Book Details Page** (`/books/[booksId]`) - Individual book page with:
  - Book information and details
  - Review submission form
  - Rating system (1-5 stars)
  - Comments and reviews from other users
  - Related book suggestions

- **My Library** (`/myLibrary`) - Personal library management:
  - View all books in your collection
  - Add/remove books from library
  - Personal reading list

- **Add Book** (`/addBook`) - Add new books to the platform:
  - Form with validation
  - Book title, author, description
  - Image upload support

## 🏗️ Project Structure

```
Booklog/
├── client/
│   └── booklog/          # Next.js frontend
│       ├── app/           # App Router pages
│       ├── components/    # React components
│       ├── context/       # React Context providers
│       ├── hooks/         # Custom React hooks
│       ├── lib/           # Utility functions & API
│       └── types/         # TypeScript type definitions
│
└── server/                # Express backend
    ├── config/            # Database configuration
    ├── middleware/        # Express middleware
    ├── models/            # MongoDB models
    └── routes/            # API routes
```

## ✨ Key Features

- ✅ **User Authentication** - Secure JWT-based authentication
- ✅ **Book Management** - Add, view, and manage books
- ✅ **Review System** - Write and read book reviews
- ✅ **Rating System** - 5-star rating for books
- ✅ **Personal Library** - Save books to your collection
- ✅ **Responsive Design** - Works on all devices
- ✅ **Dark Mode Support** - Theme switching capability
- ✅ **Form Validation** - Client and server-side validation
- ✅ **Toast Notifications** - User feedback system

## 🛠️ Installation & Setup

### Prerequisites
- Node.js (v20 or higher)
- MongoDB database
- npm or yarn

### Backend Setup

```bash
cd server
npm install
```

Create a `.env` file in the server directory:
```env
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
PORT=5000
```

Start the server:
```bash
npm run dev
```

### Frontend Setup

```bash
cd client/booklog
npm install
```

Create a `.env.local` file:
```env
NEXT_PUBLIC_API_URL=http://localhost:5000
```

Start the development server:
```bash
npm run dev
```

Visit `http://localhost:3000` to see the application.

## 📝 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - User login

### Books
- `GET /api/books` - Get all books
- `GET /api/books/sorted` - Get sorted books
- `GET /api/book/:id` - Get book details
- `GET /api/book/search?title=...` - Search books
- `POST /api/books` - Create new book (protected)
- `POST /api/book/:id/review` - Add review (protected)

### Library
- `GET /api/user/:id/library` - Get user library
- `POST /api/book/:id/library` - Add book to library
- `DELETE /api/book/:id/library` - Remove book from library

## 🎯 Future Enhancements

- [ ] Book search and filtering
- [ ] User profiles
- [ ] Reading progress tracking
- [ ] Book recommendations
- [ ] Social features (follow users, share reviews)
- [ ] Export reading list
- [ ] Advanced analytics

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 👤 Author

Built with ❤️ for thoughtful readers.

---

**BookLog** - Your quiet place to track, reflect, and remember books.
