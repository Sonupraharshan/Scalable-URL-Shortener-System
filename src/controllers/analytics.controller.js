import urlRepository from "../repositories/url.repository.js";

class AnalyticsController {

    async getAnalytics(req, res) {
        try {
            const { shortCode } = req.params;

            const data = await urlRepository.findByShortCode(shortCode);

            if (!data) {
                return res.status(404).json({
                    success: false,
                    error: "Short URL not found"
                });
            }

            return res.status(200).json({
                success: true,
                data: {
                    shortCode: data.shortCode,
                    longUrl: data.longUrl,
                    clickCount: data.clickCount,
                    createdAt: data.createdAt,
                    expirationDate: data.expirationDate
                }
            });

        } catch (err) {
            return res.status(500).json({
                success: false,
                error: "Server error"
            });
        }
    }

}

export default new AnalyticsController();
