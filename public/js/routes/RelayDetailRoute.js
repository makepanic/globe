
App.RelayDetailRoute = Ember.Route.extend({
    model: function(params){
        return params.fingerprint;
    },
    setupController: function(controller, fingerprint){

        var item = App.OnionooDetail.find(fingerprint).then(function(item){

            item = item.relay;
            controller.set('model', item);

            // object not empty

            App.OnionooWeightsHistory.find(fingerprint).then(function(data){
                controller.set('weightPeriods', data.periods);
                controller.set('weightData', data.data);
            });

            App.OnionooBandwidthHistory.find(fingerprint).then(function(data){
                controller.set('bandwidthPeriods', data.relays.periods);
                controller.set('bandwidthData', data.relays.history);
            });


        });
    }
});