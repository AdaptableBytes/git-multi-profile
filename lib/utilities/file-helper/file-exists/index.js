const fs = require('fs');

module.exports = function fileExists(filepath) {
  return new Promise((resolve, reject) => {
    fs.access(filepath, fs.constants.F_OK, (err) => {
      if (err && err !== null) {
        return resolve(false);
      }
      return resolve(true);
    });
  });
};
