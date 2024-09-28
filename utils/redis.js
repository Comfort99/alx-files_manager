import redis from 'redis';
import { promisify } from  'util';

/**
 * Class RedisClient to Institiate Redis Services
 */

class RedisClient {
    /**
     * Redis instances
     */
    constructor() {
        this.client = redis.createClient();
        this.getAsync = promisify(this.client.get).bind(this.client);

        this.client.on('connect', () => {
            console.log('Redis client connected to the server');
        });

        this.client.on('error', (err) => {
            console.log('Redis client not connected to the server', err);
        });
    }

    /**
     * A boolean function to check the Redis connection
     */
    isAlive() {
        return this.client.connected;
    }

    /**
     * A Redis function to get value crosponding to the key
     * @param {string} key to search the value
     * @return {Promise<string>} value crosponnding to the value
     */
    async get(key) {
        const value = await this.getAsync(key);
        return value;
    }

    /**
     * A Redis function that used redis.set instances to set key/value
     * @param {string} key - the key to save in Redis store
     * @param {string} value - the value associated with the key
     */
    async set(key, value, duration) {
        this.client.setex(key, duration, value);
    }

    /**
     * Del function to delete a Redis key value
     * @param {key} key - the key to be deleted
     */

    async del(key) {
        this.client.del(key)
    }
}

const redisClient = new RedisClient;
module.exports = redisClient;
