import { isValidUrl } from "../utils/validators.js";

export default function validateUrl(req, res, next) {
    const { longUrl } = req.body;

    if (!longUrl || !isValidUrl(longUrl)) {
        return res.status(400).json({
            success: false,
            error: "Invalid URL"
        });
    }

    next();
}
