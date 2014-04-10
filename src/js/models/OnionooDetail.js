/*global $, GLOBE, Em, moment */

GLOBE.OnionooRelayDetail = Em.Object.extend({});
GLOBE.OnionooBridgeDetail = Em.Object.extend({});

GLOBE.OnionooDetail = Em.Object.extend({});
GLOBE.OnionooDetail.reopenClass({
    applyDetailDefaults: function(result, defaults){
        var details = {
            relays: [],
            bridges: []
        };

        if(result &&
            result.hasOwnProperty('relays') &&
            result.hasOwnProperty('bridges')){

            var consensus = {
                bridges: moment.utc(result.bridges_published),
                relays: moment.utc(result.relays_published)
            };

            if(result.relays.length){
                for(var i = 0, numRelays = result.relays.length; i < numRelays; i++){

                    // process result relays
                    var relay = $.extend({}, defaults.relay, result.relays[i]);
                    var relayObj = GLOBE.OnionooRelayDetail.create(relay);
                    var relayLastSeenMoment = moment.utc(relayObj.get('last_seen'));

                    // check if consensus.relays and lastSeenMoment exist
                    if( consensus.relays && relayLastSeenMoment &&
                        // check if both are valid (moment.isValid)
                        consensus.relays.isValid() && relayLastSeenMoment.isValid()){
                        relayObj.set('inLatestConsensus', consensus.relays.isSame(relayLastSeenMoment));
                    }

                    details.relays.push(relayObj);

                }
            }

            if(result.bridges.length){
                for(var j = 0, numBridges = result.bridges.length; j < numBridges; j++){
                    // process result bridges
                    var bridge = $.extend({}, defaults.bridge, result.bridges[j]);
                    var bridgeObj = GLOBE.OnionooRelayDetail.create(bridge);
                    var bridgeLastSeenMoment = moment.utc(bridgeObj.get('last_seen'));

                    // check if consensus.relays and lastSeenMoment exist
                    if( consensus.bridges && bridgeLastSeenMoment &&
                        // check if both are valid (moment.isValid)
                        consensus.bridges.isValid() && bridgeLastSeenMoment.isValid()){
                        bridgeObj.set('inLatestConsensus', consensus.bridges.isSame(bridgeLastSeenMoment));
                    }

                    details.bridges.push(bridgeObj);
                }
            }
        }
        return details;
    },

    /**
     * find a detail object with a given filter
     * @param {Object} opts
     * @returns {Promise}
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
        var url = '/details?limit=' + GLOBE.static.numbers.maxSearchResults;

        url += searchParamString + advancedParamsString + fieldParamString;

        return GLOBE.getJSON(url).then(function(result){
            // getJSON success callback

            GLOBE.decrementProperty('loading');
            return that.applyDetailDefaults(result, {
                relay: GLOBE.defaults.OnionooRelayDetail,
                bridge: GLOBE.defaults.OnionooBridgeDetail
            });

        }, function () {
            // getJSON error callback
            GLOBE.decrementProperty('loading');
            throw GLOBE.static.errors.INVALID_SEARCH_TERM;
        });

    },

    /**
     * Find detail object for a given fingerprint
     * @param {String} fingerprint
     * @param {Boolean} isHashed
     * @returns {Promise}
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

            var url = '/details?lookup=' + hashedFingerprint;

            return GLOBE.getJSON(url).then(function(result){
                var detailsObj = that.applyDetailDefaults(result, {
                    relay: GLOBE.defaults.OnionooRelayDetail,
                    bridge: GLOBE.defaults.OnionooBridgeDetail
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
            return new Em.RSVP.Promise(function (resolve) {
                resolve(storedDetail);
            });
        }
    },

    /**
     * Get the top10 detail objects
     * @param {String} order parameter for the onionoo `?order` parameter
     * @returns {Promise}
     */
    top10: function(order){
        var that = this;
        var fields = ['fingerprint', 'nickname', 'advertised_bandwidth', 'last_restarted', 'country', 'flags', 'or_addresses', 'dir_address', 'running', 'hashed_fingerprint'];

        // right now a fixed order
        order = '-consensus_weight';

        var url = '/details?type=relay';
        url += '&order=' + order;
        url += '&limit=10';
        url += '&fields=' + fields.join(',');
        url += '&running=true';

        GLOBE.incrementProperty('loading');
        return GLOBE.getJSON(url).then(function(result){
            GLOBE.decrementProperty('loading');

            return that.applyDetailDefaults(result, {
                relay: GLOBE.defaults.OnionooRelayDetail,
                bridge: GLOBE.defaults.OnionooBridgeDetail
            });
        });
    }
});