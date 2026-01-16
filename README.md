# 🛍️ E-Commerce Platform

A modern, full-stack e-commerce application built with React and Node.js, featuring AI-powered recommendations, secure payments, analytics dashboard, and a beautiful user interface.

![License](https://img.shields.io/badge/license-ISC-blue.svg)
![Node](https://img.shields.io/badge/node-%3E%3D18.0.0-brightgreen.svg)
![React](https://img.shields.io/badge/react-19.1.1-blue.svg)

## ✨ Features

### 🎯 User Features
- **User Authentication & Authorization**
  - Secure signup and login with JWT tokens
  - Protected routes and role-based access control
  - Session management with refresh tokens

- **Product Catalog**
  - Browse products by categories (Jeans, T-shirts, Shoes, Glasses, Jackets, Suits, Bags)
  - Featured products showcase
  - Product details with images and descriptions
  - Category-based filtering

- **Shopping Cart**
  - Add/remove items from cart
  - Update quantities
  - Persistent cart storage
  - Real-time cart updates

- **AI-Powered Features**
  - **AI Chatbot**: Interactive shopping assistant powered by OpenAI GPT and Google Gemini
  - **AI Recommendations**: Personalized product recommendations using AI
  - Natural language product queries

- **Coupon System**
  - Apply discount coupons
  - User-specific coupon codes
  - Discount percentage tracking

- **Secure Payments**
  - Stripe payment integration
  - Secure checkout process
  - Success and cancellation handling
  - Order management

### 👨‍💼 Admin Features
- **Product Management**
  - Create new products with AI-generated descriptions
  - Upload product images via Cloudinary
  - Edit and manage existing products
  - Mark products as featured

- **Analytics Dashboard**
  - Total users, products, sales, and revenue metrics
  - Daily sales and revenue charts
  - Visual data representation with Recharts
  - 7-day sales trend analysis

- **AI Tools for Admins**
  - Generate product descriptions using OpenAI GPT or Google Gemini
  - Product sentiment analysis
  - AI-powered content creation

## 🛠️ Tech Stack

### Frontend
- **React 19.1.1** - UI library
- **Vite** - Build tool and dev server
- **React Router DOM** - Client-side routing
- **Zustand** - State management
- **TailwindCSS** - Utility-first CSS framework
- **Framer Motion** - Animation library
- **Axios** - HTTP client
- **React Hot Toast** - Toast notifications
- **Recharts** - Chart library for analytics
- **Stripe.js** - Payment processing
- **Lucide React** - Icon library

### Backend
- **Node.js** - Runtime environment
- **Express.js 5.1.0** - Web framework
- **MongoDB** - Database (via Mongoose)
- **Redis (ioredis)** - Caching and session storage
- **JWT** - Authentication tokens
- **bcryptjs** - Password hashing
- **Stripe** - Payment processing API
- **Cloudinary** - Image storage and management
- **OpenAI API** - AI chat and recommendations
- **Google Gemini API** - Alternative AI service

## 📁 Project Structure

```
ecommerce-final/
├── backend/
│   ├── controllers/          # Request handlers
│   │   ├── ai.controller.js
│   │   ├── analytics.controller.js
│   │   ├── auth.controller.js
│   │   ├── cart.controller.js
│   │   ├── coupon.controller.js
│   │   ├── payment.controller.js
│   │   └── product.controller.js
│   ├── lib/                  # Utility libraries
│   │   ├── cloudinary.js
│   │   ├── db.js
│   │   ├── gemini.js
│   │   ├── openai.js
│   │   ├── redis.js
│   │   └── stripe.js
│   ├── middleware/           # Custom middleware
│   │   └── auth.middleware.js
│   ├── models/               # Database models
│   │   ├── coupon.model.js
│   │   ├── order.model.js
│   │   ├── product.model.js
│   │   └── user.model.js
│   ├── routes/               # API routes
│   │   ├── ai.route.js
│   │   ├── analytics.route.js
│   │   ├── auth.route.js
│   │   ├── cart.route.js
│   │   ├── coupon.route.js
│   │   ├── payment.route.js
│   │   └── product.route.js
│   └── server.js            # Entry point
├── frontend/
│   ├── dist/                # Production build
│   ├── public/              # Static assets
│   ├── src/
│   │   ├── components/      # React components
│   │   │   ├── AIChatbot.jsx
│   │   │   ├── AIRecommendations.jsx
│   │   │   ├── AnalyticsTab.jsx
│   │   │   ├── CartItem.jsx
│   │   │   ├── CategoryItem.jsx
│   │   │   ├── CreateProductForm.jsx
│   │   │   ├── FeaturedProducts.jsx
│   │   │   ├── GiftCouponCard.jsx
│   │   │   ├── LoadingSpinner.jsx
│   │   │   ├── Navbar.jsx
│   │   │   ├── OrderSummary.jsx
│   │   │   ├── PeopleAlsoBought.jsx
│   │   │   ├── ProductCard.jsx
│   │   │   └── ProductsList.jsx
│   │   ├── lib/             # Utility functions
│   │   │   └── axios.js
│   │   ├── pages/           # Page components
│   │   │   ├── AdminPage.jsx
│   │   │   ├── CartPage.jsx
│   │   │   ├── CategoryPage.jsx
│   │   │   ├── HomePage.jsx
│   │   │   ├── LoginPage.jsx
│   │   │   ├── PurchaseCancelPage.jsx
│   │   │   ├── PurchaseSuccessPage.jsx
│   │   │   └── SignUpPage.jsx
│   │   ├── stores/          # Zustand state stores
│   │   │   ├── useCartStore.js
│   │   │   ├── useProductStore.js
│   │   │   └── useUserStore.js
│   │   ├── App.jsx          # Main app component
│   │   ├── index.css
│   │   └── main.jsx         # Entry point
│   ├── index.html
│   ├── package.json
│   ├── vite.config.js
│   └── README.md
├── package.json             # Root package.json
└── README.md               # This file
```

## 📋 Prerequisites

Before you begin, ensure you have the following installed:
- **Node.js** (v18.0.0 or higher)
- **npm** or **yarn**
- **MongoDB** (local or cloud instance like MongoDB Atlas)
- **Redis** (local or cloud instance like Upstash)

## 🚀 Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd ecommerce-final
   ```

2. **Install backend dependencies**
   ```bash
   npm install
   ```

3. **Install frontend dependencies**
   ```bash
   cd frontend
   npm install
   cd ..
   ```

## ⚙️ Environment Variables

Create a `.env` file in the root directory with the following variables:

```env
# Server Configuration
PORT=3000
NODE_ENV=development
CLIENT_URL=http://localhost:5173

# Database
MONGO_URI=your_mongodb_connection_string

# Redis
UPSTASH_REDIS_URL=your_upstash_redis_url

# JWT Secrets
ACCESS_TOKEN_SECRET=your_access_token_secret_key
REFRESH_TOKEN_SECRET=your_refresh_token_secret_key

# Stripe
STRIPE_SECRET_KEY=your_stripe_secret_key

# Cloudinary
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret

# OpenAI
OPENAI_API_KEY=your_openai_api_key

# Google Gemini
GEMINI_API_KEY=your_gemini_api_key
```

### How to get API keys:

- **MongoDB**: Create a free cluster at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
- **Redis**: Sign up at [Upstash](https://upstash.com/) for free Redis hosting
- **Stripe**: Get your API keys from [Stripe Dashboard](https://dashboard.stripe.com/apikeys)
- **Cloudinary**: Sign up at [Cloudinary](https://cloudinary.com/) for image hosting
- **OpenAI**: Get API key from [OpenAI Platform](https://platform.openai.com/api-keys)
- **Gemini**: Get API key from [Google AI Studio](https://aistudio.google.com/app/apikey)

## 🏃 Running the Application

### Development Mode

1. **Start the backend server**
   ```bash
   npm run dev
   ```
   The backend server will run on `http://localhost:3000`

2. **Start the frontend development server** (in a new terminal)
   ```bash
   cd frontend
   npm run dev
   ```
   The frontend will run on `http://localhost:5173`

### Production Mode

1. **Build the frontend**
   ```bash
   npm run build
   ```

2. **Start the production server**
   ```bash
   npm start
   ```
   The application will be served from the backend server on the configured PORT.

## 📡 API Routes

### Authentication (`/api/auth`)
- `POST /signup` - User registration
- `POST /login` - User login
- `POST /logout` - User logout
- `GET /check-auth` - Check authentication status
- `POST /refresh` - Refresh access token

### Products (`/api/products`)
- `GET /` - Get all products
- `GET /featured` - Get featured products
- `GET /category/:category` - Get products by category
- `GET /:id` - Get single product
- `POST /` - Create product (Admin only)
- `PUT /:id` - Update product (Admin only)
- `DELETE /:id` - Delete product (Admin only)

### Cart (`/api/cart`)
- `GET /` - Get user's cart items
- `POST /add` - Add item to cart
- `PUT /update/:productId` - Update cart item quantity
- `DELETE /remove/:productId` - Remove item from cart
- `DELETE /clear` - Clear entire cart

### Coupons (`/api/coupons`)
- `GET /my-coupon` - Get user's coupon
- `POST /apply` - Apply coupon code
- `DELETE /remove` - Remove applied coupon

### Payments (`/api/payments`)
- `POST /create-checkout-session` - Create Stripe checkout session
- `GET /verify/:sessionId` - Verify payment session

### Analytics (`/api/analytics`)
- `GET /` - Get analytics data (Admin only)

### AI (`/api/ai`)
- `POST /gpt/chat` - Chat with OpenAI GPT
- `POST /gpt/generate-description` - Generate product description (Admin)
- `POST /gpt/recommendations` - Get AI recommendations
- `POST /gemini/chat` - Chat with Google Gemini
- `POST /gemini/generate-description` - Generate product description (Admin)
- `POST /gemini/analyze-sentiment` - Analyze product sentiment (Admin)

## 🎨 Key Features Explained

### AI Chatbot
The AI chatbot is available on every page and can help users:
- Find products
- Get product recommendations
- Answer questions about the store
- Provide shopping assistance

### AI Recommendations
Personalized product recommendations are generated using AI based on user preferences and browsing history.

### Analytics Dashboard
Admin users can access a comprehensive analytics dashboard showing:
- Total registered users
- Total products in catalog
- Total sales count
- Total revenue
- 7-day sales and revenue trends

### Product Management
Admins can:
- Create products with AI-generated descriptions
- Upload product images to Cloudinary
- Mark products as featured
- Edit and delete products

### Secure Payment Flow
The application uses Stripe for secure payment processing:
1. User adds items to cart
2. Applies coupon (optional)
3. Creates Stripe checkout session
4. Completes payment on Stripe's secure page
5. Returns to success/cancel page based on result

## 🔒 Security Features

- Password hashing with bcryptjs
- JWT-based authentication with access and refresh tokens
- HTTP-only cookies for token storage
- Protected API routes with middleware
- Role-based access control (Admin/Customer)
- Secure payment processing with Stripe
- Input validation and sanitization

## 🎯 Future Enhancements

Potential features for future development:
- Email notifications
- Order tracking
- Product reviews and ratings
- Wishlist functionality
- Multi-language support
- Advanced search and filtering
- Inventory management
- Shipping integration

## 📝 License

This project is licensed under the ISC License.

## 👤 Author

Created with ❤️ for modern e-commerce experiences.

---

**Note**: Make sure to keep your `.env` file secure and never commit it to version control. All API keys should be kept private.

