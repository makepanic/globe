
App.SummarySearchRoute = Ember.Route.extend({
    model: function(params){
        var decoded = $.deparam(params.query);
        return decoded;
    },
    setupController: function(controller, params){
        console.log('SummarySearchRoute setupController', params);
        var query = params.query;
        var filters = params.filters || {};

        // set controller filters from params
        for(var filter in filters){
            if(filters.hasOwnProperty(filter)){
                controller.set('controllers.application.advancedSearchOptions.' + filter, filters[filter]);
            }
        }
        controller.set('query', query);

        // update main search bar
        controller.set('controllers.application.query', query);

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