import { createClient } from "redis";

let redisClient;

export default async function redisLoader() {
  if (redisClient) return redisClient;

  const {
    REDIS_HOST,
    REDIS_PORT,
    REDIS_PASSWORD
  } = process.env;

  if (!REDIS_HOST || !REDIS_PORT || !REDIS_PASSWORD) {
    throw new Error("Redis environment variables are not set");
  }

  redisClient = createClient({
    socket: {
      host: REDIS_HOST,
      port: Number(REDIS_PORT)
    },
    password: REDIS_PASSWORD
  });

  redisClient.on("connect", () => {
    console.log("Redis connected");
  });

  redisClient.on("error", (err) => {
    console.error("Redis error:", err.message);
  });

  await redisClient.connect();
  return redisClient;
}

export function getRedisClient() {
  if (!redisClient) {
    throw new Error("Redis client not initialized");
  }
  return redisClient;
}
