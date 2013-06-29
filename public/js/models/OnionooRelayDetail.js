
App.OnionooRelayDetail = Ember.Object.extend({});
App.OnionooRelayDetail.reopenClass({
    find: function(fingerprint){

        // use generate hashed fingerprint
        var hashedFingerprint = App.Util.hashFingerprint(fingerprint);
        return $.getJSON('https://onionoo.torproject.org/details?lookup=' + hashedFingerprint, {}).then(function(result){
            // right now i only care about relays

            var detail = {};

            if(result && result.relays && result.relays.length){

                for(var i = 0, max = result.relays.length; i < max; i++){

                    // create default details object and overwrite with given results
                    var relay = $.extend({}, defaultOnionooDetails, result.relays[i]);
                    detail = App.OnionooRelayDetail.create(relay);
                }

            }

            return detail;
        });

    }
});