
App.OnionooBandwidthHistory = Ember.Object.extend({});
App.OnionooBandwidthHistory.reopenClass({

    find: function(fingerprint){
        var that = this;

        // use generate hashed fingerprint
        var hashedFingerprint = App.Util.hashFingerprint(fingerprint);

        return $.getJSON('https://onionoo.torproject.org/bandwidth?lookup=' + hashedFingerprint, {}).then(function(result){

            var history = {
                writeHistory: {},
                readHistory: {}
            };
            var periods = [];

            if(result && result.relays && result.relays.length){
                var relay = result.relays[0];

                var rHistory = relay.read_history,
                    wHistory = relay.write_history;

                var toBuild = {
                    'writeHistory': wHistory,
                    'readHistory': rHistory
                };

                periods = App.Util.prepareHistoryItems(history, toBuild);
            }

            return {
                data: history,
                periods: periods
            };
        });
    }
});