## QT Theme

When pps like Qbittorrent and VLC start to look weird. That means there's either something wrong with the theme. Or QT isn't getting the theme in full form. There are times when QT4 apps inherit GTK themes but QT5 apps don't.

Use this workaround;

``` bash
sudo apt install qt5-style-plugins
```

Then run either of these

``` bash
# support for current user
echo "export QT_QPA_PLATFORMTHEME=gtk2" >> ~/.profile

# support systemwide
sudo sh -c "echo 'export QT_QPA_PLATFORMTHEME=gtk2' >> /etc/environment
```

Finally reboot. [Source](https://askubuntu.com/questions/706528/qt-apps-stopped-inheriting-gtk-themes)

## Dock App Bindings

To unbind the ++Super+number++ shortcuts from opening the dock apps you can run;

```bash
for i in {1..9}; do gsettings set org.gnome.shell.keybindings switch-to-application-$i "[]";done
```

To revert this;

```bash
for i in {1..9}; do gsettings set org.gnome.shell.keybindings switch-to-application-$i "['<Super>$i']";done
```

[Source](https://askubuntu.com/questions/1294130/how-can-i-unbind-supernumber-1-2-3-from-opening-apps)

## Three Empty Files

On Manjaro Gnome, if there are files like `Empty Bash`, `Empty Desktop` and `Empty File` on at `~`. That means gnome's default `usr/bin/create-template` is running. Because of it, even if you delete the files. The program recreates them everytime you log back in. 

To stop running it, run `Tweaks` click `Startup Applications` then remove `create-template` from the list.
