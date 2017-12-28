<?php

namespace Q7zh\Ratings\Listeners;

use Flarum\Api\Serializer\ForumSerializer;
use Flarum\Event\PrepareApiAttributes;
use Flarum\Settings\SettingsRepositoryInterface;
use Illuminate\Contracts\Events\Dispatcher;

class LoadSettingsFromDatabase {

	protected $settings;
	protected $fields = [
		'defaults'
	];

	public function __construct(SettingsRepositoryInterface $setting) {
		$this->settings = $setting;
	}

	public function subscribe(Dispatcher $events) {
		$events->listen(PrepareApiAttributes::class, [$this, 'prepareApiAttributes']);
	}

	public function prepareApiAttributes(PrepareApiAttributes $event) {
		if ($event->isSerializer(ForumSerializer::class)) {
			foreach ($this->fields as $field) {
                $k = 'q7zh.ratings.' . $field;
                $event->attributes[$k] = $this->settings->get($k);
            }
		}
	}
}