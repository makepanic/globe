
GLOBE.BridgeDetailRoute = Ember.Route.extend({
    model: function(params){
        return params.fingerprint;
    },
    setupController: function(controller, fingerprint){

        GLOBE.OnionooDetail.find(fingerprint).then(function(item){

            item = item.bridge;
            controller.set('model', item);

            // no weight data
            GLOBE.OnionooBandwidthHistory.find(fingerprint, true).then(function(data){
                controller.set('bandwidthPeriods', data.bridges.periods);
                controller.set('bandwidthData', data.bridges.history);
            });
        });
    }
});