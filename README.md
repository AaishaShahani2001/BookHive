# 📚 BookHive – MERN Online Bookstore

BookHive is a full-stack MERN (MongoDB, Express, React, Node.js) application designed to deliver a smooth and modern online bookstore experience. Users can explore books, manage favourites, add items to a cart, place orders, and receive real-time notifications. Admins can manage the entire book inventory with role-based access and secure JWT authentication.

This project was built alongside my ITP module for learning and practical understanding of real-world application development.

---

## 📌 Key Features

### 👤 User Authentication & Roles
- Secure user registration and login using JWT
- Role-based access control (Admin / User)
- User profile management with address updates

### 📚 Book Management (Admin)
- Add, update, and delete books
- Upload book cover images (Multer + Cloudinary)
- Manage categories, languages, prices, and stock status

### ❤️ Favourites System
- Add and remove favourite books
- Persistent, user-specific favourites
- Instant UI updates with Notistack notifications

### 🛒 Cart & Orders
- Add/remove books from cart
- Auto-calculated order totals
- Place orders securely
- View order history per user

### 🔔 Real-time Notifications
- Toast notifications for actions and errors
- Success, warning, and error alerts using Notistack

### 🎨 Modern UI/UX
- Built with React + Tailwind CSS
- Fully responsive design
- Smooth page transitions using ScrollToTop

### 🔐 Secure & Scalable Backend
- RESTful API with Node.js & Express
- JWT-based authentication
- MongoDB with Mongoose ORM

---

## 🛠 Tech Stack

| Layer | Technology |
|------|-----------|
| Frontend | React, Tailwind CSS, Notistack |
| Backend | Node.js, Express.js |
| Database | MongoDB + Mongoose |
| Authentication | JWT |
| Image Uploads | Multer, Cloudinary |
| State Management | Redux Toolkit |
| Routing | React Router v6 |

---

## 🚀 Getting Started

### 📌 Prerequisites
Ensure you have installed:
- Node.js (v16 or later)
- MongoDB
- npm or yarn

---

## 🏗 Installation

### 1️⃣ Clone the Repository
```bash
git clone https://github.com/yourusername/BookHive.git
cd BookHive

## 🔧 Backend Setup
```bash
cd backend
npm install

## create .env file
MONGO_URI=your_mongo_connection
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_SECRET_KEY=your_secret_key
JWT_SECRET=your_jwt_secret
PORT=3000

## API Endpoints
| Method | Endpoint          | Description         |
| ------ | ----------------- | ------------------- |
| POST   | /api/user/sign-up | Register a new user |
| POST   | /api/user/sign-in | Login user          |

| Method | Endpoint                 | Description          |
| ------ | ------------------------ | -------------------- |
| GET    | /api/book/get-all-books  | Fetch all books      |
| GET    | /api/book/get-a-book/:id | Fetch single book    |
| POST   | /api/book/add-book       | Add new book (Admin) |
| PUT    | /api/book/update-book    | Update book (Admin)  |
| DELETE | /api/book/delete-book    | Delete book (Admin)  |

| Method | Endpoint                                  | Description                 |
| ------ | ----------------------------------------- | --------------------------- |
| PUT    | /api/favourite/add-book-to-favourite      | Add book to favourites      |
| PUT    | /api/favourite/remove-book-from-favourite | Remove book from favourites |
| GET    | /api/favourite/get-favourite-books        | Get user favourites         |

| Method | Endpoint                       | Description           |
| ------ | ------------------------------ | --------------------- |
| GET    | /api/cart/get-user-cart        | Get user cart         |
| PUT    | /api/cart/add-to-cart          | Add book to cart      |
| PUT    | /api/cart/remove-from-cart/:id | Remove book from cart |


| Method | Endpoint                       | Description           |
| ------ | ------------------------------ | --------------------- |
| GET    | /api/cart/get-user-cart        | Get user cart         |
| PUT    | /api/cart/add-to-cart          | Add book to cart      |
| PUT    | /api/cart/remove-from-cart/:id | Remove book from cart |


