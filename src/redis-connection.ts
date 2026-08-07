import { Redis } from "ioredis";

function creatRedisConnection() {
    return new Redis({
        host: 'localhost',
        port: 6379,
    })
}

export const redis = creatRedisConnection()

export const publisher = creatRedisConnection();
export const subscriber = creatRedisConnection();

