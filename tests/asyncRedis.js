const { AsyncRedis } = require('../lib/main.js');
const { expect } = require('chai');
const assert = require('assert');

const asyncOptions = {
    host: '127.0.0.1',
    port: 6379,
    keyPrefix: 'customKey-',
};

const rAsync = new AsyncRedis(asyncOptions);
const key = 'test';
const data = [ 1, 2, 3 ];
const setexKey = 'test1';
const ttl = 1000;

describe('Async Based Redis Client', async () => {
    it('Should accept dynamic options', () => {
        const expectedKey = 'customKey-';
        const actual = rAsync.options.keyPrefix;
        expect(actual).to.equal(expectedKey);
    });

    it('Should be able to set data', async () => {
        const res = await rAsync.set(key, data);
        expect(res).to.equal('OK');
    });

    it('Should be able to retrieve data', async () => {
        const res = await rAsync.get(key);
        assert.deepEqual(res, data);
    });

    it('Should be able to set data with an expiry', async () => {
        const res = await rAsync.setex(setexKey, data, ttl);
        expect(res).to.equal('OK');
    });

    it('Should be able to clear data', async () => {
        const res = await rAsync.flush();
        expect(res).to.equal('OK');
    })
});
