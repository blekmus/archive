## Terminology

For more info check official docs [here](https://github.com/git-guides)

### Stage

To stage a file is simply to prepare it finely for a commit. Git, with its index allows you to commit only certain parts of the changes you've done since the last commit. Say you're working on two features - one is finished, and one still needs some work done. You'd like to make a commit and go home (5 o'clock, finally!) but wouldn't like to commit the parts of the second feature, which is not done yet. You stage the parts you know belong to the first feature, and commit. Now the first feature is commited to the project, while the second is still work-in-progress in your working directory.

- When committing, changes are moved from the staging basket into the commit basket.
- When soft resetting, committed changes are moved from the commit basket to the staging basket.

## Userful Commands

```bash
# forgets last commit and stages those files, keeps local changes
git reset --soft origin

# forgets last commit, destroy local changes
git reset --hard origin

# forget staged changes, local files are unchanged
git restore --staged .
```

```bash
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
# files changed after last staging or commit
git diff --stat

# above less verbose
git diff --name-only
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
