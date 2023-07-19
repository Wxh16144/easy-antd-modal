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
        assets: [],
      },
    ],
    [
      '@semantic-release/git',
      {
        assets: ['CHANGELOG.md', 'package.json'],
        message: "chore(release): ${nextRelease.gitTag} [skip ci] \n\n${nextRelease.notes}'",
      },
    ],
    '@semantic-release/npm',
  ],
};
