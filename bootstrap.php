<?php

namespace Q7zh\Ratings;

use Illuminate\Contracts\Events\Dispatcher;
use Flarum\Event\ConfigureLocales;
use DirectoryIterator;

return function (Dispatcher $events) {
	$events->subscribe(Listeners\AddClientAssets::class);
	$events->subscribe(Listeners\PostWillBeSavedListener::class);
	$events->subscribe(Listeners\PrepareApiAttributesListener::class);
	$events->subscribe(Listeners\LoadSettingsFromDatabase::class);
	$events->subscribe(Listeners\ConfigureLocalesListener::class);
};