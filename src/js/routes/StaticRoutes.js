/*global GLOBE, Ember */
/**
 * Route for /index
 */
GLOBE.IndexRoute = Ember.Route.extend({
    activate: function(){
        GLOBE.set('title', '');
    }
});

/**
 * Route for /code
 */
GLOBE.CodeRoute = Ember.Route.extend({
    activate: function(){
        GLOBE.set('title', 'Code');
    }
});

/**
 * Route for /help
 */
GLOBE.HelpRoute = Ember.Route.extend({
    activate: function(){
        GLOBE.set('title', 'Help');
    }
});