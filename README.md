<p align="center"><img src="https://raw.githubusercontent.com/AdaptableBytes/git-multi-profile/main/media/banner.png" alt="git multi profile banner"></p>

  [![License](https://img.shields.io/badge/license-MIT-blue.svg?style=for-the-badge)](https://opensource.org/licenses/MIT) ![Dependencies](https://img.shields.io/librariesio/release/npm/git-multi-profile?style=for-the-badge) ![Downloads](https://img.shields.io/npm/dw/git-multi-profile?style=for-the-badge&color=a8d4da)

A command-line utility to easily work with multiple git accounts.

Automatically use the correct SSH key and user profile for git operations without having to remember any extra steps. Once configured, it just works. Easy peasy 🍋

No more cases of mistaken identity or "Permission Denied" when trying to access a repo when you have multiple git accounts.

The following configuration was done on MacOS

Installation
-----------------
```shell
npm i -g git-multi-profile
```

> Global install is important here since this will be used outside the scope of any individual NodeJS project

Set up
-----------------
```shell
# Download shell script
curl -Lo git-clone https://raw.githubusercontent.com/AdaptableBytes/git-multi-profile/main/shell-scripts/git-clone

# Make available as shell command
sudo cp git-clone /usr/local/bin && sudo chmod +x /usr/local/bin/git-clone
```

Config
-----------------
Create a new config file in user home directory with your account info. 

> This file is used exclusively by `git-multi-profile` so there is no risk for conflicts or disrupting existing git functionality.

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

[Github Doc](https://docs.github.com/en/free-pro-team@latest/github/authenticating-to-github/adding-a-new-ssh-key-to-your-github-account)

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


Usage
-------------------
**Use the following command in place of the usual `git clone` command**

```shell
git-clone {PROFILE} {GIT_REPO_SSH_URL}
```

This will perform a `git clone` operation for the specified repo and update the local `.git/config` with the profile user

**Example**
```shell
git-clone work git@github.com:MyCompany/some-repo.git
```

> From the command-line, you are using the **shell script command**, not the NodeJS library directly

Additional Resources
--------------------
- **Add SSH Key to Gitlab**
https://docs.gitlab.com/ee/ssh/README.html#adding-an-ssh-key-to-your-gitlab-account

- **Add SSH Key to BitBucket**
https://support.atlassian.com/bitbucket-cloud/docs/set-up-an-ssh-key/


 FAQ
--------------------
**What does `git-multi-profile` do with SSH keys?**

Nothing. The core functionality is performed by `git` and `ssh`. `git-multi-profile` is a thin wrapper that maps the hostname to a configured git profile and then invokes `git` which in turn uses `ssh` for communication

**Will `git-multi-profile` work with Bitbucket, Gitlab, other?**

Yes. This works with any `git` provider assuming they are utilizing the standard protocols

**Help! The command says "cloning..." but just hangs.**

This is likely because you don't have the Git provider in your ssh known-hosts file, and an ssh prompt is waiting for input. This is annoying, but a necessary security check.

To solve this you could run `ssh` command to the hostname like so (of course enter the actual git provider hostname and port, which is usually 22):
```
ssh git@source.developers.google.com -p 2022
```
which will generate the prompt like this:
```
The authenticity of host '[source.developers.google.com]:2022 ([xx.xx.xx.255]:2022)' can't be established.
ECDSA key fingerprint is SHA256:AGmEpqXNMqsRPIviwyk4J4HM0lEylomDBKOWZsBb434.
Are you sure you want to continue connecting (yes/no/[fingerprint])?
```
Say "yes" which will add the host to your known-hosts file.

