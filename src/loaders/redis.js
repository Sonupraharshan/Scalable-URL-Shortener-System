import { createClient } from "redis";

let redisClient;

export default async function redisLoader() {
    console.log("Redis disabled (temporary)");
    if (redisClient) return redisClient;

    redisClient = createClient({
        socket: {
            host: process.env.REDIS_HOST || "127.0.0.1",
            port: process.env.REDIS_PORT || 6379,
            reconnectStrategy: (retries) => {
                console.log(`Redis reconnecting... attempt ${retries}`);
                return Math.min(retries * 100, 3000);
            }
        },
        password: process.env.REDIS_PASSWORD
    });

    redisClient.on("error", (err) => {
        console.error("Redis error:", err.message);
    });

    redisClient.on("connect", () => {
        console.log("Redis connected");
    });

    await redisClient.connect();
    return redisClient;
}

export function getRedisClient() {
    if (!redisClient) {
    throw new Error("Redis not initialized");
    }
    return redisClient;
}
