module.exports = {
  verifyConditions: [
    '@semantic-release/changelog',
    '@semantic-release/npm',
    '@semantic-release/git',
    '@semantic-release/github'
  ],
  publish: [
    '@semantic-release/changelog',
    {
      path: '@semantic-release/npm',
      npmPublish: true,
      tarballDir: 'dist'
    },
    {
      path: '@semantic-release/git',
      assets: [
        'package.json',
        'package-lock.json',
        'CHANGELOG.md',
        'dist/**/*.{js|css}'
      ],
      message:
        'chore(release): version ${nextRelease.version} [skip ci]\n\n${nextRelease.notes}'
    },
    {
      path: '@semantic-release/github',
      assets: 'dist/*.tgz'
    }
  ]
}
