GLOBE.OnionooRelayDetail = Ember.Object.extend({});
GLOBE.OnionooBridgeDetail = Ember.Object.extend({});

GLOBE.OnionooDetail = Ember.Object.extend({});
GLOBE.OnionooDetail.reopenClass({
    applyDetailDefaults: function(result, defaults){
        var details = {
            relays: [],
            bridges: []
        };

        if(result &&
            result.hasOwnProperty('relays') &&
            result.hasOwnProperty('bridges')){

            if(result.relays.length){
                for(var i = 0, numRelays = result.relays.length; i < numRelays; i++){

                    // process result relays
                    var relay = $.extend({}, defaults.relay, result.relays[i]);
                    details.relays.push(GLOBE.OnionooRelayDetail.create(relay));

                }
            }

            if(result.bridges.length){
                for(var j = 0, numBridges = result.bridges.length; j < numBridges; j++){
                    // process result bridges
                    var bridge = $.extend({}, defaults.bridge, result.bridges[j]);
                    details.bridges.push(GLOBE.OnionooBridgeDetail.create(bridge));
                }
            }
        }
        return details;
    },

    /**
     * find a detail object with a given filter
     * @param opts
     * @returns {*}
     */
    findWithFilter: function(opts){
        //query, filter, fields
        var query = opts.query || '';
        var filter = opts.filter || {};
        var fields = opts.fields || [];

        var that = this;
        GLOBE.incrementProperty('loading');

        // only add search param if query is not empty
        var searchParamString = '';
        if (query.length) {
            searchParamString = '&search=' + query;
        }

        // add fields parameters
        var fieldParamString = '';
        if(fields.length){
            fieldParamString = '&fields=' + fields.join(',');
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

        // build request url
        var url = 'https://onionoo.torproject.org/details?limit=' + GLOBE.static.numbers.maxSearchResults;
            url += searchParamString + advancedParamsString + fieldParamString;

        return $.getJSON(url).then(function(result){
            GLOBE.decrementProperty('loading');

            return that.applyDetailDefaults(result, {
                relay: defaultOnionooRelayDetail,
                bridge: defaultOnionooBridgeDetail
            });
        });

    },

    /**
     * Find detail object for a given fingerprint
     * @param fingerprint
     * @param isHashed
     * @returns {*}
     */
    find: function(fingerprint, isHashed){
        var that = this;
        var hashedFingerprint = fingerprint;

        if(!isHashed){
            // use generate hashed fingerprint if not already hashed
            hashedFingerprint = GLOBE.Util.hashFingerprint(fingerprint);
        }

        hashedFingerprint = hashedFingerprint.toUpperCase();

        var storedDetail = GLOBE.TemporaryStore.find('details', hashedFingerprint);
        if(storedDetail === undefined){
            // has no detail stored

            GLOBE.incrementProperty('loading');

            return $.getJSON('https://onionoo.torproject.org/details?lookup=' + hashedFingerprint, {}).then(function(result){
                var detailsObj = that.applyDetailDefaults(result, {
                    relay: defaultOnionooRelayDetail,
                    bridge: defaultOnionooBridgeDetail
                });

                // use first object from relay and bridge array as detail object
                var detailObj = {
                    relay: detailsObj.relays.length ? detailsObj.relays[0] : [],
                    bridge: detailsObj.bridges.length ? detailsObj.bridges[0] : []
                };

                GLOBE.decrementProperty('loading');

                GLOBE.TemporaryStore.store('details', hashedFingerprint, detailObj);
                return  detailObj;
            });

        }else{
            var defer = new $.Deferred();

            setTimeout(function(){
                // wait 4 ms (http://stackoverflow.com/a/9647221) then resolve with stored detail
                defer.resolve(storedDetail);
            }, 4);

            return defer.promise();
        }
    },

    /**
     * Get the top10 detail objects
     * @param order string parameter for the onionoo `?order` parameter
     * @returns {*} promise
     */
    top10: function(order){
        var that = this;
        var fields = ['fingerprint', 'nickname', 'advertised_bandwidth', 'last_restarted', 'country', 'flags', 'or_addresses', 'dir_address', 'running', 'hashed_fingerprint'];

        // right now a fixed order
        order = '-consensus_weight';

        GLOBE.incrementProperty('loading');
        return $.getJSON('https://onionoo.torproject.org/details?type=relay&order=' + order + '&limit=10' + '&fields=' + fields.join(','), {}).then(function(result){
            GLOBE.decrementProperty('loading');

            return that.applyDetailDefaults(result, {
                relay: defaultOnionooRelayDetail,
                bridge: defaultOnionooBridgeDetail
            });
        });
    }
});