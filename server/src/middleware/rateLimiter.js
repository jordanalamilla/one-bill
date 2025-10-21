/**
 * Rate Limiter Middleware
 * 
 * The middleware function that implements the rate limiter.
 */

import ratelimit from '../config/upstash.js';

const rateLimiter = async (_, res, next) => {
    try {
        // Run the rate limiter. If the limit is reached, throw 429. If not, move on.
        const { success } = await ratelimit.limit("oneBill"); // TODO: Switch the "oneBill" identifier for User ID.
        if (!success) return res.status(429).json({ "message": "Too many requests" });
        next();

    } catch (error) {
        console.log("Error in the rate limiter middleware: ", error);
        next(error);
    }
}

export default rateLimiter;