## git-multi-profile

Easily work with multiple git accounts.

Automatically use the correct SSH key and user profile for git operations without having to remember any extra steps. Once configured, it just works. 

No more cases of mistaken identity or "Permission Denied" when trying to access a repo when you have multiple git accounts.

The following configuration was done on MacOS

-----------------
1. Installation
-----------------
```shell
npm i -g git-multi-profile
```

📌 Note: Global install is important here since this will be used outside the scope of any individual NodeJS project

-----------------
2. Set up
-----------------
```shell
# Download shell script
curl -Lo git-init https://raw.githubusercontent.com/AdaptableBytes/git-multi-profile/main/shell-scripts/git-init

# Make available as shell command
sudo cp git-init /usr/local/bin && sudo chmod +x /usr/local/bin/git-init
```

-----------------
3. Configure
-----------------
Create a new config file in user home directory with your account info. 

📌 This file is used exclusively by `git-multi-profile` so there is no risk for conflicts or disrupting existing git functionality.

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

**Add/Create SSH Keys**

If you don't already have SSH keys configured for your git accounts, create an SSH key for each profile you set up in `~/git-profiles.json`

```
ssh-keygen -t rsa -b 4096 -f ~/.ssh/id_rsa_personal -C "your-email@example.com"

ssh-keygen -t rsa -b 4096 -f ~/.ssh/id_rsa_work -C "your-work-email@example.com"
```

**Add your SSH Key to your Github account**

https://docs.github.com/en/free-pro-team@latest/github/authenticating-to-github/adding-a-new-ssh-key-to-your-github-account

**Configure Local SSH Key Mapping**

Open `~/.ssh/config` file. Add entries as follows (one for each profile you set up in `~/git-profiles.json`)

```shell
Host personal.github.com
  HostName github.com
  User git
  AddKeysToAgent yes
  UseKeychain yes
  IdentityFile ~/.ssh/id_rsa_personal

Host work.github.com
  HostName github.com
  User git
  AddKeysToAgent yes
  UseKeychain yes
  IdentityFile ~/.ssh/id_rsa_work  
```


-------------------
4. Usage
-------------------
**Use the following command in place of the usual `git clone` command**

```shell
git-init {PROFILE} {GIT_REPO_SSH_URL}
```

This will perform a `git clone` operation for the specified repo and update the local `.git/config` with the profile user

**Example**
```shell
git-init work git@github.com:MyCompany/some-repo.git
```

--------------------
5. Additional Resources
--------------------
- **Add SSH Key to Gitlab**
https://docs.gitlab.com/ee/ssh/README.html#adding-an-ssh-key-to-your-gitlab-account

- **Add SSH Key to BitBucket**
https://support.atlassian.com/bitbucket-cloud/docs/set-up-an-ssh-key/


--------------------
6. FAQ
--------------------
**What does `git-multi-profile` do with SSH keys?**

Nothing. The core functionality is with `git` and `ssh`. `git-multi-profile` simply maps the hostname to a configured git profile and then invokes `git` which in turn uses `ssh` for communication

**Will `git-multi-profile` work with Bitbucket, Gitlab, other?**

Yes. This works with any `git` provider assuming they are utilizing the standard protocols