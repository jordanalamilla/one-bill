/**
 * Upstash Rate Limiter Configuration
 * 
 * Setup for Upstash, Redis and the rate limiter.
 */

import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from '@upstash/redis';

// Ratelimiter that allows 10 requests per 10 seconds
const ratelimit = new Ratelimit({
    redis: Redis.fromEnv(),
    limiter: Ratelimit.slidingWindow(10, "20 s")
});

export default ratelimit;