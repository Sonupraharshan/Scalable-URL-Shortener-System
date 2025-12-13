import express from "express";
import UrlController from "../controllers/url.controller.js";

const router = express.Router();

// Create short URL
router.post("/shorten", UrlController.createShortUrl);

// Lookup URL info
router.get("/lookup/:shortCode", UrlController.lookup);

// Disable URL
router.delete("/:shortCode", UrlController.deactivate);

export default router;
