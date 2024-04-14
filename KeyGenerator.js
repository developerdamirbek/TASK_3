const crypto = require('crypto');

class KeyGenerator {
    static generateKey() {
        return crypto.randomBytes(32).toString('hex');
    }
}

module.exports = KeyGenerator;
