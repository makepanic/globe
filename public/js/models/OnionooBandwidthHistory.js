
App.OnionooBandwidthHistory = Ember.Object.extend({});
App.OnionooBandwidthHistory.reopenClass({

    find: function(fingerprint, isHashed){
        var that = this;


        var hashedFingerprint = fingerprint;
        if(!isHashed){
            // use generate hashed fingerprint if not already hashed
            hashedFingerprint = App.Util.hashFingerprint(fingerprint);
        }

        hashedFingerprint = hashedFingerprint.toUpperCase();
        return $.getJSON('https://onionoo.torproject.org/bandwidth?lookup=' + hashedFingerprint, {}).then(function(result){

            var relays = {
                history:{
                    writeHistory: {},
                    readHistory: {}
                },
                periods: []
            };
            var bridges = {
                history:{
                    writeHistory: {},
                    readHistory: {}
                },
                periods: []
            };

            if(result){

                // relay data processing
                if(result.relays && result.relays.length){
                    var relay = result.relays[0];

                    var rHistory = relay.read_history,
                        wHistory = relay.write_history;

                    var toBuild = {
                        'writeHistory': wHistory,
                        'readHistory': rHistory
                    };

                    relays.periods = App.Util.prepareHistoryItems(relays.history, toBuild);
                }

                // bridge data processing
                if(result.bridges && result.bridges.length){
                    var bridge = result.bridges[0];

                    var bridgeReadHistory = bridge.read_history,
                        bridgeWriteHistory = bridge.write_history;

                    var bridgeToBuild = {
                        'writeHistory': bridgeWriteHistory,
                        'readHistory': bridgeReadHistory
                    };

                    bridges.periods = App.Util.prepareHistoryItems(bridges.history, bridgeToBuild);

                }
            }


            return {
                relays: relays,
                bridges: bridges
                /*
                data: history,
                periods: periods
                */
            };
        });
    }
});