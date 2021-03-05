const { Redis, AsyncRedis } = require('../lib/main.js');
const { expect } = require('chai');
const assert = require('assert');

const callbackOptions = {
    host: '127.0.0.1',
    port: 6379,
    keyPrefix: 'customKey-',
}
const rCallback = new Redis(callbackOptions);
const key = 'test';
const data = [ 1, 2, 3 ];
const setexKey = 'test1';
const ttl = 1000;

describe('Callback Based Redis Client', () => {
    it('Should accept dynamic options', () => {
        const expectedKey = 'customKey-';
        const actual = rCallback.options.keyPrefix;
        expect(actual).to.equal(expectedKey);
    });

    it('Should be able to set data', () => {
        rCallback.set(key, data, (err, res) => {
            expect(res).to.equal('OK');    
        });
    });

    it('Should be able to retrieve data', () => {
        rCallback.get(key, (err, res) => {
            assert.deepEqual(res, data);
        });
    });

    it('Should be able to set data with an expiry', () => {
        rCallback.setex(setexKey, data, ttl, (err, res) => {
            expect(res).to.equal('OK');
        });
    });

    it('Should be able to clear data', () => {
        rCallback.flush((err, res) => {
            expect(res).to.equal('OK');
        });
    });
});
