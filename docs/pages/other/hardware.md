## TVs

If you search for "HDTV Overscan" you will find that historically, there was no standard for the size of CRT screens (the bulky non-flat displays nobody uses anymore). As such it was difficult to show image that looks good and a trick called "overscan" was made. Overscan essentially "cuts off the edges" of a picture with the goal of fitting it (via resizing) to your screen. This made the first attempt to define standards (tile-safe/action-safe/underscan) about which parts of the picture coud be cut, the last one of which (underscan) is "cut nothing".

Nowadays, you want "cut nothing" because everyone has a flat TV has thas some standard resolution (e.g. 1080p), and furthermore when you connect a gaming console (Playstation, Xbox, Switch) or a computer (laptop) you most definitely don't want the edges of your screen cut off (you want "underscan").

Now, if you connect a PC to a TV and notice the corners missing (e.g. the start menu of Windows at the bottom is not visible or slightly cut off) it usually means your TV is clipping the image and/or resizing it. Usually you would go into your TV settings to "turn this off" (i.e. switch to "underscan"). This is different per manufacturer, for example:

```
Samsung TV: go to Menu / Picture / Picture Options / Size / Screen Fit (instead of 16:9).
LG TV: go to Settings / Picture / Aspect Ratio / Just Scan (instead of 16:9)
Sony TV: hit Home button, go to Settings / Screen / Display Area / Full Pixel
Sharp TV: hit View Mode button, select "Dot by Dot" or "Full screen"
```

However, what if you have a TV where you can't do this, or don't know how to? GNOME HAS YOU COVERED! Turn "Adjust for TV" on and Gnome will resize the image to create a blank space around it (the thing that the TV cuts off) so that when the TV does its thing you get back the full image!

Basically, 99% of the time you're better off figuring out how to tell your TV to just display the exact whole thing rather than using this (IMHO), but it's there if you need it...

[Source](https://unix.stackexchange.com/questions/671499/what-does-the-adjust-for-tv-option-in-gnome-do)

## Dialog TV Remote

If the remote is working but isn't syncing with the TV, try this;

Long press `OK+1` or `OK+2` or `OK+3` or `OK+6`. If this doesn't work, contact `1777`