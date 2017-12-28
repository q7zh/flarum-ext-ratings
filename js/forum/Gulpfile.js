var flarum = require('flarum-gulp');

flarum({
  modules: {
    'q7zh/flarum-ext-ratings': [
      'src/**/*.js'
    ]
  }
});