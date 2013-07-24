App.SummarySearchController = Ember.ArrayController.extend({
    needs: ['application'],
    content: [],
    active: 'relays',
    offset: 0,
    limit: 50,

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
        var relaysController = this.get('relays');
        relaysController.clear();
        var relays = this.get('relays.summaries');
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
        var bridgesController = this.get('bridges');
        bridgesController.clear();
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

        App.set('title', 'Results for ' + query);
        App.set('message', '<span class="subtle">searched for</span> <strong>' + query +'</strong>');

    }.observes('bridges.content.length', 'relays.content.length'),

    query: '',
    sortProperties: ['nickname'],
    sortAscending: false,

    activateSummaries: function(what){
        switch(what){
            case 'relays':
                this.set('active', 'relays')
                break;
            case 'bridges':
                this.set('active', 'bridges');
                break;
        }
    },

    loadNextPage: function(){
        var that = this;
        var query = this.get('query');
        var offset = this.get('offset');
        var limit = this.get('limit');

        App.OnionooSummary.findWithOffsetAndLimit(query, offset, limit).then(function(summaries){
            that.set('offset', offset + limit);

            that.set('relays.summaries', that.get('relays.summaries').concat(summaries.relays));
            that.set('bridges.summaries', that.get('bridges.summaries').concat(summaries.bridges));

        });
    },

    showBridgeDetail: function(fingerprint){
        this.transitionToRoute('bridgeDetail', fingerprint);
    },
    showRelayDetail: function(fingerprint){
        this.transitionToRoute('relayDetail', fingerprint);
    }
});