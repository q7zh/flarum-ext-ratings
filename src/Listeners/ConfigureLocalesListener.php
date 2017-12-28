<?php

namespace Q7zh\Ratings\Listeners;

use Flarum\Event\ConfigureLocales;
use DirectoryIterator;
use Illuminate\Contracts\Events\Dispatcher;

class ConfigureLocalesListener {

	public function subscribe(Dispatcher $events) {
		$events->listen(ConfigureLocales::class, [$this, 'configureLocales']);
	}

	public function configureLocales(ConfigureLocales $event) {
		foreach (new DirectoryIterator(__DIR__.'/../../locale') as $file) {
            if ($file->isFile() && in_array($file->getExtension(), ['yml', 'yaml'], false)) {
                $event->locales->addTranslations($file->getBasename('.' . $file->getExtension()), $file->getPathname());
            }
        }
	}
}