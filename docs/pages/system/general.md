## Commands

```bash
# output linux version
cat "/proc/version"

# connect to a docker container terminal
docker exec -it <cont> bash

# find a keyword from an output
grep '<keyword(s)>'

# strip and output only the selected column
awk '{print $<col_num>}'

# info about a pid
ps -Flww -p <pid>

# usernames used for logins
sudo lastb | awk '{print $1}' | sort | uniq -c | sort -nr

# switch between last cd's
cd -

# remove ssh key password
ssh-keygen -p -f ~/.ssh/id_rsa
```

## Site Permissions

Site permissions when popping up a new site.

```bash
sudo chown -R www-data:www-data loc/
sudo chmod -R 774 loc/
```

## Manual Fonts

For a single user place fonts in[^4];

```sh
~/.local/share/fonts
```

For system-wide fonts place them in[^4];

```sh
/usr/local/share/fonts

# don't touch this
# it's only for pacman
/usr/share/fonts/
```

## Sudo

One of the main things to do is to change the password asked when a user calls onto sudo. Making it ask for the root password is secure than the user pwd. So in the `/etc/sudoers` file;

```properties
Defaults rootpw
```

Add a user to sudoers

```bash
usermod -a -G sudo <username>
```

## Whitelisting

Whitelisting a command or set of commands for a group allows anyone who's in it to run them without `sudo`. This is done by creating a new file inside of `/etc/sudoers.d`[^2].

```bash
sudo visudo -f "/etc/sudoers.d/<file-name>"
```

Inside it the following properties whitelists the app[^3]. Remember to give the abs path for the application. Use `which <app-name>` to find it.

```properties
Cmnd_Alias <SET-NAME> = <abs-app-path> command, <apb-app-path> command
%<group-name> ALL=(ALL) NOPASSWD: <SET-NAME>
```

## System User

A user with no home directory, login shell nor password. It's basically a no-login dummy account made solely to containerize services.

```bash
# create a system user and group of the same name
sudo useradd --system --no-create-home --shell=/sbin/nologin <username>

# set their permissions
sudo chown -R root:<username> /path/to/change
sudo chmod -R 775 /path/to/change
```

## chsh

If you ever get the error;

```properties
chsh: PAM authentication failed
```

Find and comment this line inside `etc/pam.d/chsh`[^1].

```properties
auth required pam_shells.so
```

Then do whatever you were doing and make sure to **uncomment it again**.

## Groups

List all groups

```bash
getent group
```

Add user to a group

```bash
usermod -a -G group <username>
```

What groups is a user in. If there's no args, groups of current user are shown.

```bash
groups <user>
```

Create new group

```bash
groupadd <group>
```

Make sure to restart the services that are responsible for the groups after adding a user into one.

Necessary groups for reg user;

- docker
- sudo
- postfix

## GPG

Decrypt a file.

```bash
gpg --output <output-file> --decrypt <file.gpg>
```

Encrypt a file.

```bash
gpg --output <output-file.gpg> --encrypt <file>
```

Export public and private keys.

```bash
# public key
gpg --output <public.pgp> --armor --export -r <recipient>

# private key
gpg --output <private.pgp> --armor --export-secret-key -r <recipient>
```

## Tar

Compress a file into zst. You need `zstd` installed.

```bash
tar acf files.tar.zst files/
```

Decompress a file from zst

```bash
tar axf files.tar.zst
```

## WSL

If this error comes up `[process exited with code 4294967295]` run this[^5].
If the installed distro is different simply change it.

```cmd
wsl --terminate Ubuntu-20.04
```

## Standard File Browser

You can define the default file browser by editing the file `~/.local/share/applications/mimeapps.list`. Open this file and change the line `inode/directory` as follows.

If this doesn't work, edit the same line in `usr/share/applications/mimeinfo.cache`. [Source](https://unix.stackexchange.com/questions/333254/set-standard-file-browser-for-open-containing-folder)

```
inode/directory=nautilus.desktop;
```

## Terminal Sessions

[Source](https://haydenjames.io/kill-inactive-ssh-sessions/)

```bash
# currently logged in users
w -i
who -a -H

# login history
last

# login faliure history
lastb
```

SSH session process trees

```bash
pstree -p

├─sshd(3102)─┬─sshd(3649)───bash(3656)
│            └─sshd(16680)───bash(16687)───pstree(17073)


# to kill a terminal
kill 3649
```

## Mimetype

Display mimetype of a certain file.

```bash
mimetype "/file/path.ext"
```

To change the mimetype application. Edit it in the following path.

```bash
micro "~/.local/share/applications/mimeinfo.cache"
```

[^1]: https://ubuntuforums.org/showthread.php?t=1702833
[^2]: https://askubuntu.com/questions/930768/adding-local-content-in-etc-sudoers-d-instead-of-directly-modifying-sodoers-fi
[^3]: https://askubuntu.com/questions/692701/allowing-user-to-run-systemctl-systemd-services-without-password
[^4]: https://wiki.archlinux.org/title/Fonts#Manual_installation
[^5]: https://github.com/microsoft/WSL/issues/5092
