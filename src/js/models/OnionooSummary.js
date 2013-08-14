GLOBE.OnionooRelaySummary = Ember.Object.extend({});
GLOBE.OnionooBridgeSummary = Ember.Object.extend({});

GLOBE.OnionooSummary = Ember.Object.extend({});
GLOBE.OnionooSummary.reopenClass({
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
                    summaries.relays.push(GLOBE.OnionooRelaySummary.create(relay));
                }

            }
            if(result.bridges && result.bridges.length){

                for(var j = 0, numBridges = result.bridges.length; j < numBridges; j++){
                    var bridge = $.extend({}, defaults.bridge, result.bridges[j]);
                    summaries.bridges.push(GLOBE.OnionooBridgeSummary.create(bridge));
                }

            }
        }
        return summaries;
    },
    findWithFilter: function(query, filter){
        var that = this;
        
        GLOBE.incrementProperty('loading');

        // only add search param if query is not empty
        var searchParamString = '';
        if (query.length) {
            searchParamString = '&search='+query; 
        }

        // manually set params
        var advancedParamsString = '&';
        for(var filterParam in filter){
            if(filter.hasOwnProperty(filterParam)){
                if(filter[filterParam].length){
                    advancedParamsString += filterParam + '=' + filter[filterParam] + '&';
                }
            }
        }
        // remove last &
        advancedParamsString = advancedParamsString.slice(0, -1);
        
        return $.getJSON('https://onionoo.torproject.org/summary?limit=' + GLOBE.static.numbers.maxSearchResults + searchParamString + advancedParamsString, {}).then(function(result){
            GLOBE.decrementProperty('loading');

            return that.applySummaryDefaults(result, {
                relay: defaultOnionooRelaySummary,
                bridge: defaultOnionooBridgeSummary
            });
        });
    },
    find: function(query){
        var that = this;

        GLOBE.incrementProperty('loading');
        return $.getJSON('https://onionoo.torproject.org/summary?limit=' + GLOBE.static.numbers.maxSearchResults + '&search=' + query, {}).then(function(result){
            GLOBE.decrementProperty('loading');
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

        GLOBE.incrementProperty('loading');
        return $.getJSON('https://onionoo.torproject.org/details?type=relay&order=' + order + '&limit=10', {}).then(function(result){
            GLOBE.decrementProperty('loading');

            return that.applySummaryDefaults(result, {
                    relay: defaultOnionooRelayDetail,
                    bridge: defaultOnionooBridgeDetail
                });
        });

    }
});
