App.ApplicationController = Ember.Controller.extend({
    needs: ['relaySearch'],
    value: 'Anonymous',
    query: 'Anonymous',
    message: App.static.welcomes[0|(Math.random() * App.static.welcomes.length)],
    title: 'Tor Relay Search',

    advancedSearch: false,
    advancedSearchOptions: {
        type: null,
        running: null,
        country: null,
        as: null,
        flag: null
    },

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
        var advanced = this.get('advancedSearch');
        var advancedOptions = this.get('advancedSearchOptions');

        if(advanced){
            // serialize form
            var serialized = $('.advanced-search-form').serializeArray();

            // reset
            for(var option in advancedOptions){
                if(advancedOptions.hasOwnProperty(option)){
                    delete advancedOptions[option];
                }
            }

            for(var fieldIndex = 0, maxIndex = serialized.length; fieldIndex < maxIndex; fieldIndex++){
                var field = serialized[fieldIndex];
                if(field.value && field.value.length){
                    advancedOptions[field.name] = field.value;
                }
            }

            this.set('advancedSearchOptions', advancedOptions);
        }else{
            advancedOptions = {};
        }

        if(value.length){
            this.set('query', value );
            // wrap everything into 1 url resource parameter
            var payload = $.param({
                query: value,
                filters: advancedOptions
            });
            console.log('application payload', payload);
            this.transitionToRoute('summarySearch', payload);
        }

    },

    queryChanged: function(){
        this.set('value', this.get('query'));
    }.observes('query')
});