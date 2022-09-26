## Commands

``` bash
# all port usage
netstat -pnltu

# specific port usage
lsof -i :9000
netstat -ltnp | grep -w ':80'
```

## Endpoint Info

Useful when trying to verify if headers are acting as they're supposed to when building an API

``` bash
curl -is http://google.com
```

```
HTTP/2 301 
location: https://www.google.com/
content-type: text/html; charset=UTF-8
date: Fri, 23 Apr 2021 15:36:48 GMT
expires: Sun, 23 May 2021 15:36:48 GMT
cache-control: public, max-age=2592000
server: gws
content-length: 220
x-xss-protection: 0
x-frame-options: SAMEORIGIN
```

## Service Ports

If ports aren't defined for inbuilt services at `/etc/services`, all of the tools that depend on it fail. Use [this](http://www.penguintutor.com/linux/network-services-ports) link if anything happens to it. Simply paste in everything.


## NTP

With the following UFW rules should be present for NTP to work correctly.


``` bash
sudo ufw allow 123/udp
sudo ufw allow out 123/udp
sudo ufw allow out 53
```

UDP port `123` is allowed for both incoming and outgoing traffic to NTP work. Additionally  TCP port `53` (DNS) is opened for outgoing traffic since `/etc/ntp.conf` contains domain names of NTP servers.

!!! error ""
    If `Servname not supported for ai_socktype and ntp` is displayed when starting NTP. The service file is probably fucked. Check out how to replace it [here](../networking/#service-ports). More info [here](https://www.ducea.com/2006/09/11/error-servname-not-supported-for-ai_socktype/).


## Ghost

By default the port is set to `2369`. If you visit that port, it'd show nothing. The correct port is `2368`

## Public Ip

``` bash
curl ifconfig.me # ipv4
curl ipinfo.io/ip # ipv4
curl api.ipify.org # ipv4
curl ident.me # ipv6
```

## SSH Port Forwarding

``` bash
ssh -N -L 8888:127.0.0.1:80 user@server.com
```
The command above attaches the server's port 80 to local port `8888`. Meaning if a site is hosted on port `80` on the server. I can view it by going to `127.0.0.1:8888` on my browser.

The command above doesn't give any output. So if there isn't anything, that means its probably working as intended.

## Sharing Port on Local Net

Trying to stream videos through an FTP server or when trying to see how the website your coding looks on mobile. Knowing the address you need to look up on mobile can be daunting. When doing things within the same local network. You need the private IP not the public IP.

``` bash
# get private ip address
# if this returns two entries, ignore loopback ip (127.0.0.1)
# ignore everything after the slash
nmcli -p device show | grep "IP4.ADDRESS" # 192.168.8.102/24

# check if firewalls are disabled, disable if enabled
sudo ufw status
```

## Troubleshooting

!!! warning ""
    __ssh Received disconnect from port <port>:2: Too many authentication failures__

    One major cause for this error is having multiple keys in your .ssh directory. When encountering this, either specify the key you want to use or add the key to the ssh config.
        
    ``` bash
    ssh -i ~/.ssh/<key> user@host
    ```

    ```
    Host <host>
        IdentityFile ~/.ssh/<key>
    ```
