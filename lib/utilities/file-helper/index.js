const fs = require('fs');

function readFile(filepath) {
  return new Promise((resolve, reject) => {
    // eslint-disable-next-line security/detect-non-literal-fs-filename
    fs.readFile(filepath, 'utf8', (err, content) => {
      if (err) {
        return reject(err);
      }
      return resolve(content);
    });
  });
}

function readJsonFile(filepath) {
  return new Promise((resolve, reject) => {
    // eslint-disable-next-line security/detect-non-literal-fs-filename    
    fs.readFile(filepath, 'utf8', (err, content) => {
      if (err) {
        return reject(err);
      }
      let json = null;
      try {
        json = JSON.parse(content);
      } catch (e) {
        return reject(Error('Unable to parse JSON file'));
      }
      return resolve(json);
    });
  });
}

function fileStat(itemPath) {
  return new Promise((resolve, reject) => {
    // eslint-disable-next-line security/detect-non-literal-fs-filename
    fs.stat(itemPath, (err, stats) => {
      if (err) {
        console.error(err);
        return resolve(null);
      }
      return resolve(stats);
    });
  });
}

module.exports = {
  fileStat,
  fileExists: require('./file-exists'),
  readFile,
  readJsonFile
};
