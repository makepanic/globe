/*global $, GLOBE, Ember */
GLOBE.ApplicationController = Ember.Controller.extend({
    needs: ['relaySearch'],
    value: '',
    query: '',
    title: 'Tor relay and bridge Search',

    searchRecommended: function () {
        // set true if a search parameter is active or value is filled
        var recommended = false,
            advancedSearchOptions = this.get('advancedSearchOptions'),
            option;

        // check search query
        recommended = recommended || this.get('value.length') > 0;

        // check all advanced properties
        for (option in advancedSearchOptions) {
            if (advancedSearchOptions.hasOwnProperty(option)) {
                recommended = recommended ||
                    (advancedSearchOptions[option] !== null &&
                        advancedSearchOptions[option].length > 0);
            }
        }
        return recommended;
    }.property('value',
        'advancedSearchOptions.type',
        'advancedSearchOptions.running',
        'advancedSearchOptions.country',
        'advancedSearchOptions.as',
        'advancedSearchOptions.flag'
    ),

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
