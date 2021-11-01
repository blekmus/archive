## Terminology

For more info check official docs [here](https://github.com/git-guides)

### Stage

To stage a file is simply to prepare it finely for a commit. Git, with its index allows you to commit only certain parts of the changes you've done since the last commit. Say you're working on two features - one is finished, and one still needs some work done. You'd like to make a commit and go home (5 o'clock, finally!) but wouldn't like to commit the parts of the second feature, which is not done yet. You stage the parts you know belong to the first feature, and commit. Now the first feature is commited to the project, while the second is still work-in-progress in your working directory.

- When committing, changes are moved from the staging basket into the commit basket.
- When soft resetting, committed changes are moved from the commit basket to the staging basket.

## Userful Commands

``` shell
# forgets last local commit, stages those changes, local files are unchanged
git reset --soft origin

# forgets last local commit, destroy all local changes, till last origin commit
git reset --hard origin

# forget staged changes, local files are unchanged
git restore --staged .


# forget staged changes for file, local files are unchanged
git reset <file-name>

# destroy all changes of file, back to last local/origin commit
git restore <flie-name>

# forget staged changes for file, local file is unchanged
git restore --staged <file-name>
```

``` shell
# files changed after last staging or commit
git diff --stat

# above less verbose
git diff --name-only
```

``` shell
# last commits
git log --graph

# last commits with file changes
git log --stat

# last commits less verbose
git log --oneline

# staged not yet committed files
git status

# staged files less verbose
git status -s
```

``` bash
# edit local commit message
git commit --amend
```

### Rollback Changes

Cleans up repo of any untracked changes till last local commit then pulls in latest version from origin.[^1].

```bash
# clean up
git reset
git checkout .
git clean -fdx

# sync to latest
git pull
```

## Gitignore

The below excludes all files except the files inside of and the /vendor/laravel/ui dir itself.
It's mainly about ignoring files in a directory. Then not-ignoring selected directories inside of it. [Source](https://gist.github.com/hieblmedia/9318457)

Remember `/vendor/*` != `/vendor/`. The former keeps the `/vendor/` folder but ignores files inside of it.
The latter ignores the whole `/vendor/` directory. 

``` gitignore
# ignore everything inside /vendor/ but not dir itself
/vendor/*

# don't ignore /vendor/laravel dir and files inside of it
!/vendor/laravel/

# ignore every file inside /vendor/laravel dir, but not dir itself
/vendor/laravel/*

# don't ignore /vendor/laravel/ui dir and files inside of it
!/vendor/laravel/ui

```

## Existing Project to Git

[Source](https://gist.github.com/alexpchin/102854243cd066f8b88e)

```
# first init
git init

# stage local changes
git add .

# commit local changes
git commit -m 'initial'

# connect to origin, use url from github repo
git remote add origin <url>
git remote -v

# finally push to origin, check origin name (master/main) from github
git push origin <origin-name>
```

## Local SSH

To generate ssh keys, change `key-name` and `/absolute/path`

```bash
ssh-keygen -t rsa -b 4096 -C "key-name" -f "/absolute/path"
```

Check if ssh-agent is running

```bash
eval "$(ssh-agent -s)"
```

Add generated ssh key to ssh-agent

```bash
ssh-add "/key/location"
```

Then just copy the `.pub` and paste it into `github.com`

## Automated Deployment

There are multiple ways to automate deployment. See the pros and cons of each of these methods [here](https://docs.github.com/en/developers/overview/managing-deploy-keys). For more ways to do this
check out this [cheatsheet](https://coolaj86.com/articles/vanilla-devops-git-credentials-cheatsheet/)

### Deploy Keys

This is very similar to local development with the usual ssh keys. The only difference is in how much this key gets to do. It's access is limited only to the repo it's added to.

Create a key pair and add it here `Repo > Settings > Deploy Keys`

```bash
ssh-keygen -t rsa -b 4096 -C "key-name" -f "/abs/path"
```

Using deploy keys in scripts. The `.ask-pass` should `echo` the ssh key password.

```bash
# start ssh-agent
eval "$(ssh-agent -s)"

# add the ssh key
DISPLAY=:0 SSH_ASKPASS="/abs/path/.ask-pass" ssh-add ~/.ssh/<key-name>

# do stuff

# kill ssh-agent
trap "ssh-agent -k" exit
```

!!! info ""
    **Always remember to kill what you start.**

[^1]: https://stackoverflow.com/questions/14075581/git-undo-all-uncommitted-or-unsaved-changes
