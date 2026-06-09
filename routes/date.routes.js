import express from "express";
import { getDate, updateDate } from "../controllers/date.controller.js";

import { adminOnly, protect } from "../middleware/index.js";

const router = express.Router();

router.get("/", getDate);
router.put('/', protect, adminOnly, updateDate)

export default router;