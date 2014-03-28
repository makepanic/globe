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

                // no weight data
                GLOBE.OnionooBandwidthHistory.find(fingerprint, true).then(function(data){
                    controller.set('bandwidthPeriods', data.bridges.periods);
                    controller.set('bandwidthData', data.bridges.history);
                });

                GLOBE.OnionooUptimeHistory.find(fingerprint, true).then(function(data){
                    controller.set('uptimePeriods', data.bridges.periods);
                    controller.set('uptimeData', data.bridges.history);
                });

                GLOBE.OnionooClientsHistory.find(fingerprint, true).then(function(data){
                    controller.set('clientsPeriods', data.bridges.periods);
                    controller.set('clientsData', data.bridges.history);
                });

            } else {
                // no bridge found
                controller.set('model', null);
            }
        });
    }
});