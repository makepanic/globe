
App.SummarySearchRoute = Ember.Route.extend({

    // firefox location.hash workaround
    lastPayload: null,

    model: function(params){
        return params.query;
    },
    setupController: function(controller, params){

        var lastSetup = this.get('lastSetup');

        if(App.static.browser.isFirefox()){
            /*
            TODO: workaround for location.hash escaping in Firefox
            @see firefox-bugzilla https://bugzilla.mozilla.org/show_bug.cgi?id=483304
            @see emberjs-issue https://github.com/emberjs/ember.js/issues/3000

            checks if current params equals encodeURI lastPayload
             */

            var lastPayload = this.get('lastPayload');
            if(encodeURI(params) === lastPayload){
                console.warn('[#14 - https://github.com/makepanic/globe/issues/14] bug: firefox location.hash escaping');
                this.set('lastPayload', null);

                return;
            }
            this.set('lastPayload', params);
        }

        params = $.deparam(params);

        var query = params.query;
        var filters = params.filters || {};

        // set controller filters from params
        for(var filter in filters){
            if(filters.hasOwnProperty(filter)){
                controller.set('controllers.application.advancedSearchOptions.' + filter + '.value', filters[filter]);
                controller.set('controllers.application.advancedSearchOptions.' + filter + '.enabled', true);
            }
        }

        // set search query
        controller.set('query', query);

        // update main search bar
        controller.set('controllers.application.query', query);

        // check if query is a 40 char hex and hash if it's true
        if(App.Util.is40CharHex(query)){
            console.log('is 40 char hex string, hashing...');
            query = App.Util.hashFingerprint(query);
        }

        //App.OnionooSummary.find(query).then(function(summaries){
        App.OnionooSummary.findWithFilter(query, filters).then(function(summaries){

            // update offset and limit with find defaults
            controller.set('offset', 50);
            controller.set('limit', 50);

            controller.set('relays.summaries', summaries.relays);
            controller.set('bridges.summaries', summaries.bridges);
        });
    }
});