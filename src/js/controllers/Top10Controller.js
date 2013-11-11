/*global GLOBE, Ember */
GLOBE.Top10Controller = Ember.ArrayController.extend({
    needs: ['application'],
    content: [],
    relays: [],

    actions: {
        showRelayDetail: function(fingerprint){
            this.transitionToRoute('relayDetail', fingerprint);
        }
    }
});