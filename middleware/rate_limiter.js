const rateLimit = require('express-rate-limit');

require('express-rate-limit');

const limiter = rateLimit({
    windowMs: 1 * 60 * 1000, // 1 min
    max: 5
});

// max de tentatives atteint : code http 429, message 'too many requests, please try again later'

module.exports = limiter;