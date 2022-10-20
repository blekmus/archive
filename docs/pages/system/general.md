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
nextd
prevd
cdh

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

For a single user place fonts in:

```sh
~/.local/share/fonts
```

For system-wide fonts place them in:

```sh
/usr/local/share/fonts

# don't touch this
# it's only for pacman
/usr/share/fonts/
```

[Source](https://wiki.archlinux.org/title/Fonts#Manual_installation)

## Sudo

One of the main things to do is to change the password asked when a user calls onto sudo. Making it ask for the root password is secure than the user pwd. So in the `/etc/sudoers` file;

```properties
Defaults rootpw
```

Add a user to sudoers

```bash
usermod -a -G sudo <username>
```

### Root lock

Is root locked? If so, how do I unlock it?

Focus on the second column of this command. L means locked. P means there's a password or a password can be set.

``` bash
# check
sudo passwd -S root  # root P 09/02/2022 0 99999 7 -1

# unlock 
sudo usermod -U root
sudo passwd root
```

### Sudo access

At the end of `/etc/sudoers` there is what appears to be a comment:
```
#includedir /etc/sudoers.d
```

This includes sudo rules from files inside of `/etc/sudoers.d`. Here are some examples of rules that could be included in those files and what they mean.
``` bash
# user ubuntu can run sudo without a password
ubuntu ALL=(ALL) NOPASSWD:ALL

# members of admin group can sudo without a password
%admin  ALL=(ALL) NOPASSWD:ALL

# members of sudo group can sudo but needs password
%sudo  ALL=(ALL) ALL
```

Always use `visudo` to make edits to all of the mentioned files
``` bash
sudo visudo -f /etc/sudoers.d/90-cloud-init-users
```

Once you're done making edits, restart sudo to apply the changes
``` bash
sudo service sudo restart
```

## Whitelisting

Whitelisting a command or set of commands for a group allows anyone who's in it to run them without `sudo`. This is done by creating a new file inside of `/etc/sudoers.d`. [Source](https://askubuntu.com/questions/930768/adding-local-content-in-etc-sudoers-d-instead-of-directly-modifying-sodoers-fi)

```bash
sudo visudo -f "/etc/sudoers.d/<file-name>"
```

Inside it the following properties whitelists the app. Remember to give the abs path for the application. Use `which <app-name>` to find it. [Source](https://askubuntu.com/questions/692701/allowing-user-to-run-systemctl-systemd-services-without-password)

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

Find and comment this line inside `etc/pam.d/chsh`. [Source](https://ubuntuforums.org/showthread.php?t=1702833)

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

If this error comes up `[process exited with code 4294967295]` run this. [Source](https://github.com/microsoft/WSL/issues/5092)

If the installed WSL `<distro>` is ubuntu 18.04, use `Ubuntu-20.04`

```bash
wsl --terminate <distro>
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

Edit the following file to change default mimetype default application. [Source](https://wiki.archlinux.org/title/XDG_MIME_Applications#mimeapps.list)

```bash
micro "~/.config/mimeapps.list"
```

## Specific Sized Files

Create a file with a specific size. Write the size as `5M` or `10G`.

```bash
truncate -s <size> <file.txt>
```

## Kitty Terminal

When connecting to a host using ssh. Kitty gives a `'xterm-kitty': unknown terminal type.` error. To solve that you need to set the terminal `TERM` env variable to something other than the default. [Source](https://github.com/kovidgoyal/kitty/issues/1241)

```bash
# fish shell
set TERM xterm

# bash
export TERM=xterm
```

## Fish Shell

Add directory to PATH

```bash
fish_add_path /path/to/dir
```


### Sudo errors

When trying to `su` or running `sudo`, this error is given:

```properties
su: failed to execute /usr/local/bin/fish: No such file or directory
```

This happens when `/etc/passwd` has `/usr/local/bin/fish` as the user's default shell but that shell path doesn't exist. To fix it become root by using `sudo bash`. Then manually clean  `/etc/passwd` of all traces of the non existent path.


## Firefox

Setting to know in `about:config`

```bash
# Touchpad vertical scroll sensivity
mousewheel.default.delta_multiplier_y

# Mousewheel vertical scroll sensitivity
mousewheel.min_line_scroll_amount
```

## Decrease libinput Sensitivity

You can simply change the touchpad speed or how fast the cursor moves from the settings but you can't change the sensitivity of gestures and two finger navigation. To do this you need to reduce the sensitivity density

First get the touchpad size

    
```bash
libinput list-devices | grep Size
```

Then measure the touchpad and generate a custom config/snippet. The size here should be a division of the size returned from the above command.

```bash
sudo libinput measure touchpad-size 20x45
```

Now copy the snippet between the equal marks and paste it in the following file.

```bash
sudo nano /etc/udev/hwdb.d/61-evdev-local.hwdb
```

Now update hwdb

```bash
sudo systemd-hwdb update
sudo udevadm trigger /dev/input/event*
```

Finally reboot to view changes

```bash
reboot
```

## Extract Python Requirements

``` py3
# install tool
python3 -m pip install -U pipreqs

# go to script folder
pipreqs .
```

## Cronjobs

Setting up separate logging for cron. This however will not log the outputs of cron jobs. This is only for the cron process itself.

``` bash
# open this file
micro /etc/rsyslog.d/50-default.conf

# uncomment this line
cron.*

# restart syslog
sudo service rsyslog restart
```

After this, logs should appear in a separate file called `/var/log/cron.log`. Cron activity will now be logged to this file (in addition to syslog).

As for logging the output of cron jobs. Simply redirect command outputs.

```
01 14 * * * /home/joe/myscript >> /home/log/myscript.log 2>&1
```

This will redirect all standard output and errors that may be produced by the script that is run to the log file specified.

[Source](https://askubuntu.com/questions/56683/where-is-the-cron-crontab-log)

## Timeshift Backups

If automated backups aren't being created even if Timeshift is completely configured. A service called `cronie` might be disabled. 

``` bash
systemctl enable cronie.service 
systemctl start cronie.service 
```

That should hopefully solve this issue. To check if there's a problem with the Timeshift configuration itself.
``` bash
sudo timeshift --check --scripted
```

Running this command will create a snapshot if one is due. You can see if this does create a snapshot from the GUI afterwards. If this command doesn't work then the problem is in configuration or user account/permissions.

[Source](https://github.com/teejee2008/timeshift/issues/396)

## Half Installed Kernel Issues

Apt and dpkg fails to purge and fix half installed kernels. First try [linux-purge](https://launchpad.net/linux-purge/+announcement/15313).

``` bash
sudo linux-purge --fix
```

If it fails. Check the dpkg status of the packages:

``` bash
dpkg --status linux-image-3.19.0-22-generic
dpkg --status linux-image-extra-3.19.0-22-generic
```

If the output states that the packages are in bad state, i.e. half installed or not fully installed, this means that they have broken apt-get and dpkg respectively.

The entries of the corrupted kernel packages must be deleted manually from the dpkg status file. This does __not delete__ the files. It only __ignores__ them.

``` bash
# make backup of status file
sudo cp /var/lib/dpkg/status /var/lib/dpkg/status.backup

# delete ONLY references of the broken packages
nano /var/lib/dpkg/status

# finally
sudo apt-get update && sudo apt-get upgrade
```

[Source](https://askubuntu.com/questions/650732/apt-fails-to-remove-partially-installed-kernel-and-cant-install-any-other-packa)

## Held back Upgrades

The most likely culprit is __phased updates__. Its a safety feature. Don't try to outsmart it.

Some users get the upgraded packages first, and have the ability to report broken package, instead of everybody getting a broken package at once and millions of users scratching their heads.

Kept-back packages due to Phased Updates will automatically resolve themselves, download, and install once the package is deemed stable in production usage.

Most users should DO NOTHING. It's not broken. Don't try to force upgrades. Just be patient and let the system work.

#### How to tell if Phased Updates is the culprit:

It's easy. Run `apt-cache policy <package-name>` on one of your held back packages. Look for the `phased` percentage. It's only present if the package is currently phasing.

~~~ bash
apt-cache policy udev
...
 *** 1.20.3-0ubuntu1 500 (phased 40%) <------- There it is!
...
~~~

## Binary Executables

To run binary executables from the terminal without having to specify the full path, you can add the directory containing the executable to the `PATH` environment variable. This can be done mainly in two ways.

First by adding the path of the executable into your respective shell's config file. 

``` bash
# bash
echo "export PATH=$PATH:/path/to/executable" >> ~/.bashrc

# fish
echo "set -gx PATH $PATH /path/to/executable" >> ~/.config/fish/config.fish
```

Second by moving the executable into a directory that is already in the `PATH` variable. Like `/usr/local/bin`. This is the recommended way. 

``` bash
sudo mv /path/to/executable /usr/local/bin
```

