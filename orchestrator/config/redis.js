const Redis = require("ioredis");
const redis = new Redis({
  port: 18120, // Redis port
  host: "redis-18120.c252.ap-southeast-1-1.ec2.cloud.redislabs.com", // Redis host
  username: "default", // needs Redis >= 6
  password: "G37aD41WgMc6DTiI84RyGHXUgUWTVzn7",
  db: 0, // Defaults to 0
});

module.exports = redis;
