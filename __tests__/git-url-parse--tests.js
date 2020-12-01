const gitUrlParse = require('git-url-parse');

test('returns expected repo data', async () => {
  const url = 'ssh://fred@example.com@source.developers.google.com:2022/p/blooper/r/foo';
  const repo = gitUrlParse(url);
  expect(repo.protocols).toStrictEqual(['ssh']);
});

test('returns expected repo data', async () => {
  const url = 'ssh://fred@example.com@source.developers.google.com:2022/p/blooper/r/foo';
  const repo = gitUrlParse(url);
  expect(repo.protocol).toStrictEqual('ssh');
});

test('returns expected repo data', async () => {
  const url = 'ssh://fred@example.com@source.developers.google.com:2022/p/blooper/r/foo';
  const repo = gitUrlParse(url);
  expect(repo.user).toStrictEqual('');
});

test('returns expected repo data', async () => {
  const url = 'ssh://fred@example.com@source.developers.google.com:2022/p/blooper/r/foo';
  const repo = gitUrlParse(url);
  expect(repo.resource).toStrictEqual('fred@example.com@source.developers.google.com');
});

test('returns expected repo data', async () => {
  const url = 'ssh://fred@example.com@source.developers.google.com:2022/p/blooper/r/foo';
  const repo = gitUrlParse(url);
  expect(repo.port).toStrictEqual(2022);
});