class ProfileManager {
  constructor(json) {
    this.profiles = this.getProfiles(json);
  }

  listProfiles() {
    return this.profiles;
  }

  getProfile(name) {
    return this.profiles[name.toString().toLowerCase()];
  }

  getProfiles(json) {
    const profiles = {};
    const keys = Object.keys(json);
    for (let i = 0; i < keys.length; i += 1) {
      const key = keys[parseInt(i)];
      profiles[key.toString().toLowerCase()] = json[key.toString()];
    }
    return profiles;
  }
}

module.exports = ProfileManager;
