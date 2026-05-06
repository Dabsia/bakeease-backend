import express from "express";
import {
  createCheckoutSession,
  verifyPayment,
} from "../controllers/checkout.controller.js";

const router = express.Router();

router.post("/create-session", createCheckoutSession);
router.get("/success", verifyPayment);

export default router;
