import dotenv from "dotenv";
dotenv.config();

export default {
    port: process.env.PORT,
    mongoUri: process.env.MONGO_URI,
    redisHost: process.env.REDIS_HOST,
    redisPort: process.env.REDIS_PORT,
    redisPassword: process.env.REDIS_PASSWORD
};
