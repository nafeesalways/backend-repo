# ⚙️ Product Management API (Backend)

The backend service for the Real-Time Product Management Dashboard. Built with **Node.js**, **Express**, and **TypeScript**, handling authentication, JWT generation, and secure interactions with **Firebase Admin SDK**.

🔗 **Live Base URL:** [https://backend-repo.vercel.app](https://backend-repo.vercel.app)

## 🔑 Key Features

- **🛡 JWT Authentication:** Secure token generation and cookie management (HttpOnly, Secure, SameSite).
- **🔥 Firebase Admin Integration:** Server-side operations for Firestore database.
- **📡 RESTful API:** Endpoints for CRUD operations on products.
- **🔒 CORS Configuration:** Secure Cross-Origin Resource Sharing setup for the frontend.
- **⚡ Serverless Ready:** Optimized for deployment on Vercel/Render.

## 🛠 Tech Stack

- **Runtime:** Node.js
- **Framework:** Express.js
- **Language:** TypeScript
- **Database:** Firebase Firestore (Admin SDK)
- **Auth:** JSON Web Token (JWT)

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or higher)
- Firebase Service Account Key

### Installation

1. **Clone the repository:**

2. **Install dependencies:**


3. **Configure Environment Variables:**
Create a `.env` file in the root directory:


4. **Run the server:**


## 📡 API Endpoints

| Method | Endpoint          | Description               | Access  |
| :---   | :---              | :---                      | :---    |
| POST   | `/auth/login`     | User login & JWT cookie   | Public  |
| POST   | `/auth/logout`    | Clear auth cookie         | Public  |
| GET    | `/products`       | Get all products          | Private |
| POST   | `/products`       | Add a new product         | Private |
| PUT    | `/products/:id`   | Update product details    | Private |
| DELETE | `/products/:id`   | Delete a product          | Private |

## 📂 Folder Structure


## 🚀 Deployment

This project is configured to be deployed on **Vercel** as a serverless function.

1. Add `FIREBASE_SERVICE_ACCOUNT` (JSON content) to Vercel Environment Variables.
2. Add `JWT_SECRET` and `FRONTEND_URL`.
3. Deploy!


