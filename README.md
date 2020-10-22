## git-multi-profile

Easily work with multiple git accounts.

Automatically use the correct SSH key and user profile for git operations without having to remember any extra steps. Once configured, it just works. 

No more cases of mistaken identity or "Permission Denied" when trying to access a repo when you have multiple git accounts.

Works on MacOS/Linux

-----------------
Install
-----------------
```shell
npm i -g git-multi-profile
```

📌 Note: Global install is important here since this will be used outside the scope of any individual NodeJS project

-----------------
Set up
-----------------
```shell
# Download shell script
curl -Lo git-init https://raw.githubusercontent.com/AdaptableBytes/git-multi-profile/main/shell-scripts/git-init

# Make available as shell command
sudo cp git-init /usr/local/bin && sudo chmod +x /usr/local/bin/git-init
```


-----------------
Configure
-----------------
Create config file in user home directory with your account info

`~/.git-profiles.json`
```
{
  "personal": {
    "name": "Name or Username",
    "email": "your-email@example.com",
    "hostprefix": "personal"
  },
  "work": {
    "name": "Name or Username",
    "email": "your-work-email@example.com",
    "hostprefix": "work"
  }  
}
```

**Add SSH Keys**

If you don't already have SSH keys configured for your git accounts, create an SSH key for each profile you set up in `~/git-profiles.json`