const AWS = require('aws-sdk');
AWS.config.update({httpOptions:{agent:require('proxy-agent')()}});
module.exports = AWS;