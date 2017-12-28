<?php

use Flarum\Database\Migration;

return Migration::addColumns('posts', [
	'ratings' => ['string', 'length' => 20, 'default' => 'none']
]);