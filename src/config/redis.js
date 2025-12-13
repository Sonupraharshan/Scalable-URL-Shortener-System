import config from "./env.js";

export default {
    host: config.redisHost,
    port: config.redisPort,
    password: config.redisPassword
};
