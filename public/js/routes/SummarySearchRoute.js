
App.SummarySearchRoute = Ember.Route.extend({
    model: function(params){
        return params.query;
    },
    setupController: function(controller, query){
        controller.set('query', query);

        // update main search bar
        controller.set('controllers.application.query', query);

        if(App.Util.is40CharHex(query)){
            console.log('is 40 char hex string, hashing...');
            query = App.Util.hashFingerprint(query);
        }

        App.OnionooSummary.find(query).then(function(summaries){
            // update offset and limit with find defaults
            controller.set('offset', 50);
            controller.set('limit', 50);

            controller.set('relays.summaries', summaries.relays);
            controller.set('bridges.summaries', summaries.bridges);
        });
    }
});