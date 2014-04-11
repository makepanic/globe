/*global GLOBE, Em */
GLOBE.BridgeDetailRoute = Em.Route.extend({
    model: function(params){
        return params.fingerprint;
    },
    setupController: function(controller, fingerprint){

        GLOBE.OnionooDetail.find(fingerprint).then(function(item){
            // check if found bridge
            if (item.bridge.hasOwnProperty('hashed_fingerprint')) {

                item = item.bridge;
                controller.set('model', item);
                controller.set('periods', []);
                controller.set('periodsObject', {});

                Em.RSVP.hash({
                    bandwidth: GLOBE.OnionooBandwidthHistory.find(fingerprint, true),
                    uptime: GLOBE.OnionooUptimeHistory.find(fingerprint, true),
                    clients: GLOBE.OnionooClientsHistory.find(fingerprint, true)
                }).then(function(result){

                    controller.setProperties({
                        bandwidthPeriods: result.bandwidth.bridges.periods,
                        bandwidthData: result.bandwidth.bridges.history,
                        uptimePeriods: result.uptime.bridges.periods,
                        uptimeData: result.uptime.bridges.history,
                        clientsPeriods: result.clients.bridges.periods,
                        clientsData: result.clients.bridges.history
                    });

                    controller.updatePeriods(['bandwidthData', 'uptimeData', 'clientsData']);
                });


            } else {
                // no bridge found
                controller.set('model', null);
            }

            // handle page title
            GLOBE.set('title', controller.get('model') ? 'Details for ' + controller.get('nickname') + ' | Bridge' : GLOBE.static.messages.detailsNotFound);
        });
    }
});