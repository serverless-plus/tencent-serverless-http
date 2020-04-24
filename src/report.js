const { Capi } = require('@tencent-sdk/capi')

function Report (event = {}, context = {}, debugOptions) {
  this.start = new Date()
  const { httpMethod: method, path } = event
  if (!method || !path) {
    this.canReport = false
    console.warn('No method or path in event.')
    return
  }
  this.method = method.toUpperCase()
  this.path = str2hex(path)
  const ServiceType = 'monitor'
  const {
    Region = 'ap-guangzhou',
    function_name: FunctionName,
    function_version: Version = '$latest',
    namespace: Namespace = 'default'
  } = context
  const environment = JSON.parse(context.environment || '{}')
  const {
    TENCENTCLOUD_SECRETID: SecretId,
    TENCENTCLOUD_SECRETKEY: SecretKey,
    TENCENTCLOUD_SESSIONTOKEN: Token
  } = environment

  if (!SecretId || !SecretKey) {
    // Don't report data if no SecretId or SecretKey
    this.canReport = false
    console.warn('No SecretId or SecretKey in environment parameters.')
    return
  }

  this.canReport = true
  this.client = new Capi({
    Region,
    SecretId,
    SecretKey,
    Token,
    ServiceType
  })
  this.commonParams = {
    Version: '2018-07-24',
    AnnounceInstance: `${Namespace}|${FunctionName}|${Version}`
  }
  this.debugOptions = debugOptions || {
    debug: false,
    host: 'monitor.tencentcloudapi.com'
  }
}

Report.prototype.reportRequest = function () {
  if (!this.canReport) {
    return false
  }
  const Metrics = [
    { MetricName: 'request', Value: 1 },
    { MetricName: `${this.method}_${this.path}`, Value: 1 }
  ]
  const _this = this
  this.client.request(
    {
      Action: 'PutMonitorData',
      Metrics,
      ...this.commonParams
    },
    this.debugOptions,
    true
  ).then(() => {
    // console.log(data)
  }, () => {
    _this.canReport = false
  })
}

Report.prototype.reportResponse = async function (response) {
  if (!this.canReport) {
    return false
  }
  const latency = new Date() - this.start
  const keyPrefix = `${this.method}_${this.path}`
  let { statusCode } = response.response || {}
  statusCode = statusCode ? String(statusCode) : ''
  const Metrics = [
    { MetricName: 'latency', Value: latency },
    { MetricName: keyPrefix + '_latency', Value: latency },
    { MetricName: keyPrefix + '_' + statusCode, Value: 1 }
  ]
  if (statusCode.startsWith('4')) {
    Metrics.push({ MetricName: '4xx', Value: 1 })
    Metrics.push({ MetricName: 'error', Value: 1 })
  } else if (statusCode.startsWith('5')) {
    Metrics.push({ MetricName: '5xx', Value: 1 })
    Metrics.push({ MetricName: 'error', Value: 1 })
  }

  await this.client.request(
    {
      Action: 'PutMonitorData',
      Metrics,
      ...this.commonParams
    },
    this.debugOptions,
    true
  )
}

// 字符串转16进制
function str2hex (str) {
  if (str === '') {
    return ''
  }
  let arr = []
  for (let i = 0; i < str.length; i++) {
    arr.push(str.charCodeAt(i).toString(16))
  }
  return arr.join('')
}

module.exports = exports = Report
