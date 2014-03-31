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

                // no weight data
                GLOBE.OnionooBandwidthHistory.find(fingerprint, true).then(function(data){
                    controller.setProperties({
                        bandwidthPeriods: data.bridges.periods,
                        bandwidthData: data.bridges.history
                    });
                    controller.updatePeriods(['bandwidthData']);
                });

                GLOBE.OnionooUptimeHistory.find(fingerprint, true).then(function(data){
                    controller.setProperties({
                        uptimePeriods: data.bridges.periods,
                        uptimeData: data.bridges.history
                    });
                    controller.updatePeriods(['uptimeData']);
                });

                GLOBE.OnionooClientsHistory.find(fingerprint, true).then(function(data){
                    controller.setProperties({
                        clientsPeriods: data.bridges.periods,
                        clientsData: data.bridges.history
                    });
                    controller.updatePeriods(['clientsData']);
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