/*global GLOBE, Ember */
GLOBE.IndexRoute = Ember.Route.extend({
    activate: function(){
        GLOBE.set('title', '');
    }
});

GLOBE.CodeRoute = Ember.Route.extend({
    activate: function(){
        GLOBE.set('title', 'Code');
    }
});

GLOBE.HelpRoute = Ember.Route.extend({
    activate: function(){
        GLOBE.set('title', 'Help');
    }
});