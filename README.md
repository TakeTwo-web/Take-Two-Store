# Take Two - Enterprise E-Commerce Backend

A production-ready, scalable Node.js + Express + MongoDB backend for e-commerce applications.

## 🚀 Features

### Core Features
- User Authentication (JWT + Refresh Tokens)
- Product Management (CRUD, Categories, Search)
- Shopping Cart
- Order Management
- Stripe Payment Integration

### Enterprise Features
- **Admin Dashboard** - Analytics, User Management, Order Management
- **Logging** - Winston with daily rotation
- **Security** - Helmet, CORS, Rate Limiting, XSS Protection
- **API Documentation** - Swagger UI
- **Docker Support** - Multi-stage build
- **CI/CD** - GitHub Actions
- **Testing** - Jest + Supertest

## 📁 Project Structure

```
take-two-backend/
├── config/
│   ├── db.js              # MongoDB connection
│   ├── logger.js          # Winston logger config
│   └── swagger.js         # Swagger API docs
├── controllers/
│   ├── adminController.js # Admin dashboard endpoints
│   ├── authController.js  # Authentication
│   ├── cartController.js # Cart management
│   ├── orderController.js # Order management
│   ├── paymentController.js# Stripe payment
│   └── productController.js# Product CRUD
├── middleware/
│   ├── auth.js           # JWT authentication
│   ├── errorHandler.js  # Global error handler
│   └── validate.js       # Input validation
├── models/
│   ├── Cart.js
│   ├── Order.js
│   ├── Product.js
│   └── User.js
├── routes/
│   ├── adminRoutes.js
│   ├── authRoutes.js
│   ├── cartRoutes.js
│   ├── orderRoutes.js
│   ├── paymentRoutes.js
│   ├── productRoutes.js
│   └── userRoutes.js
├── utils/
│   ├── asyncHandler.js
│   ├── ErrorResponse.js
│   └── pagination.js
├── tests/
│   └── app.test.js
├── .github/
│   └── workflows/
│       └── deploy.yml
├── Dockerfile
├── docker-compose.yml
├── render.yaml
├── jest.config.js
├── package.json
└── server.js
```

## 🛠️ Setup

### Prerequisites
- Node.js 18+
- MongoDB (local or Atlas)
- Stripe Account (for payments)

### Installation

```
bash
# Clone the repository
cd take-two-backend

# Install dependencies
npm install

# Create .env file
cp .env.example .env

# Start development server
npm run dev
```

## ⚙️ Environment Variables

See `.env.example` for all required variables:

```
env
# Required
NODE_ENV=development
PORT=5000
MONGO_URI=mongodb+srv://...
JWT_SECRET=your_32_char_minimum_secret
JWT_REFRESH_SECRET=your_32_char_minimum_refresh_secret
STRIPE_SECRET_KEY=sk_test_...
STRIPE_PUBLISHABLE_KEY=pk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...
CLIENT_URL=http://localhost:3000
CORS_ORIGIN=http://localhost:3000
```

## 📝 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login
- `POST /api/auth/refresh` - Refresh token
- `POST /api/auth/logout` - Logout

### Products
- `GET /api/products` - List products (with pagination)
- `GET /api/products/:id` - Get product
- `POST /api/products` - Create product (Admin)
- `PUT /api/products/:id` - Update product (Admin)
- `DELETE /api/products/:id` - Delete product (Admin)

### Cart
- `GET /api/cart` - Get cart
- `POST /api/cart` - Add to cart
- `PUT /api/cart/:productId` - Update quantity
- `DELETE /api/cart/:productId` - Remove item

### Orders
- `POST /api/orders` - Create order
- `GET /api/orders` - Get user orders
- `GET /api/orders/:id` - Get order details

### Payments
- `POST /api/payments/create-checkout-session` - Create Stripe session
- `GET /api/payments/verify/:sessionId` - Verify payment
- `POST /api/payments/webhook` - Stripe webhook

### Admin
- `GET /api/admin/dashboard` - Dashboard statistics
- `GET /api/admin/top-products` - Top selling products
- `GET /api/admin/analytics` - Sales analytics
- `GET /api/admin/users` - All users
- `GET /api/admin/orders` - All orders

### Documentation
- Swagger UI: `/api-docs`
- Swagger JSON: `/api-docs.json`

## 🐳 Docker

```
bash
# Build Docker image
docker build -t take-two-backend .

# Run container
docker run -p 5000:5000 take-two-backend

# Or use docker-compose
docker-compose up
```

## ☁️ Deployment

### Render
1. Connect GitHub repository to Render
2. Add environment variables in Render dashboard
3. Deploy automatically on push to main

### Manual
```
bash
# Production
npm start
```

## ✅ Testing

```
bash
# Run tests
npm test

# Run with coverage
npm test -- --coverage
```

## 📄 License

ISC
