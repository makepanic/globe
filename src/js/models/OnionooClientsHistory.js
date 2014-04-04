/*global GLOBE, Em */

GLOBE.OnionooClientsHistory = Em.Object.extend({});
GLOBE.OnionooClientsHistory.reopenClass({

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

        var url = '/clients?lookup=' + hashedFingerprint;
        return GLOBE.getJSON(url).then(function(result){
            return GLOBE.Util.compute3DaysHistory(GLOBE.Util.processHistoryResponse({
                averageClients: 'average_clients'
            }, result));
        });
    }
});