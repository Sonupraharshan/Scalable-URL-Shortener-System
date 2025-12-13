import urlRepository from "../repositories/url.repository.js";
import urlCache from "../cache/url.cache.js";
import { generateShortCode } from "../utils/shortCodeGenerator.js";
import { isValidUrl } from "../utils/validators.js";

class UrlService {

    // 1. Create a short URL
    async createShortUrl(longUrl, customCode, expirationDate) {
        if (!isValidUrl(longUrl)) {
            throw new Error("Invalid URL format");
        }

        let shortCode = customCode || generateShortCode();

        // Check if custom code already exists
        const existing = await urlRepository.findByShortCode(shortCode);
        if (existing) {
            throw new Error("Short code already exists");
        }

        // Save to MongoDB
        const urlDoc = await urlRepository.createUrl(
            shortCode,
            longUrl,
            expirationDate || null
        );

        // Save to Redis cache
        await urlCache.set(shortCode, {
            longUrl: longUrl,
            isActive: true,
            expirationDate
        });

        return {
            shortCode,
            longUrl,
            expirationDate
        };
    }

    // 2. Redirect short URL → long URL
    async getLongUrl(shortCode) {
        // Step 1: Check Redis cache
        const cachedData = await urlCache.get(shortCode);

        if (cachedData) {
            // URL expired?
            if (cachedData.expirationDate && new Date() > new Date(cachedData.expirationDate)) {
                throw new Error("URL expired");
            }
            return cachedData.longUrl;
        }

        // Step 2: Check MongoDB
        const urlDoc = await urlRepository.findByShortCode(shortCode);
        if (!urlDoc) {
            throw new Error("Short URL not found");
        }

        // URL expired?
        if (urlDoc.expirationDate && new Date() > new Date(urlDoc.expirationDate)) {
            throw new Error("URL expired");
        }

        // Step 3: Cache it again for fast future redirects
        await urlCache.set(shortCode, {
            longUrl: urlDoc.longUrl,
            isActive: urlDoc.isActive,
            expirationDate: urlDoc.expirationDate
        });

        // Step 4: Increment analytics
        await urlRepository.incrementClick(shortCode);

        return urlDoc.longUrl;
    }

    // 3. Lookup without redirect
    async lookup(shortCode) {
        const urlDoc = await urlRepository.findByShortCode(shortCode);

        if (!urlDoc) {
            throw new Error("Short URL not found");
        }

        return urlDoc;
    }

    // 4. Disable URL
    async deactivate(shortCode) {
        await urlCache.delete(shortCode);
        await urlRepository.deactivate(shortCode);
        return { message: "URL disabled successfully" };
    }

}

export default new UrlService();
