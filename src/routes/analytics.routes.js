import express from "express";
import AnalyticsController from "../controllers/analytics.controller.js";

const router = express.Router();

router.get("/:shortCode", AnalyticsController.getAnalytics);

export default router;
