const redis = require("redis");
const { promisify } = require("util");


//Connect to redis
const redisClient = redis.createClient(
    11093,
    "redis-11093.c212.ap-south-1-1.ec2.cloud.redislabs.com",
    { no_ready_check: true }
);
redisClient.auth("GARYSoIEDN7XKxEe5AjFo2yk2prg0KNf", function (err) {
    if (err) throw err;
});

redisClient.on("connect", async function () {
    console.log("Connected to Redis..");
});

const SETEX_ASYNC = promisify(redisClient.SETEX).bind(redisClient);
const GET_ASYNC = promisify(redisClient.GET).bind(redisClient);

module.exports = {SETEX_ASYNC, GET_ASYNC}