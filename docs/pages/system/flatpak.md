Flatpak runs all its applications in sandboxed containers. They don't have access to a user's home directory nor system files. This is made to ensure security.

This however means Flatpak apps don't have access to system GTK themes as well. 

To force them to use Flatpak themes you first need a `$HOME/.themes` directory with your themes in it. If it doesn't exist that means either your current themes are at `/usr/share/themes` or `/.local/share/themes`. This is because flatpack blacklists certain system directories, which includes `/usr/share/themes`.

Once the themes are at `~/.themes`, give all Flatpaks access to that specific directory and set their theme

``` shell
sudo flatpak override --filesystem=$HOME/.themes
sudo flatpak override --env=GTK_THEME=<theme-name> 
```

In case of emergency this reverts all changes

```
sudo flatpak override --reset
```

Using [Flatseal](https://github.com/tchx84/flatseal) is highly recommended for anything related to configuration changes with Flatpaks.