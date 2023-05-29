## Apache Configs

To convert `.htaccess` configs to nginx configs. Use [this](https://www.getpagespeed.com/apache-to-nginx) site.

## PHP Config

Here's a base nginx config for php. Make sure to change the php version and the `<url>`.

``` nginx
server {
    listen 80;
    listen [::]:80;
    server_name <url>;

    root /var/www/html;
    index index.php index.html index.htm index.nginx-debian.html;

    location / {
        try_files $uri $uri/ =404;
    }

    location ~ \.php$ {
        include snippets/fastcgi-php.conf;
        fastcgi_pass unix:/var/run/php/phpx.x-fpm.sock;
    }
}
```

## Reverse Proxy

``` nginx
server {
    server_name <domain>;
    listen 80;
    
    location / {
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header Host $http_host;
        proxy_pass http://127.0.0.1:<port>;
    }

    location ~ /.well-known {
        allow all;
    }
}
```

## Transfer www

First create an A record from both the root domain and the www subdomain towards the ip. Then in the nginx conf file, add the block below seperately

``` nginx
server {
    listen 80;
    server_name www.example.com;
    return 301 $scheme://example.com$request_uri;
}
```