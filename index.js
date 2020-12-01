const path = require('path');
const os = require('os');
const gitconfig = require('gitconfig');
const gitUrlParse = require('git-url-parse');
const commandLine = require('./lib/parse-command-line');
const FileHelper = require('./lib/utilities/file-helper');
const ProfileManager = require('./lib/profile-manager');
const formatUrl = require('./lib/format-url');

function quit(exitCode = 0) {
  process.exit(exitCode);
}

module.exports = async function run() { 
  const args = commandLine();
  const homedir = os.homedir();

  const gitProfilesFile = path.join(homedir, ".git-profiles.json");
  const exists = await FileHelper.fileExists(gitProfilesFile);
  if (exists === false) {
    console.error(`${gitProfilesFile} not found`);
    return quit(2);
  }
  let profileJson = null;
  try {
    profileJson = await FileHelper.readJsonFile(gitProfilesFile);
  } catch(e) {
    console.error(`Unable to parse JSON file ${gitProfilesFile}`);
    return quit(3);
  }
  const profileManager = new ProfileManager(profileJson);

  if (args["list-profiles"] === true) {
    console.log(JSON.stringify(profileManager.listProfiles()));
    return quit(0);
  }

  if (!args.profile) {
    console.error("--profile is required");
    return quit(1);
  }

  const profile = profileManager.getProfile(args.profile);
  if (!profile) {
    console.error(`No profile found for ${args.profile}`);
    return quit(2);
  }

  let modifiedRepo = null;
  let gitInfo = null;

  if (args.repo) {
    gitInfo = gitUrlParse(args.repo);
    // console.log(gitInfo);
    modifiedRepo = formatUrl(gitInfo, profile);
  }

  if (args['format-url'] === true) {
    if (!args.repo) {
      console.error("Missing repo argument");
      return quit(2);
    }    
    console.log(modifiedRepo);
    return process.exit(0);
  } else if (args['get-repo-name'] === true) {
    if (!args.repo) {
      console.error("Missing repo argument");
      process.exit(2);
    }
    console.log(gitInfo.name);
    return process.exit(0);
  } else if (args['set-local-profile'] === true) {
    //set user name and email
    await gitconfig.set({
      'user.email': profile.email,
      'user.name': profile.name
    }, {location: 'local'});

    return process.exit(0);
  }
};
