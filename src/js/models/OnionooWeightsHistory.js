/*global $, GLOBE, Ember */
GLOBE.OnionooWeightsHistory = Ember.Object.extend({});
GLOBE.OnionooWeightsHistory.reopenClass({

    /**
     * Find weights history for a given fingerprint
     * @param fingerprint {String}
     * @param isHashed {Boolean}
     * @returns {Promise}
     */
    find: function(fingerprint, isHashed){
        var hashedFingerprint = fingerprint;
        if(!isHashed){
            // use generate hashed fingerprint if not already hashed
            hashedFingerprint = GLOBE.Util.hashFingerprint(fingerprint);
        }

        hashedFingerprint = hashedFingerprint.toUpperCase();

        var url = 'https://onionoo.torproject.org/weights?lookup=' + hashedFingerprint;

        return $.getJSON(url, {}).then(function(result){
            var history = {
                advertisedBandwidth: {},
                consensusWeightFraction: {},
                exitProbability: {},
                guardProbability: {}
            };
            var periods = [];

            if(result && result.relays && result.relays.length){
                var relay = result.relays[0];

                var abfHistory = relay.advertised_bandwidth_fraction,
                    cwfHistory = relay.consensus_weight_fraction,
                    epHistory = relay.exit_probability,
                    gpHistory = relay.guard_probability;

                var toBuild = {
                    'advertisedBandwidth': abfHistory,
                    'exitProbability': epHistory,
                    'guardProbability': gpHistory,
                    'consensusWeightFraction': cwfHistory
                };

                periods = GLOBE.Util.prepareHistoryItems(history, toBuild);
            }

            return {
                periods: periods,
                data: history
            };
        });
    }
});