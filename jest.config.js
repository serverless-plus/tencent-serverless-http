module.exports = {
  collectCoverageFrom: ['src/*'],
  verbose: true,
  testTimeout: 600000,
  testRegex: '/__tests__/.*\\.(test|spec)\\.(js|ts)$',
  // 由于测试账号没有备案域名，所以线上 CI 忽略 CDN 测试
  testPathIgnorePatterns: [
    '/node_modules/',
    '/examples/'
  ],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node']
}
