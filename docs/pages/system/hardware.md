## RAM Details

``` bash 
# motherboard RAM support
# how much RAM can I stick in there?
sudo dmidecode -t 16

# list all attached memory devices
# what's my RAM called?
sudo lshw -short -C memory

# detailed RAM info 
# what's its speed?
# what's the voltage?
# what's its type?
sudo dmidecode --type 17
```