import urlService from "../services/url.service.js";

class UrlController {

    // 1. Create short URL
    async createShortUrl(req, res) {
        try {
            const { longUrl, customCode, expirationDate } = req.body;

            const result = await urlService.createShortUrl(
                longUrl,
                customCode,
                expirationDate
            );

            return res.status(201).json({
                success: true,
                data: {
                    shortCode: result.shortCode,
                    shortUrl: `${req.protocol}://${req.get("host")}/${result.shortCode}`,
                    longUrl: result.longUrl,
                    expirationDate: result.expirationDate
                }
            });

        } catch (err) {
            return res.status(400).json({
                success: false,
                error: err.message
            });
        }
    }

    // 2. Redirect API (GET /:shortCode)
    async redirect(req, res) {
        try {
            const { shortCode } = req.params;

            const longUrl = await urlService.getLongUrl(shortCode);

            return res.redirect(longUrl);

        } catch (err) {
            if (err.message === "URL expired") {
                return res.status(410).json({ success: false, error: "URL has expired" });
            }
            return res.status(404).json({
                success: false,
                error: "Short URL not found"
            });
        }
    }

    // 3. Lookup without redirect
    async lookup(req, res) {
        try {
            const { shortCode } = req.params;

            const data = await urlService.lookup(shortCode);

            return res.status(200).json({
                success: true,
                data
            });

        } catch (err) {
            return res.status(404).json({
                success: false,
                error: "Short URL not found"
            });
        }
    }

    // 4. Disable URL
    async deactivate(req, res) {
        try {
            const { shortCode } = req.params;

            await urlService.deactivate(shortCode);

            return res.status(200).json({
                success: true,
                message: "URL disabled"
            });

        } catch (err) {
            return res.status(500).json({
                success: false,
                error: "An error occurred"
            });
        }
    }
}

export default new UrlController();
