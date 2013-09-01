
GLOBE.IndexRoute = Ember.Route.extend({
    activate: function(){

        GLOBE.set('title', '');
        GLOBE.set('message', '');

    },
    setupController: function(controller, query){
        // update main search bar

        GLOBE.OnionooDetail.top10('-consensus_weight').then(function(summaries){
            controller.set('content', summaries.relays);
        });
    }
});