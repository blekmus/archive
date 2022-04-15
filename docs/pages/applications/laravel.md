## HTTPS Issues

When the page is in https but links to page assets aren't. 

First check the site URL in `config/app.php`. There should be a `url` key with the value of the site URL.

```php
'url' => 'https://your-website.domain'
```

If the `url` is already set to `https` then goto the `AppServiceProvider.php` and add the following line to the `boot` method.

```php
public function boot()
{
    $this->app['request']->server->set('HTTPS','on');
}
```