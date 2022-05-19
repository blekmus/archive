## Terminology

For more info check official docs [here](https://github.com/git-guides)

### Stage

To stage a file is simply to prepare it finely for a commit. Git, with its index allows you to commit only certain parts of the changes you've done since the last commit. Say you're working on two features - one is finished, and one still needs some work done. You'd like to make a commit and go home (5 o'clock, finally!) but wouldn't like to commit the parts of the second feature, which is not done yet. You stage the parts you know belong to the first feature, and commit. Now the first feature is commited to the project, while the second is still work-in-progress in your working directory.

- When committing, changes are moved from the staging basket into the commit basket.
- When soft resetting, committed changes are moved from the commit basket to the staging basket.

### Untracked

New files and directories that don't yet exist on any commit. They are out of the whole loop. Even after they're staged. Until a commit is made. They're considered untracked files.


## Userful Commands

``` shell
# list all branches
git branch

# view git history
git reflog

# files changed 
git diff

# commit list
git log

# staged and untracked files
git status

# edit local commit message
git commit --amend

# view old commits, opens in detached branch
git checkout <hash>
```

``` shell
# create a new branch
git branch <name>

# changes of file since last commit
git diff HEAD ./path/to/file

# destroy tracked & unstaged file changes
git checkout .

# created untracked & unstaged files are removed (-d: dirs / -f: files)
git clean -df

# unstages files, changes untouched
git reset

# destroy all changes of tracked file
git restore <file-name>

# unstages files, changes untouched
git restore --staged .

# destroy commit, commit changes staged, untracked files untouched, <hash> commit isn't affected
git reset --soft <hash>

# destroy commit, commit changes and previous staged and untracked files untouched, <hash> commit isn't affected
git reset <hash>

# destroy commit and previous staged files, reverts tracked files to <hash> commit, untracked files untouched
git reset --hard <hash>

# add commit on top, specifically destroying given commit hash changes, untracked files untouched
git revert <hash>
```

``` bash
# deleting all changes since last commit
git reset          # unstage everything
git checkout .     # reset tracked files
git clean -dfx     # get rid of untracked files

# restore old commit to new branch
git checkout <hash>
git branch <branch-name>
```

## Gitignore

The below excludes all files except the files inside of and the /vendor/laravel/ui dir itself.
It's mainly about ignoring files in a directory. Then not-ignoring selected directories inside of it. [Source](https://gist.github.com/hieblmedia/9318457)

Remember `/vendor/*` != `/vendor/`. The former keeps the `/vendor/` folder but ignores files inside of it.
The latter ignores the whole `/vendor/` directory. 

``` bash
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

``` bash
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

# set default origin branch to master
git push --set-upstream origin master
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

Then just copy the `.pub` and paste it into `github.com`. Run this to check if the key works.

```bash
ssh -T git@github.com

> Hi <username>! You've successfully authenticated, but GitHub does not
> provide shell access.
```

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
