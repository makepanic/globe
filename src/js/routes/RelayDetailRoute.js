/*global GLOBE, Em */
GLOBE.RelayDetailRoute = Em.Route.extend({
    model: function(params){
        return params.fingerprint;
    },
    setupController: function(controller, fingerprint){
        var that = this;

        GLOBE.OnionooDetail.find(fingerprint).then(function(item){

            // check if found relay
            if (item.relay.hasOwnProperty('fingerprint')) {

                // has relay
                item = item.relay;
                controller.set('model', item);

                GLOBE.OnionooWeightsHistory.find(fingerprint).then(function(data){
                    controller.set('weightPeriods', data.periods);
                    controller.set('weightData', data.data);
                });

                GLOBE.OnionooBandwidthHistory.find(fingerprint).then(function(data){
                    controller.set('bandwidthPeriods', data.relays.periods);
                    controller.set('bandwidthData', data.relays.history);
                });

            } else if(item.bridge && item.bridge.hasOwnProperty('hashed_fingerprint')) {
                // has bridge but no relay
                that.replaceWith('bridgeDetail', item.bridge.hashed_fingerprint);
            } else {
                // no relay or bridge found
                controller.set('model', null);
            }
        });
    }
});