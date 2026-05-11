// import express from "express";
// import cors from "cors";
// import "./db.js";
// import errorHandler from "./middleware/errorMiddleware.js";
// import authRouter from "./routes/auth.routes.js";
// import userRouter from "./routes/user.routes.js";
// import productRouter from "./routes/product.routes.js";
// import emailRouter from "./routes/email.routes.js";
// import orderRouter from "./routes/order.routes.js";
// import checkoutRoutes from "./routes/checkout.routes.js";
// import { stripeWebhook } from "./controllers/checkout.controller.js";

// const app = express();

// app.use(
//   cors({
//     origin: ["http://localhost:5173", 'https://tiarasbread.netlify.app'],
//     credentials: true,
//     methods: ["GET", "POST", "PATCH", "DELETE", "OPTIONS"],
//     allowedHeaders: ["Content-Type", "Authorization"],
//   }),
// );


// // ⚠️ Webhook MUST be registered before express.json() — needs raw buffer
// app.post(
//   "/api/v1/checkout/webhook",
//   express.raw({ type: "application/json" }),
//   stripeWebhook,
// );

// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

// // ROUTES

// app.use("/api/v1/auth", authRouter);
// app.use("/api/v1/users", userRouter);
// app.use("/api/v1/products", productRouter);
// app.use("/api/v1/email", emailRouter);
// app.use("/api/v1/checkout", checkoutRoutes);
// app.use("/api/v1/orders", orderRouter);

// app.use((req, res) => {
//   res.status(404).json({ message: "Route not found" });
// });

// app.use(errorHandler);

// app.listen(3000, () => {
//   console.log("Server is running on port 3000");
// });


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
import { stripeWebhook } from "./controllers/checkout.controller.js";

const app = express();

const corsOptions = {
  origin: ["http://localhost:5173", "https://tiarasbread.netlify.app"],
  credentials: true,
  methods: ["GET", "POST", "PATCH", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
};

app.use(cors(corsOptions));
// ✅ Explicitly handle preflight for ALL routes
app.options("/{*any}", cors(corsOptions));

// ⚠️ Webhook — raw buffer, registered before express.json()
app.post(
  "/api/v1/checkout/webhook",
  express.raw({ type: "application/json" }),
  stripeWebhook,
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/users", userRouter);
app.use("/api/v1/products", productRouter);
app.use("/api/v1/email", emailRouter);
app.use("/api/v1/checkout", checkoutRoutes);
app.use("/api/v1/orders", orderRouter);

app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});

app.use(errorHandler);

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});