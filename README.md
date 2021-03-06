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
    const setExample = async () => {
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
# Documentation

## `Creating a client`

### Using dynamic options
Note: If the constructor is left blank, then the `defaultOptions` listed below will be applied.
```javascript
    const { Redis, AsyncRedis } = require('simple-redis-js');
    
    // The default options if constructor is left empty or is falsy.
    const defaultOptions = {
        host: '127.0.0.1',
        port: 6379,
        keyPrefix: 'redis-',
    }

    // To use a client with default options
    const asyncRedis = new AsyncRedis();
    const callbackRedis = new Redis();

    // Using dynamic options
    const customOptions = {
        host: 'Connection Adress',
        port: 6379,
        keyPrefix: 'Custom key prefix',
        Any other options...
    } 
    
    // To use a client with custom options
    const customAsyncRedis = new AsyncRedis(customOptions);
    const customCallbackRedis = new Redis(customOptions);
```

## `set()`
Info: This method sets data into your redis client, it accepts nested or non nested structures by implenting `JSON.stringify()`.

### Arguments
- Key: String
- Data: Any datastructure 
- FOR CALLBACK CLIENT ONLY: callback function(error, response) {}

### Async/Await Usage
```javascript
    const { AsyncRedis } = require('simple-redis-js');
    
    const redis = new AsyncRedis();
    const key = 'example';
    const data = [ 1, 2, 3 ];

    const main = async () => {
        try {
            const response = await redis.set(key, data);
            /* do something with the response... */ 
        } catch(err) {
            throw new Error(err);
        }
    }
```

### Callback based Usage
```javascript
    const { Redis } = require('simple-redis-js');
    
    const redis = new Redis();
    const key = 'example';
    const data = [ 1, 2, 3 ];

    redis.set(key, data, (err, response) => {
        if (err) {
            throw new Error(err);
        } else {
            /* do something with the response... */ 
        }
    });
```

## `get()`
Info: This method will return data from your DB if it exists. It uses `JSON.parse()` to retrieve nested structures that have been stringified.

### Arguments
- Key: String
- FOR CALLBACK CLIENT ONLY: callback function(error, response) {}

### Async/Await Usage
```javascript
    const { AsyncRedis } = require('simple-redis-js');
    
    const redis = new AsyncRedis();
    const key = 'example';
    const data = [ 1, 2, 3 ];

    const main = async () => {
        try {
            // Store some data in the DB
            await redis.set(key, data);
            
            // Retrieve that data
            const response = await redis.get(key);
            /* do something with the response... */ 
        } catch(err) {
            throw new Error(err);
        }
    }
```

### Callback based Usage
```javascript
    const { Redis } = require('simple-redis-js');
    
    const redis = new Redis();
    const key = 'example';
    const data = [ 1, 2, 3 ];
    
    // After some data is set into the db
    redis.set(key, data, (err, response) => {
        if (err) {
            throw new Error(err);
        } else {
            // Retrieve that data
            redis.get(key, (err, data) => {
                if (err) {
                    throw new Error(err);
                } else {
                    /* do something with data */ 
                }
            })
        }
    });
```

## `setex()`
Info: This method sets data into your redis client with an expiry time (ttl), it accepts nested or non nested structures by implenting `JSON.stringify()`.

### Arguments
- Key: String
- Data: Any datastructure 
- ttl: Integer
- FOR CALLBACK CLIENT ONLY: callback function(error, response) {}

### Async/Await Usage
```javascript
    const { AsyncRedis } = require('simple-redis-js');
    
    const redis = new AsyncRedis();
    const key = 'example';
    const data = [ 1, 2, 3 ];
    const ttl = 1000;

    const main = async () => {
        try {
            const response = await redis.setex(key, data, ttl);
            /* do something with the response... */ 
        } catch(err) {
            throw new Error(err);
        }
    }
```

### Callback based Usage
```javascript
    const { Redis } = require('simple-redis-js');
    
    const redis = new Redis();
    const key = 'example';
    const data = [ 1, 2, 3 ];
    const ttl = 1000;

    redis.set(key, data, ttl, (err, response) => {
        if (err) {
            throw new Error(err);
        } else {
            /* do something with the response... */ 
        }
    });
```

## `flush()`
Info: Clears all data from your DB.

### Arguments
- FOR CALLBACK CLIENT ONLY: callback function(error, response) {}

### Async/Await Usage
```javascript
    const { AsyncRedis } = require('simple-redis-js');
    
    const redis = new AsyncRedis();

    const main = async () => {
        try {
            const response = await redis.flush();
            /* do something with the response... */ 
        } catch(err) {
            throw new Error(err);
        }
    }
```

### Callback based Usage
```javascript
    const { Redis } = require('simple-redis-js');
    
    const redis = new Redis();

    redis.flush((err, response) => {
        if (err) {
            throw new Error(err);
        } else {
            /* do something with the response... */ 
        }
    });
```
