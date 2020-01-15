# Tencent Serverless Http

[![Build Status](https://travis-ci.com/yugasun/tencent-serverless-http.svg?branch=master)](https://travis-ci.com/yugasun/tencent-serverless-http)
[![npm](https://img.shields.io/npm/v/tencent-serverless-http.svg)]()
[![npm](https://img.shields.io/npm/dm/tencent-serverless-http.svg)]()
[![dependencies Status](https://david-dm.org/yugasun/tencent-serverless-http/status.svg)](https://david-dm.org/yugasun/tencent-serverless-http)

This project is a fork of
[aws-serverless-express](https://github.com/awslabs/aws-serverless-express.git),
and modify for tencent cloud scf.

## Install

```bash
npm install tencent-serverless-http
```

## Usage

```js
// handler.js
'use strict';
const tencentServerlessNodejs = require('tencent-serverless-http');
const app = require('./app');
const server = tencentServerlessNodejs.createServer(app);

exports.handler = (event, context) => {
  tencentServerlessNodejs.proxy(server, event, context);
};
```

This package includes middleware to easily get the event object Lambda receives
from API Gateway

```js
const tencentServerlessNodejsMiddleware = require('tencent-serverless-http/middleware');
app.use(tencentServerlessNodejsMiddleware.eventContext());
app.get('/', (req, res) => {
  res.json(req.apiGateway.event);
});
```
