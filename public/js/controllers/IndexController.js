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
    },

    contentChanged: function(){
        var that = this;
        var content = this.get('content');
        var query = this.get('query');
        if(content.length){

            for(var i = 0, max = content.length; i < max; i++){

                (function(i){

                    // wrap in closure to bake i
                    var item = content[i];

                    if(!item['f'].length){
                        throw 'Item has no fingerprint';
                    }else{
                        App.OnionooRelayDetail.find(item['f']).then(function(item){
                            that.replaceContent(i, 1, [item]);

                            var count = that.get('content.length');

                            App.set('title', 'Results for ' + query);
                            App.set('message', '<span class="subtle">searched for</span> <strong>' + query +'</strong> <span class="subtle">found</span> <strong>' + count + '</strong> <span class="subtle">relay' + (count === 1 ? '': 's') + '</span>');
                        });
                    }

                })(i);
            }
        }else{
            App.set('title', 'Found no results for ' + query)
        }
    }.observes('content')
});