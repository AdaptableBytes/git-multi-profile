module.exports = function parseCommandLineArgs() {
  const commandLineArgs = {};
  for (let x = 0; x < process.argv.length; x += 1) {
    const parts = process.argv[x].split("=");
    let key = parts[0];
    if (parts[0].indexOf("--") === 0) {
      key = parts[0].substr(2, parts[0].length - 1);
      if (parts.length > 1) {      
        commandLineArgs[key.toLowerCase()] = parts[1];
      } else {
        commandLineArgs[key.toLowerCase()] = true;
      }
    }
  }
  return commandLineArgs;
};