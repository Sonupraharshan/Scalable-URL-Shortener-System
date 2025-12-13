export default function errorHandler(err, req, res, next) {
    console.error("Unhandled Error:", err);

    return res.status(500).json({
        success: false,
        error: "Internal Server Error"
    });
}
