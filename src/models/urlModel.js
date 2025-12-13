import mongoose from "mongoose";

const UrlSchema = new mongoose.Schema({
    shortCode: {
        type: String,
        required: true,
        unique: true,
        index: true
    },
    longUrl: {
        type: String,
        required: true
    },
    clickCount: {
        type: Number,
        default: 0
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    expirationDate: {
        type: Date,
        default: null
    },
    isActive: {
        type: Boolean,
        default: true
    }
});

// Optional TTL index if expirationDate exists
UrlSchema.index({ expirationDate: 1 }, { expireAfterSeconds: 0 });

const UrlModel = mongoose.model("Url", UrlSchema);

export default UrlModel;
