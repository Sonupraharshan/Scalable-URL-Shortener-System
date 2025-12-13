import { createClient } from "redis";
import redisConfig from "../config/redis.js";

let redisClient;

export default async function redisLoader() {
    redisClient = createClient({
        socket: {
            host: redisConfig.host,
            port: redisConfig.port,
            reconnectStrategy: (retries) => {
                if (retries > 0) {
                    return new Error("Too many retries");
                }
                return 500; // wait 500ms then retry (optional, or just return Error immediately)
                // actually, to fail fast for optional check, maybe just return new Error
                // return new Error("Redis not available");
            }
        },
        password: redisConfig.password || undefined
    });

    redisClient.on("error", (err) => {
        console.error("Redis connection error:", err);
    });

    try {
        await redisClient.connect();
        console.log("Redis connected successfully");
    } catch (err) {
        console.warn("Redis connection failed (optional):", err.message);
        // We don't throw here to allow server to start
        // redisClient is created but not connected.
        // Consumers should check redisClient.isOpen or ready state.
    }

    return redisClient;
}

export { redisClient };
