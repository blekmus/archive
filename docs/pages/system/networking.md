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