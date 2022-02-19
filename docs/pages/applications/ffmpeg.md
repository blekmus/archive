## Video Compression

``` bash
ffmpeg -i "<input.mp4>" -vcodec <codec> -acodev <codec> -crf <level> "<output.mp4>"
```

This takes `input.mp4` and turns it into `output.mp4` with a certain level of compression as specified by the `-crf` value. 

The `crf` or [Constant Rate Factor](https://slhck.info/video/2017/02/24/crf-guide.html) lowers average bitrate while retaining better quality. It can range from 18 to 24 for H.264 and 24 to 30 for H.265. A higher CRF value corresponds to a lower bitrate, hence producing a smaller file.

The following shorthand may be used as well, since ffmpeg performs some optimizations on it's own.

``` bash
ffmpeg -i "<input.mp4>" "<output.mp4>"
```

Codecs:

``` bash
# vcodes
h264
h265

# acodes
aac
mp3
```

Sources: [[1]](https://unix.stackexchange.com/questions/28803/how-can-i-reduce-a-videos-size-with-ffmpeg) [[2]](https://superuser.com/questions/4244/how-do-i-reduce-the-size-of-a-huge-mp4-video/4252#4252)