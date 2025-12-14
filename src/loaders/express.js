import express from "express";
import cors from "cors";
import morgan from "morgan";

import urlRoutes from "../routes/url.routes.js";
import analyticsRoutes from "../routes/analytics.routes.js";
import redirectRoutes from "../routes/redirect.routes.js";

import rateLimiter from "../middleware/rateLimiter.js";
import errorHandler from "../middleware/errorHandler.js";

export default async function expressLoader() {
    const app = express();

    // Global middlewares
    app.use(express.json());
    app.use(cors());
    app.use(morgan("dev"));
    app.use(rateLimiter); // Apply to all requests

    // API Routes
    app.use("/api/v1", urlRoutes);
    app.use("/api/v1/analytics", analyticsRoutes);

    // Redirect Route (must be last)
    app.use("/", redirectRoutes);

    // Global Error Handler (last middleware)
    app.use(errorHandler);

    return app;
}
