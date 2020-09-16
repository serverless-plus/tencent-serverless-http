# Tencent Serverless Http

[![Build Status](https://travis-ci.com/serverless-plus/tencent-serverless-http.svg?branch=master)](https://travis-ci.com/serverless-plus/tencent-serverless-http)
[![npm](https://img.shields.io/npm/v/tencent-serverless-http.svg)](http://www.npmtrends.com/tencent-serverless-http)
[![NPM downloads](https://img.shields.io/npm/dm/tencent-serverless-http.svg)](http://www.npmtrends.com/tencent-serverless-http)

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
const tencentServerlessHttp = require('tencent-serverless-http');
const app = require('./app');
const server = tencentServerlessHttp.createServer(app);

exports.handler = (event, context) => {
  tencentServerlessHttp.proxy(server, event, context);
};
```

## License

MIT License

Copyright (c) 2020 Serverless Plus
