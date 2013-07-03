
App.SummarySearchRoute = Ember.Route.extend({
    model: function(params){
        return params.query;
    },
    setupController: function(controller, query){
        controller.set('query', query);

        // update main search bar
        controller.set('controllers.application.query', query);

        App.OnionooSummary.find(query).then(function(summaries){

            //controller.set('summaries', summaries);
            controller.set('relays.content', summaries.relays);
            controller.set('bridges.content', summaries.bridges);

            // set initial content
            controller.set('content', controller.get('relays.content'));

        });
    }
});