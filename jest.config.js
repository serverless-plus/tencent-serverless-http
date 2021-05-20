module.exports = {
  collectCoverageFrom: ['src/*'],
  verbose: true,
  testTimeout: 600000,
  testRegex: '/__tests__/.*\\.(test|spec)\\.(js|ts)$',
  testPathIgnorePatterns: [
    '/node_modules/',
    '/examples/'
  ],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node']
}
