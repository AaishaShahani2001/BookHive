📚 BookHive – MERN Online Bookstore

BookHive is a full-stack MERN (MongoDB, Express, React, Node.js) application designed to offer a smooth and modern online bookstore experience. It enables users to explore books, manage favourites, use a shopping cart, place orders, and receive real-time notifications. Admins can fully manage book inventory with role-based access and secure JWT authentication.

📌 Key Features
👤 User Authentication & Roles

Secure login & signup with JWT

Role-based access (User & Admin)

Profile page with address management

📚 Book Management

Admin can add, update, and delete books

Upload cover images using Multer

Categories, languages, pricing, and stock status

❤️ Favourites System

Add/remove favourite books

Persistent user-specific favourites

Instant UI updates with Notistack notifications

🛒 Cart & Orders

Add/remove books from cart

Auto-calculated totals

Place orders instantly

Order history for each user

🔔 Real-time Notifications

Smooth toast alerts using Notistack

Success, error, and warning prompts throughout the system

🎨 Modern UI/UX

Built with React + Tailwind CSS

Fully responsive interface

Smooth page transitions with ScrollToTop

🔐 Secure & Scalable Backend

Node.js + Express REST API

JWT-based authentication

MongoDB with Mongoose ORM

🛠 Tech Stack
Layer	          Technology
Frontend	      React, Tailwind CSS, Notistack
Backend	        Node.js, Express.js
Database	      MongoDB + Mongoose
Authentication	JWT Tokens
Image Uploads	  Multer, Cloudinary
State Management	Redux Toolkit
Routing	React Router v6
🚀 Getting Started
📌 Prerequisites

Ensure you have installed:

Node.js (v16+)

MongoDB

npm or yarn

🏗 Installation
1️⃣ Clone the Repository
git clone https://github.com/yourusername/BookHive.git
cd BookHive

🔧 Backend Setup
cd backend
npm install

Create .env:
MONGO_URI=your_mongo_connection
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_SECRET_KEY=your_secret_key
CLOUDINARY_API_KEY=your_api_key
JWT_SECRET=your_secret_key
PORT=3000

Run Backend
npm start

🎨 Frontend Setup
cd frontend
npm install

Run Frontend
npm run dev


Your app will be available at:
👉 http://localhost:5173

🔥 API Endpoints (Sample)
Method	  Endpoint	                   Description
POST	   /api/user/sign-up	         Register new user
POST	   /api/user/sign-in	         Login user
GET	   /api/book/get-all-books	     Fetch all books
POST	  /api/book/add-book	        Add new book (Admin)
PUT	  /api/cart/add-to-cart	        Add book to cart
PUT	 /api/favourite/add-book-to-favourite	Add to favourites
POST	/api/order/place-order	       Place order

(Full API documentation coming soon)
