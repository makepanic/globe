App.SummarySearchController = Ember.ArrayController.extend({
    needs: ['application'],
    content: [],
    active: 'relays',

    summaries: {},
    relays: Ember.ArrayController.create({ content: Ember.A([]) }),
    bridges: Ember.ArrayController.create({ content: Ember.A([]) }),

    relaysActive: function(){
        return this.get('active') === 'relays';
    }.property('active'),
    bridgesActive: function(){
        return this.get('active') === 'bridges';
    }.property('active'),

    relaysChanged: function(){
        var that = this;
        var relaysController = this.get('relays');
        var relays = relaysController.get('content');

        for(var i = 0, relayNum = relays.length; i < relayNum; i++){
            (function(i){
                // wrap in closure to bake i
                var relay = relays[i];
                if(!relay['f'].length){
                    throw 'Relay has no fingerprint';
                }else{
                    App.OnionooDetail.find(relay['f']).then(function(item){

                        relaysController.replaceContent(i, 1, [item.relay]);

                    });
                }
            })(i);
        }

    }.observes('relays.content'),

    bridgesChanged: function(){
        var that = this;
        var bridgesController = this.get('bridges');
        var bridges = bridgesController.get('content');

        for(var i = 0, bridgesNum = bridges.length; i < bridgesNum; i++){
            (function(i){
                // wrap in closure to bake i
                var bridge = bridges[i];
                if(!bridge['h'].length){
                    throw 'Bridge has no hashed fingerprint';
                }else{
                    App.OnionooDetail.find(bridge['h'], true).then(function(item){

                        bridgesController.replaceContent(i, 1, [item.bridge]);

                    });
                }
            })(i);
        }
    }.observes('bridges.content'),

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
    },

    contentChanged: function(){
        var that = this;
        var content = this.get('content');
        var query = this.get('query');

        // TODO: delete if not used
    }.observes('content')
});