App.OnionooRelaySummary = Ember.Object.extend({});
App.OnionooBridgeSummary = Ember.Object.extend({});

App.OnionooSummary = Ember.Object.extend({});
App.OnionooSummary.reopenClass({
    applySummaryDefaults: function(result){
        var summaries = {
            relays: [],
            bridges: []
        };

        if(result){

            if(result.relays && result.relays.length){

                for(var i = 0, numRelays = result.relays.length; i < numRelays; i++){
                    // create default summary object and overwrite with given results
                    var relay = $.extend({}, defaultOnionooRelaySummary, result.relays[i]);
                    summaries.relays.push(App.OnionooRelaySummary.create(relay));
                }

            }
            if(result.bridges && result.bridges.length){

                for(var j = 0, numBridges = result.bridges.length; j < numBridges; j++){
                    var bridge = $.extend({}, defaultOnionooBridgeSummary, result.bridges[j]);
                    summaries.bridges.push(App.OnionooBridgeSummary.create(bridge));
                }

            }
        }
        return summaries;
    },
    find: function(query){
        var that = this;

        App.incrementProperty('loading');
        return $.getJSON('https://onionoo.torproject.org/summary?search=' + query, {}).then(function(result){
            App.decrementProperty('loading');

            return that.applySummaryDefaults(result);
        });
    },
    top10: function(order){
        var that = this;

        // right now a fixed order
        order = '-consensus_weight';

        App.incrementProperty('loading');
        return $.getJSON('https://onionoo.torproject.org/details?type=relay&order=' + order + '&limit=10', {}).then(function(result){
            App.decrementProperty('loading');

            return that.applySummaryDefaults(result);
        });

    }
});