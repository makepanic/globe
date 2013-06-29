
App.RelaySearchRoute = Ember.Route.extend({
    model: function(params){
        return params.query;
    },
    setupController: function(controller, query){
        controller.set('query', query);

        // update main search bar
        controller.set('controllers.application.query', query);

        App.OnionooRelaySummary.find(query).then(function(summaries){
            controller.set('content', summaries);
        });
    }
});