
import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import authRoutes from './routes/authRoutes';
import productRoutes from './routes/productRoutes';

dotenv.config(); // .env লোড করা

const app = express();
const PORT = process.env.PORT || 5000;

// --- Middlewares ---
app.use(express.json());
app.use(cookieParser());


app.use(cors({
  origin: [
    'https://frontend-repo-lemon.vercel.app', 
    'http://localhost:3000'
  ],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'Origin', 'X-Requested-With', 'Accept']
}));

// বাকি কোড একই থাকবে...


// --- Routes ---
app.use('/auth', authRoutes);       // e.g., localhost:5000/auth/login
app.use('/products', productRoutes); // e.g., localhost:5000/products (POST/PUT/DELETE)

// Health Check Route
app.get('/', (req, res) => {
  res.send('Backend Server is Running...');
});

// // --- Start Server ---
// app.listen(PORT, () => {
//   console.log(`✅ Server running on http://localhost:${PORT}`);
// });



// app.listen অংশটি কমেন্ট করে দিন অথবা শুধু লোকাল এনভায়রনমেন্টের জন্য রাখুন
if (process.env.NODE_ENV !== 'production') {
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

// অবশ্যই app এক্সপোর্ট করতে হবে
export default app;

