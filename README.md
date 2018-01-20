# flarum-ext-ratings

Extension for Flarum, enabling content rating settings on discussions.

##Getting Started

####Prerequisites

- [flarum/core](https://packagist.org/packages/flarum/core): ^0.1.0-beta.7

####Installation

Execute the following command in the root directory of your flarum.

```bash
composer require q7zh/flarum-ext-ratings
```

Make sure that the following directories and files are writable by the web/php user:

- `composer.json`
- `composer.lock`
- ``vendor/``

####Updating

Execute the following commands in the root directory of your flarum.

```bash
composer update q7zh/flarum-ext-ratings
php flarum migrate
php flarum cache:clear
```
