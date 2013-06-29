
App.IndexRoute = Ember.Route.extend({
    activate: function(){

        App.set('title', '');
        App.set('message', '');

    },
    setupController: function(controller, query){
        // update main search bar

        console.log('setting up the controller');
        App.OnionooRelaySummary.top10('-consensus_weight').then(function(summaries){

            console.log('setting summaries', summaries);
            controller.set('content', summaries);
        });
    }
});