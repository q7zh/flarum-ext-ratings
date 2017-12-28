<?php

namespace Q7zh\Ratings\Listeners;

use Flarum\Event\PostWillBeSaved;
use Flarum\Settings\SettingsRepositoryInterface;
use Illuminate\Contracts\Events\Dispatcher;

class PostWillBeSavedListener {

	protected $settings;

	public function __construct(SettingsRepositoryInterface $setting) {
		$this->settings = $setting;
	}

	public function subscribe(Dispatcher $events) {
		$events->listen(PostWillBeSaved::class, [$this, 'postWillBeSaved']);
	}

	public function postWillBeSaved(PostWillBeSaved $event) {
        $allowSetRatings = true;

        if (isset($event->data['attributes']['ratings']) && $allowSetRatings)
        {
            $tmp = $event->data['attributes']['ratings'];
            $event->post->ratings = $tmp;
        }
    }
}