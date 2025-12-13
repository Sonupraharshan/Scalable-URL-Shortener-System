const rateLimitMap = new Map();

// Limit: 100 requests per 15 minutes per IP
const WINDOW = 15 * 60 * 1000;
const LIMIT = 100;

export default function rateLimiter(req, res, next) {
    const ip = req.ip;

    const currentTime = Date.now();
    const requestLog = rateLimitMap.get(ip) || [];

    // Filter requests older than window
    const recentRequests = requestLog.filter(timestamp => currentTime - timestamp < WINDOW);

    if (recentRequests.length >= LIMIT) {
        return res.status(429).json({
            success: false,
            error: "Too many requests. Please try again later."
        });
    }

    recentRequests.push(currentTime);
    rateLimitMap.set(ip, recentRequests);

    next();
}
