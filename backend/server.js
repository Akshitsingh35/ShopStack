import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import { connectDB } from './lib/db.js';


//routes

import authRoutes from './routes/auth.route.js';
import productRoutes from './routes/product.route.js';
import cartRoutes from './routes/cart.route.js';
import couponRoutes from './routes/coupon.route.js';
import paymentRoutes from "./routes/payment.route.js";
import analyticsRoutes from "./routes/analytics.route.js";
import aiRoutes from "./routes/ai.route.js";
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();
const app = express();

const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json({ limit: '50mb' })); // Parse JSON bodies
app.use(cookieParser()); // Parse cookies


//auth
app.use("/api/auth", authRoutes)
app.use("/api/products", productRoutes)
app.use("/api/cart", cartRoutes)
app.use("/api/coupons", couponRoutes)
app.use("/api/payments", paymentRoutes);
app.use("/api/analytics", analyticsRoutes);
app.use("/api/ai", aiRoutes);

if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "../../frontend/dist")));
    app.get(/^\/(?!api).*/, (req, res) => {
        res.sendFile(path.resolve(__dirname, "../../frontend/dist/index.html"));
    });
}

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    connectDB();
})
//Nt0OboiL05p5JEEd