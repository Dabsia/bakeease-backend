import express from "express";
import cors from "cors";
import "./db.js";
import errorHandler from "./middleware/errorMiddleware.js";
import authRouter from "./routes/auth.routes.js";
import userRouter from "./routes/user.routes.js";
import productRouter from "./routes/product.routes.js";
import emailRouter from "./routes/email.routes.js";
import orderRouter from "./routes/order.routes.js";
import checkoutRoutes from "./routes/checkout.routes.js";
import dateRouter from './routes/date.routes.js'

const app = express();

app.use(
  cors({
    origin: ["http://localhost:5173", 'https://tiarasbread.netlify.app'],
    credentials: true,
    methods: ["GET", "PUT", "POST", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  }),
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ROUTES

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/users", userRouter);
app.use("/api/v1/products", productRouter);
app.use("/api/v1/email", emailRouter);
app.use("/api/v1/checkout", checkoutRoutes);
app.use("/api/v1/orders", orderRouter);
app.use('/api/v1/date', dateRouter)

app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});

app.use(errorHandler);

app.listen(3000, '0.0.0.0', () => {
  console.log("Server is running on port 3000");
});
