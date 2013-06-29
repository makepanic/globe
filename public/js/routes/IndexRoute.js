
App.IndexRoute = Ember.Route.extend({
    activate: function(){

        App.set('title', '');
        App.set('message', '');

    }
});