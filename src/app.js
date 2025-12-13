import expressLoader from "./loaders/express.js";
import mongooseLoader from "./loaders/mongoose.js";
import redisLoader from "./loaders/redis.js";

async function startServer() {
    try {
        // 1. Connect to MongoDB
        await mongooseLoader();

        // 2. Connect to Redis
        await redisLoader();

        // 3. Initialize Express app
        const app = await expressLoader();

        const PORT = process.env.PORT || 3000;

        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });

    } catch (err) {
        console.error("Failed to start server:", err);
        process.exit(1);
    }
}

startServer();
