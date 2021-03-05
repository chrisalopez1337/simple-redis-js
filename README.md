# simple-redis-js
Simple Redis Cache in JS.

# How to install:
# `npm i simple-redis-js`

### Dev status
This library is not very flushed out and there are much more well thought out libraries, however I will be working on it and appreciate any pull requests, so feel free to contribute! This project will also not be constantly upkept, but will always be reliable.

# Async Based Example `recommended`
```javascript
    const { AsyncRedis } = require('simple-redis-js');
    
    // Default options
    const defaultOptions = {
        host: '127.0.0.1',
        port: 6379,
        keyPrefix: 'redis-',
    }

    
    // Async based client
    const asyncRedis = new AsyncRedis(/* can pass custom options here, leave blank for default options */);
    const key = 'example';
    const data = [ 'this', [ 'can', 'be' ], 'nested' ]; 
    
    // Basic examples, see docs for all methods and a deeper explination.
    const setExmaple = async () => {
        try {
            const res = await asyncRedis.set(key, data);
            /* res = 'OK', do something... */
        } catch(err) {
            throw new Error(err);
        }
    }

    const getExample = async () => {
        try {
            const res = await asyncRedis.get(key);
            /* response = [ 'this', [ 'can', 'be' ], 'nested' ], do something... */ 
        } catch(err) {
            throw new Error(err);
        }
    }
    
```

# Callback Based Example
```javascript
    const { Redis } = require('simple-redis-js');
    
    // Default options
    const defaultOptions = {
        host: '127.0.0.1',
        port: 6379,
        keyPrefix: 'redis-',
    }
    
    // Callback based client
    const redisWithCallbacks = new Redis(/* can pass custom options here, leave blank for default options */);
    const key = 'example';
    const data = [ 'this', [ 'can', 'be' ], 'nested' ]; 
    
    // Basic examples, see docs for all methods and a deeper explination.
    redisWithCallbacks.set(key, data, (err, response) => {
        if (err) {
            /* do something with err */
        } else {
            /* response = 'OK', do something... */
        }
    });

    redisWithCallbacks.get(key, data, (err, response) => {
        if (err) {
            /* do something with err */
        } else {
            /* response = [ 'this', [ 'can', 'be' ], 'nested' ], do something... */ 
        }
    });
```

