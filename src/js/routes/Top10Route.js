/*global GLOBE, Em */
GLOBE.Top10Route = Em.Route.extend({
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