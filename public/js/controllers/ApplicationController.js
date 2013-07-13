App.ApplicationController = Ember.Controller.extend({
    needs: ['relaySearch'],
    value: 'Anonymous',
    query: 'Anonymous',
    message: App.static.welcomes[0|(Math.random() * App.static.welcomes.length)],
    title: 'Tor Relay Search',

    advancedSearch: false,

    init: function(){
        this.set('title', '');
    },

    titleChanged: function(){

        var title = this.get('title');
        var suffix = App.static.titleSuffix + ' ' + App.static.version;

        if(title.length){
            $(document).attr('title', title + ' | ' + suffix);
        }else{
            $(document).attr('title', suffix);
        }

    }.observes('title'),

    toggleAdvancedSearch: function(){
        console.log('toggleAdvanced');
        this.toggleProperty('advancedSearch');
    },

    search: function(){

        var value = this.get('value');
        if(value.length){
            this.set('query', value );
            this.transitionToRoute('summarySearch', value);
        }

    },

    queryChanged: function(){
        this.set('value', this.get('query'));
    }.observes('query')
});