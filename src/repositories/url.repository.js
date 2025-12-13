import UrlModel from "../models/urlModel.js";

export default {
    async createUrl(shortCode, longUrl, expirationDate = null) {
        return UrlModel.create({
            shortCode,
            longUrl,
            expirationDate
        });
    },

    async findByShortCode(shortCode) {
        return UrlModel.findOne({ shortCode, isActive: true });
    },

    async incrementClick(shortCode) {
        return UrlModel.updateOne(
            { shortCode },
            { $inc: { clickCount: 1 } }
        );
    },

    async deactivate(shortCode) {
        return UrlModel.updateOne(
            { shortCode },
            { isActive: false }
        );
    }
};
