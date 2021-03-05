const { Redis, AsyncRedis } = require('../lib/main.js');
const { expect } = require('chai');
const assert = require('assert');

const callbackOptions = {
    host: '127.0.0.1',
    port: 1337,
    keyPrefix: 'test-',
}
const rCallback = new Redis(callbackOptions);

describe('Callback Based Redis Client', () => {
    it('Should accept dynamic options', () => {
        const expectedKey = 'test-';
        const actual = rCallback.options.keyPrefix;
        expect(actual).to.equal(expectedKey);
        return;
    });
});
