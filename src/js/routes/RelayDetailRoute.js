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

                Em.RSVP.hash({
                    weight: GLOBE.OnionooWeightsHistory.find(fingerprint),
                    bandwidth: GLOBE.OnionooBandwidthHistory.find(fingerprint),
                    uptime: GLOBE.OnionooUptimeHistory.find(fingerprint)
                }).then(function(result){

                    controller.setProperties({
                        weightPeriods: result.weight.relays.periods,
                        weightData: result.weight.relays.history,
                        bandwidthPeriods: result.bandwidth.relays.periods,
                        bandwidthData: result.bandwidth.relays.history,
                        uptimePeriods: result.uptime.relays.periods,
                        uptimeData: result.uptime.relays.history
                    });

                    controller.updatePeriods(['weightData', 'bandwidthData', 'uptimeData']);
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