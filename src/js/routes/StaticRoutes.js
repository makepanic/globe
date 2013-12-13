/*global GLOBE, Em */
/**
 * Route for /index
 */
GLOBE.IndexRoute = Em.Route.extend({
    activate: function(){
        GLOBE.set('title', '');
    }
});

/**
 * Route for /code
 */
GLOBE.CodeRoute = Em.Route.extend({
    activate: function(){
        GLOBE.set('title', 'Code');
    }
});

/**
 * Route for /help
 */
GLOBE.HelpRoute = Em.Route.extend({
    activate: function(){
        GLOBE.set('title', 'Help');
    }
});