GLOBE.ApplicationController = Ember.Controller.extend({
    needs: ['relaySearch'],
    value: '',
    query: '',
    message: GLOBE.static.welcomes[0|(Math.random() * GLOBE.static.welcomes.length)],
    title: 'Tor relay and bridge Search',

    advancedSearch: false,
    advancedSearchOptions: {
        type: {
            enabled: false,
            value: null
        },
        running: {
            enabled: false,
            value: null
        },
        country: {
            enabled: false,
            value: null
        },
        as: {
            enabled: false,
            value: null
        },
        flag:{
            enabled:false,
            value: null
        }
    },

    init: function(){
        this.set('title', '');
    },

    titleChanged: function(){
        var title = this.get('title');
        var suffix = GLOBE.static.titleSuffix + ' ' + GLOBE.static.version;

        if(title.length){
            $(document).attr('title', title + ' | ' + suffix);
        }else{
            $(document).attr('title', suffix);
        }
    }.observes('title'),

    actions: {
        toggleAdvancedSearch: function(){
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

            this.set('query', value );
            // wrap everything into 1 url resource parameter
            var payload = $.param({
                query: value,
                filters: advancedOptions
            });
            this.transitionToRoute('summarySearch', payload);
        }
    },

    queryChanged: function(){
        this.set('value', this.get('query'));
    }.observes('query')
});
