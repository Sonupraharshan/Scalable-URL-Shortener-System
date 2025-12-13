import { redisClient } from "../loaders/redis.js";

// TTL: how long cache should exist (in seconds)
const DEFAULT_TTL = 86400; // 24 hours

export default {
    async get(shortCode) {
        const key = `url:${shortCode}`;
        const data = await redisClient.get(key);

        if (!data) return null;

        return JSON.parse(data);
    },

    async set(shortCode, urlData) {
        const key = `url:${shortCode}`;
        await redisClient.setEx(key, DEFAULT_TTL, JSON.stringify(urlData));
    },

    async delete(shortCode) {
        const key = `url:${shortCode}`;
        await redisClient.del(key);
    }
};
