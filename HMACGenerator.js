const crypto = require('crypto');

class HMACGenerator {
    static generateHMAC(key, message) {
        const hmac = crypto.createHmac('sha256', key);
        hmac.update(message);
        return hmac.digest('hex');
    }
}

module.exports = HMACGenerator;
