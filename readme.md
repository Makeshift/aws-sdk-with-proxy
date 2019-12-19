This (very) simple module just adds the [proxy-agent](https://www.npmjs.com/package/proxy-agent) package to the [AWS SDK](https://www.npmjs.com/package/aws-sdk) by default, so you don't forget to add it every time you import aws-sdk. This means environment variables like `HTTPS_PROXY`, `HTTP_PROXY` and `NO_PROXY` will work by default.

It'll use any version of the SDK, so ensure the version you care about is in package.json and all should be good.

This will probably rely on [this PR](https://github.com/aws/aws-sdk-js/pull/3021) being accepted before it'll properly gather information from environment variables, hence why I haven't bothered to upload this to NPM yet.

Note that in 99% of cases, if you use this library you'll probably want to add `NO_PROXY=169.254.169.254,169.254.170.2` to your environment variables, otherwise it'll try to proxy requests to the metadata/task endpoints through your proxy, which isn't normally what you want.

If you'd rather pass the proxy information to proxy-agent instead of using env vars, then you probably just want to add this snippet every time you import AWS as it achieves the same thing:

```javascript
const AWS = require('aws-sdk');
AWS.config.update({httpOptions:{agent:require('proxy-agent')("http://yourproxy:8080")}});
```

## Installation
Not yet uploaded to NPM, but when it is, you'll be able to:
```bash
npm install aws-sdk aws-sdk-with-proxy
# or
yarn add aws-sdk aws-sdk-with-proxy
```

## Usage
```javascript
const AWS = require('aws-sdk-with-proxy');
//Bam, magic, AWS requests will go through your proxy as configured by your env vars, or it won't if they aren't set. Remember to add this to your env vars:
// NO_PROXY=169.254.169.254,169.254.170.2
```