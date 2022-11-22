## Client

Use a recent version of OpenConnect built straight from the [source](https://gitlab.com/openconnect/openconnect). The `sni` flag was introduced in November 2022.

`--no-dlts` flag is used because DLTS works over `UDP` or `SCTP`. Since `UDP` doesn't work with domain spoofing it's turned off on `ocserv`.

``` r
sudo openconnect <vpn-domain>:443 --sni <sni-domain> --no-dtls
```

!!! warning ""
    If __ipv6 is enabled__ on the client and disabled on ocserv, all ipv6 traffic would go around the tunnel. To prevent this either disable ipv6 traffic on the client or enable it on ocserv. The prior is recommended.


## Requirements

First of all disable __firewalls__ like UFW to make sure you don't run into any unexpected issues with the initial configuration. After that point a subdomain to the server ip. A subdomain is required for this to work.

Install the necessary requirements

``` bash
sudo apt install ocserv certbot iptables
```

Generate SSL certificate for the vpn domain. Replace `<email>` and `<vpn-domain>`

``` bash
sudo certbot certonly --standalone --preferred-challenges http --agree-tos --email <email> -d <vpn-domain>
```

## Configure Server

Configure ocserv located at `/etc/ocserv/ocserv.conf`. 

Do these changes to the file. Leave all other rules untouched. Check if there are duplicate rules at the end of file, comment them.

``` ini
# use user+pass auth when connecting using openconnect
auth = "plain[passwd=/etc/ocserv/ocpasswd]"

# path to the certbot SSL certificates
server-cert = /etc/letsencrypt/live/vpn.example.com/fullchain.pem
server-key = /etc/letsencrypt/live/vpn.example.com/privkey.pem

# comment out UDP because SNI spoofing only works over TCP
udp-port = 443

# set this from false to true
try-mtu-discovery = true

# uncomment this
tunnel-all-dns = true

ipv4-network = 10.12.0.0
ipv4-netmask = 255.255.255.0

# set DNS to google and cloudflare
dns = 8.8.8.8
dns = 1.1.1.1

# comment all of the route parameters
#route = 10.0.0.0/8
#route = 172.16.0.0/12
#route = 192.168.0.0/16
#route = fd00::/8
#route = default
#no-route = 192.168.5.0/255.255.255.0
```

Finally restart ocserv to update the changes

``` bash
sudo systemctl restart ocserv
```

Set ocserv user <username> and password

``` bash
sudo ocpasswd -c /etc/ocserv/ocpasswd <username>
```

## Enable ip forwarding


For ocserv to route packets between clients and the internet, IPs need to be forwarded. Edit `/etc/sysctl.conf` and uncomment this line

``` bash
net.ipv4.ip_forward=1

# save
sysctl -p
```

## Firewall

There are two ways to configure the firewall. One is through `iptables` itself and the other is using `UFW`.


### Using iptables

Find the <interface> from `ifconfig` or `ip addr`. It should be something like `eth0`

```
iptables -t nat -A POSTROUTING -o <interface> -j MASQUERADE
```

To make the table rules persistent across reboots using this

```
apt-get -y install iptables-persistent
dpkg-reconfigure iptables-persistent
```

### Using UFW


Find the <interface> from `ifconfig` or `ip addr`. Edit the UFW startup config `/etc/ufw/before.rules.`

Add this to the end of the file.

``` r
# NAT table rules
*nat
:POSTROUTING ACCEPT [0:0]
-A POSTROUTING -s 10.12.0.0/24 -o <interface> -j MASQUERADE

# End each table with the 'COMMIT' line or these rules won't be processed
COMMIT
```

Add these after the `allow forwarding for trusted network` comment.

``` r
# allow forwarding for trusted network
-A ufw-before-forward -s 10.12.0.0/24 -j ACCEPT
-A ufw-before-forward -d 10.12.0.0/24 -j ACCEPT
```

Finally restart UFW.