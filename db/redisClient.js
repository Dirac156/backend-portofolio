import dotenv from 'dotenv';

dotenv.config();

import redis from 'redis';
import { promisify } from 'util';

class RedisClient  {

    constructor() {
        this.client = redis.createClient(process.env.REDIS_URL);
        this.client.on('error', (error) => {
            console.log(`Redis client not connected to the server: ${error}`);
        });
        this.getAsync = promisify(this.client.get).bind(this.client);
    };

    isAlive() {
        return this.client.connected;
    }

    async get(key) {
        return await this.getAsync(key);
    }

    async set(key, value, duration) {
        this.client.set(key, value);
        this.client.expire(key, duration);
    }

    async del(key) {
        this.client.del(key);
    }
};

const redisClient = new RedisClient();

export default redisClient;
