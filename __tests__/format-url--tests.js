const formatUrl = require('../lib/format-url');

test('returns expected github url', async () => {
  const repo = {
    protocols: [],
    protocol: 'ssh',
    user: 'git',
    resource: 'github.com',
    pathname: '/bobo/some-repo.git'
  };
  const profile = {
    hostprefix: 'blah'
  };
  const formatted = formatUrl(repo, profile);
  expect(formatted).toBe('git@blah.github.com:/bobo/some-repo.git');
});

test('returns expected google cloud repository url', async () => {
  const repo = {
    protocols: ['ssh'],
    port: 2022,
    protocol: 'ssh',
    user: '',
    resource: 'fred@example.com@source.developers.google.com',
    pathname: '/bobo/some-repo.git'
  };
  const profile = {
    hostprefix: 'gcloud'
  };
  const formatted = formatUrl(repo, profile);
  expect(formatted).toBe('ssh://fred@example.com@gcloud.source.developers.google.com:2022/bobo/some-repo.git');
});
