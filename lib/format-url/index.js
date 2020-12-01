module.exports = function formatUrl(repo, profile) {
  let hostname = profile.hostprefix ? `${profile.hostprefix}.` : '';
  const resource = repo.resource.toString();  
  const port = repo.port ? repo.port.toString() : '';
  let user = repo.user;
  let githost = resource;
  if (resource.indexOf('@') > -1) {
    const len = resource.length - 1;
    let gitHostname = '';
    let idx = -1;
    for (let x = len; x >= 0; x--) {
      if (resource[x] === '@') {
        idx = x;
        break;
      }
      gitHostname += resource[x];
    }
    githost = gitHostname.split('').reverse().join('');
    user = resource.substr(0, idx);
  }
  let fullResource = ''
  if (repo.protocols.length > 0) {
    //prepend protocol
    fullResource += `${repo.protocol}://`;
  }
  fullResource += `${user}@${hostname}${githost}:${port}${repo.pathname}`;
  return fullResource;
};