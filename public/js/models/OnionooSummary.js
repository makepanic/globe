App.OnionooRelaySummary = Ember.Object.extend({});
App.OnionooBridgeSummary = Ember.Object.extend({});

App.OnionooSummary = Ember.Object.extend({});
App.OnionooSummary.reopenClass({
    applySummaryDefaults: function(result, defaults){
        var summaries = {
            relays: [],
            bridges: []
        };

        if(result){

            if(result.relays && result.relays.length){

                for(var i = 0, numRelays = result.relays.length; i < numRelays; i++){
                    // create default summary object and overwrite with given results
                    var relay = $.extend({}, defaults.relay, result.relays[i]);
                    summaries.relays.push(App.OnionooRelaySummary.create(relay));
                }

            }
            if(result.bridges && result.bridges.length){

                for(var j = 0, numBridges = result.bridges.length; j < numBridges; j++){
                    var bridge = $.extend({}, defaults.bridge, result.bridges[j]);
                    summaries.bridges.push(App.OnionooBridgeSummary.create(bridge));
                }

            }
        }
        return summaries;
    },
    findWithFilter: function(query, filter){
        var that = this;

        App.incrementProperty('loading');

        // manually set params
        var advancedParamsString = '&';
        for(var filterParam in filter){
            if(filter.hasOwnProperty(filterParam)){
                if(filter[filterParam].length){
                    advancedParamsString += filterParam + '=' + filter[filterParam];
                }
            }
        }

        console.log('got', filter);
        console.log('finding with filter ', advancedParamsString);

        return $.getJSON('https://onionoo.torproject.org/summary?limit=50&search=' + query + advancedParamsString, {}).then(function(result){
            App.decrementProperty('loading');

            return that.applySummaryDefaults(result, {
                relay: defaultOnionooRelaySummary,
                bridge: defaultOnionooBridgeSummary
            });
        });
    },
    find: function(query){
        var that = this;

        App.incrementProperty('loading');
        return $.getJSON('https://onionoo.torproject.org/summary?limit=50&search=' + query, {}).then(function(result){
            App.decrementProperty('loading');

            return that.applySummaryDefaults(result, {
                relay: defaultOnionooRelaySummary,
                    bridge: defaultOnionooBridgeSummary
            });
        });
    },
    top10: function(order){
        var that = this;

        // right now a fixed order
        order = '-consensus_weight';

        App.incrementProperty('loading');
        return $.getJSON('https://onionoo.torproject.org/details?type=relay&order=' + order + '&limit=10', {}).then(function(result){
            App.decrementProperty('loading');

            return that.applySummaryDefaults(result, {
                    relay: defaultOnionooRelayDetail,
                    bridge: defaultOnionooBridgeDetail
                });
        });

    }
});