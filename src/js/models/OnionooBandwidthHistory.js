/*global GLOBE, Em */

GLOBE.OnionooBandwidthHistory = Em.Object.extend({});
GLOBE.OnionooBandwidthHistory.reopenClass({

    /**
     * Find bandwidth history for a given fingerprint
     * @param {String} fingerprint
     * @param {Boolean} isHashed flag if the given hash is already hashed
     * @returns {Promise}
     */
    find: function(fingerprint, isHashed){
        var hashedFingerprint = fingerprint;
        if(!isHashed){
            // use generate hashed fingerprint if not already hashed
            hashedFingerprint = GLOBE.Util.hashFingerprint(fingerprint);
        }

        hashedFingerprint = hashedFingerprint.toUpperCase();

        var url = '/bandwidth?lookup=' + hashedFingerprint;
        return GLOBE.getJSON(url).then(function(result){

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

                    relays.periods = GLOBE.Util.prepareHistoryItems(relays.history, toBuild);
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

                    bridges.periods = GLOBE.Util.prepareHistoryItems(bridges.history, bridgeToBuild);

                }
            }

            return {
                relays: relays,
                bridges: bridges
            };
        });
    }
});