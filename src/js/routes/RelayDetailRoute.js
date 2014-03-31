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
                controller.set('periods', []);
                controller.set('periodsObject', {});

                GLOBE.OnionooWeightsHistory.find(fingerprint).then(function(data){
                    controller.set('weightPeriods', data.relays.periods);
                    controller.set('weightData', data.relays.history);
                    controller.updatePeriods(['weightData']);
                });

                GLOBE.OnionooBandwidthHistory.find(fingerprint).then(function(data){
                    controller.set('bandwidthPeriods', data.relays.periods);
                    controller.set('bandwidthData', data.relays.history);
                    controller.updatePeriods(['bandwidthData']);
                });

                GLOBE.OnionooUptimeHistory.find(fingerprint).then(function(data){
                    controller.set('uptimePeriods', data.relays.periods);
                    controller.set('uptimeData', data.relays.history);
                    controller.updatePeriods(['uptimeData']);
                });

            } else if(item.bridge && item.bridge.hasOwnProperty('hashed_fingerprint')) {
                // has bridge but no relay
                that.replaceWith('bridgeDetail', item.bridge.hashed_fingerprint);
            } else {
                // no relay or bridge found
                controller.set('model', null);
            }

            // handle page title
            GLOBE.set('title', controller.get('model') ? 'Details for ' + controller.get('nickname') + ' | Relay' : GLOBE.static.messages.detailsNotFound);
        });
    }
});