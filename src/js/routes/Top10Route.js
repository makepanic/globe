/*global GLOBE, Ember */
GLOBE.Top10Route = Ember.Route.extend({
    activate: function(){

        GLOBE.set('title', 'Top 10 relays');

    },
    setupController: function(controller){
        // update main search bar

        GLOBE.OnionooDetail.top10('-consensus_weight').then(function(summaries){
            controller.set('content', summaries.relays);
        });
    }
});