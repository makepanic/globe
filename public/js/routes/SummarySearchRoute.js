
App.SummarySearchRoute = Ember.Route.extend({
    model: function(params){
        return params.query;
    },
    setupController: function(controller, params){
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