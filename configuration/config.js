const config = require('config');

// retrieves config data from env variables or from config file in /config/default.json
exports.get = key => process.env[key] || config[key];
