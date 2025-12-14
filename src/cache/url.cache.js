import { getRedisClient } from "../loaders/redis.js";


// TTL: how long cache should exist (in seconds)
const DEFAULT_TTL = 86400; // 24 hours

export default {
    async get(shortCode) {
        const redisClient = getRedisClient();
        const key = `url:${shortCode}`;
        const data = await redisClient.get(key);
        return data ? JSON.parse(data) : null;
    },

    async set(shortCode, urlData) {
        const redisClient = getRedisClient();
        const key = `url:${shortCode}`;
        await redisClient.setEx(key, 86400, JSON.stringify(urlData));
    },

    async delete(shortCode) {
        const redisClient = getRedisClient();
        await redisClient.del(`url:${shortCode}`);
    }
};

