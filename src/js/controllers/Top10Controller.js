/*global GLOBE, Em */
GLOBE.Top10Controller = Em.ArrayController.extend({
    needs: ['application'],
    relays: [],

    actions: {
        showRelayDetail: function(fingerprint){
            this.transitionToRoute('relayDetail', fingerprint);
        }
    }
});