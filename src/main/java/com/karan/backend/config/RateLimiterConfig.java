package com.karan.backend.config;

import io.github.bucket4j.Bandwidth;
import io.github.bucket4j.Bucket;
import io.github.bucket4j.Bucket4j;
import io.github.bucket4j.Refill;
import java.time.Duration;

@SuppressWarnings("deprecation")
public class RateLimiterConfig {

	public static Bucket createRateLimiter() {
		long capacity = 5; // Maximum number of requests allowed
	    Duration refillPeriod = Duration.ofSeconds(10); // Time period for refilling tokens
	    long refillTokens = 1; // Number of tokens to refill
	    Refill refill = Refill.of(refillTokens, refillPeriod);
	    Bandwidth limit = Bandwidth.classic(capacity, refill);

	    return Bucket4j.builder()
	            .addLimit(limit)
	            .build();
    }
}