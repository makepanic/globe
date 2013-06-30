
App.OnionooWeightsHistory = Ember.Object.extend({});
App.OnionooWeightsHistory.reopenClass({

    find: function(fingerprint){
        var that = this;

        // use generate hashed fingerprint
        var hashedFingerprint = App.Util.hashFingerprint(fingerprint);

        return $.getJSON('https://onionoo.torproject.org/weights?lookup=' + hashedFingerprint, {}).then(function(result){
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

                periods = App.Util.prepareHistoryItems(history, toBuild);
            }

            return {
                periods: periods,
                data: history
            };
        });
    }
});