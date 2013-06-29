
App.RelayDetailRoute = Ember.Route.extend({
    model: function(params){
        return params.fingerprint;
    },
    setupController: function(controller, fingerprint){

        var item = App.OnionooRelayDetail.find(fingerprint).then(function(item){
            controller.set('model', item);

            App.OnionooWeightsHistory.find(fingerprint).then(function(data){

                controller.set('weightPeriods', data.periods);
                controller.set('weightData', data.data);

            });

            App.OnionooBandwidthHistory.find(fingerprint).then(function(data){

                controller.set('bandwidthPeriods', data.periods);
                controller.set('bandwidthData', data.data);


            });
        });
    }
});