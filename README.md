# Tencent Serverless Http

[![Build Status](https://travis-ci.com/serverless-plus/tencent-serverless-http.svg?branch=master)](https://travis-ci.com/serverless-plus/tencent-serverless-http)
[![npm](https://img.shields.io/npm/v/%40slsplus%2Ftencent-serverless-http.svg)](http://www.npmtrends.com/%40slsplus%2Ftencent-serverless-http)
[![NPM downloads](https://img.shields.io/npm/dm/%40slsplus%2Ftencent-serverless-http.svg)](http://www.npmtrends.com/%40slsplus%2Ftencent-serverless-http)

This project is a fork of
[aws-serverless-express](https://github.com/awslabs/aws-serverless-express.git),
and modify for tencent cloud scf.

## Install

```bash
npm install @slsplus/tencent-serverless-http
```

## Usage

```js
// handler.js
'use strict';
const tencentServerlessHttp = require('@slsplus/tencent-serverless-http');
const app = require('./app');
const server = tencentServerlessHttp.createServer(app);

exports.handler = (event, context) => {
  tencentServerlessHttp.proxy(server, event, context);
};
```

This package includes middleware to easily get the event object SCF receives
from API Gateway

```js
const tencentServerlessHttpMiddleware = require('@slsplus/tencent-serverless-http/middleware');
app.use(tencentServerlessHttpMiddleware.eventContext());
app.get('/', (req, res) => {
  res.json(req.apiGateway.event);
});
```
