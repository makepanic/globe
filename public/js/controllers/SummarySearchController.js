App.SummarySearchController = Ember.ArrayController.extend({
    needs: ['application'],
    content: [],
    active: 'relays',

    summaries: {},
    relays: Ember.ArrayController.create({
        content: Ember.A([]),
        summaries: Ember.A([])
    }),
    bridges: Ember.ArrayController.create({
        content: Ember.A([]),
        summaries: Ember.A([])
    }),

    relaysActive: function(){
        return this.get('active') === 'relays';
    }.property('active'),
    bridgesActive: function(){
        return this.get('active') === 'bridges';
    }.property('active'),

    relaysChanged: function(){
        var that = this;

        var relaysController = this.get('relays');

        var relays = this.get('relays.summaries');

        console.log('relays.summaries changed');

        for(var i = 0, relayNum = relays.length; i < relayNum; i++){
            (function(i){

                // wrap in closure to bake i
                var relay = relays[i];
                if(!relay['f'].length){
                    throw 'Relay has no fingerprint';
                }else{
                    App.OnionooDetail.find(relay['f']).then(function(item){
                        relaysController.addObject(item.relay);
                    });
                }
            })(i);
        }

    }.observes('relays.summaries'),

    bridgesChanged: function(){
        var that = this;
        var bridgesController = this.get('bridges');
        var bridges = this.get('bridges.summaries');

        for(var i = 0, bridgesNum = bridges.length; i < bridgesNum; i++){
            (function(i){

                // wrap in closure to bake i
                var bridge = bridges[i];
                if(!bridge['h'].length){
                    throw 'Bridge has no hashed fingerprint';
                }else{
                    App.OnionooDetail.find(bridge['h'], true).then(function(item){
                        bridgesController.addObject(item.bridge);
                    });
                }
            })(i);
        }
    }.observes('bridges.summaries'),

    resultChanged: function(){

        var query = this.get('query');
        var relayCount = this.get('relays.content.length');
        var bridgeCount = this.get('bridges.content.length');

        App.set('message', '<span class="subtle">searched for</span> <strong>' + query +'</strong>');

    }.observes('bridges.content.length', 'relays.content.length'),

    query: '',
    sortProperties: ['nickname'],
    sortAscending: false,

    activateSummaries: function(what){
        switch(what){
            case 'relays':
                this.set('active', 'relays')
                this.set('content', this.get('relays'));
                break;
            case 'bridges':
                this.set('active', 'bridges');
                this.set('content', this.get('bridges'));
                break;
        }
    },

    sort: function(what){

        if(this.get('sortProperties')[0] === what){
            this.toggleProperty('sortAscending');
        }else{
            this.set('sortProperties', [what]);
            this.set('sortAscending', true);
        }

    },

    showBridgeDetail: function(fingerprint){
        this.transitionToRoute('bridgeDetail', fingerprint);
    },
    showRelayDetail: function(fingerprint){
        this.transitionToRoute('relayDetail', fingerprint);
    }
});