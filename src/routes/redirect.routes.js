import express from "express";
import UrlController from "../controllers/url.controller.js";

const router = express.Router();

router.get("/:shortCode", UrlController.redirect);

export default router;
