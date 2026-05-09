import { sendEmailToAdmin } from "../controllers/email.controller.js";
import express from "express";

const router = express.Router();

router.post("/send-email", sendEmailToAdmin);

export default router;
