import express from "express";
import cors from "cors";
import morgan from "morgan";

export default async function expressLoader() {
    const app = express();

    // Middlewares
    app.use(express.json());
    app.use(cors());
    app.use(morgan("dev"));

    // Basic test route
    app.get("/", (req, res) => {
        res.send("URL Shortener Service is running");
    });

    return app;
}
