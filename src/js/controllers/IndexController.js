App.IndexController = Ember.ArrayController.extend({
    needs: ['application'],
    content: [],
    relays: [],

    sortProperties: ['nickname'],
    sortAscending: false,

    sort: function(what){

        if(this.get('sortProperties')[0] === what){
            this.toggleProperty('sortAscending');
        }else{
            this.set('sortProperties', [what]);
            this.set('sortAscending', true);
        }

    },

    showRelayDetail: function(fingerprint){
        this.transitionToRoute('relayDetail', fingerprint);
    }
});