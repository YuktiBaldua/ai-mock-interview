import arcjet, { tokenBucket, shield, detectBot } from "@arcjet/next";

const aj = arcjet({
  key: process.env.ARCJET_KEY!,
  characteristics: ["userId"],
  rules: [
    // Rate limiting for API endpoints
    tokenBucket({
      mode: "LIVE",
      refillRate: 10,
      interval: 60,
      capacity: 100,
    }),
    // Shield protection against common attacks
    shield({
      mode: "LIVE",
    }),
    // Bot detection
    detectBot({
      mode: "LIVE",
      allow: [], // Allow specific bots if needed
    }),
  ],
});

export default aj;
