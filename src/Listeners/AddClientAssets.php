<?php

namespace Q7zh\Ratings\Listeners;

use Flarum\Event\ConfigureClientView;
use Illuminate\Contracts\Events\Dispatcher;

class AddClientAssets {

	public function subscribe(Dispatcher $events) {
		$events->listen(ConfigureClientView::class, [$this, 'configureClientView']);
	}

	public function configureClientView(ConfigureClientView $event) {

		if ($event->isForum()) {

			$event->addAssets([
				__DIR__.'/../../js/forum/dist/extension.js',
				__DIR__.'/../../less/forum/extension.less',
			]);
			$event->addBootstrapper('q7zh/flarum-ext-ratings/main');

		} else if ($event->isAdmin()) {

			$event->addAssets([
				__DIR__.'/../../js/admin/dist/extension.js',
				__DIR__.'/../../less/admin/extension.less',
			]);
			$event->addBootstrapper('q7zh/flarum-ext-ratings/main');
		}
	}
}