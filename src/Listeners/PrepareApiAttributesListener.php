<?php

namespace Q7zh\Ratings\Listeners;

use Flarum\Event\PrepareApiAttributes;
use Flarum\Api\Serializer\PostSerializer;
use Illuminate\Contracts\Events\Dispatcher;

class PrepareApiAttributesListener {

	public function subscribe(Dispatcher $events) {
		$events->listen(PrepareApiAttributes::class, [$this, 'prepareApiAttributes']);
	}

	public function prepareApiAttributes(PrepareApiAttributes $event) {

       	if ($event->isSerializer(PostSerializer::class)) {
            $event->attributes['ratings'] = $event->model->ratings;
        }
	}
}