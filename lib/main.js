import redis from 'redis';
import { promisify } from 'util';

const defaultOptions = {
    host: '127.0.0.1',
    port: '6379',
    keyPrefix: 'redis-',
};

export class Redis {
    constructor(options = false) {
        this.options = options || defaultOptions; 
        this.client = redis.createClient(this.options);
        this.prefix = this.options.prefix;
        this.client.on('error', (err) => console.log(err));
    }

    set(key, value, cb) {
        this.client.set(this.prefix + key, JSON.stringify(value), cb);
    }

    setex(key, value, ttl, cb) {
        this.client.setex(this.prefix + key, ttl, JSON.stringify(value), cb);
    }

    get(key, cb) {
        this.client.get(this.prefix + key, (err, docs) => {
            if (err) {
                cb(err);
            } else {
                cb(null, JSON.parse(docs));
            }
        });
    }

    flush(cb) {
        this.client.flushdb(cb);
    }
};

export class AsyncRedis {
    constructor(options = false) {
        this.options = options || defaultOptions;
        this.client = redis.createClient(this.options);
        this.prefix = this.options.prefix;
        this.client.on('error', (err) => console.log(err));
    }

    async set(key, value) {
        try {
            const setAsync = promisify(this.client.set).bind(this.client);
            await setAsync(this.prefix + key, JSON.stringify(value));
            return true;
        } catch(err) {
            throw new Error(err);
        }
    }

    async setex(key, value, ttl) {
        try {
            const setexAsync = promisify(this.client.setex).bind(this.client);
            await setexAsync(this.prefix + key, ttl, JSON.stringify(value));
            return true;
        } catch(err) {
            throw new Error(err);
        }
    }

    async get(key) {
        try {
            const getAsync = promisify(this.client.get).bind(this.client);
            const data = await getAsync(this.prefix + key);
            return JSON.parse(data);
        } catch(err) {
            throw new Error(err);
        }
    }

    async flush() {
        try {
            const flushAsync = promisify(this.client.flushdb).bind(this.client);
            await flushAsync();
            return true;
        } catch(err) {
            throw new Error(err);
        }
    }
};
