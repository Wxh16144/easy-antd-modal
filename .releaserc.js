module.exports = {
  release: {
    branches: ['master', 'beta'],
  },
  plugins: [
    '@semantic-release/commit-analyzer',
    '@semantic-release/release-notes-generator',
    [
      '@semantic-release/changelog',
      {
        changelogFile: 'CHANGELOG.md',
      },
    ],
    [
      '@semantic-release/github',
      {
        message: "chore(release): ${nextRelease.gitTag} [skip ci] \n\n${nextRelease.notes}'",
      },
    ],
    [
      '@semantic-release/git',
      {
        assets: ['CHANGELOG.md', 'package.json'],
      },
    ],
    '@semantic-release/npm',
  ],
};
