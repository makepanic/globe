App.OnionooRelayDetail = Ember.Object.extend({});
App.OnionooBridgeDetail = Ember.Object.extend({});


App.OnionooDetail = Ember.Object.extend({});
App.OnionooDetail.reopenClass({
    applyDetailDefaults: function(result){
        var details = {
            relay: $.extend({}, defaultOnionooRelayDetail),
            bridge: $.extend({}, defaultOnionooBridgeDetail)
        };

        if(result &&
            result.hasOwnProperty('relays') &&
            result.hasOwnProperty('bridges')){

            if(result.relays.length > 1 || result.bridges.length > 1){
                throw 'Result should only contain 1 detail object';
            }
            if(result.relays.length === 1){
                // process result relays
                var relay = $.extend({}, defaultOnionooRelayDetail, result.relays[0]);
                details.relay = App.OnionooRelayDetail.create(relay);
            }

            if(result.bridges.length === 1){
                // process result bridges
                var bridge = $.extend({}, defaultOnionooBridgeDetail, result.bridges[0]);
                details.bridge = App.OnionooBridgeDetail.create(bridge);
            }
        }
        return details;
    },
    find: function(fingerprint, isHashed){
        var that = this;
        var hashedFingerprint = fingerprint;

        if(!isHashed){
            // use generate hashed fingerprint if not already hashed
            hashedFingerprint = App.Util.hashFingerprint(fingerprint);
        }

        hashedFingerprint = hashedFingerprint.toUpperCase();

        var storedDetail = App.TemporaryStore.find('details', hashedFingerprint);
        if(storedDetail === undefined){
            // has no detail stored

            App.incrementProperty('loading');

            return $.getJSON('https://onionoo.torproject.org/details?lookup=' + hashedFingerprint, {}).then(function(result){
                var detailObj = that.applyDetailDefaults(result);

                App.decrementProperty('loading');

                App.TemporaryStore.store('details', hashedFingerprint, detailObj);
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


    }
});