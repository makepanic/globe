
App.IndexRoute = Ember.Route.extend({
    activate: function(){

        App.set('title', '');
        App.set('message', '');

    },
    setupController: function(controller, query){
        // update main search bar

        App.OnionooRelaySummary.top10('-consensus_weight').then(function(summaries){

            controller.set('content', summaries);
        });
    }
});