/*global $, GLOBE, Em */
GLOBE.SummarySearchRoute = Em.Route.extend({

    deactivate: function(){
        // clear alerts for search
        GLOBE.clearAlert('search');
    },
    model: function(params){
        return params.query;
    },
    setupController: function(controller, params){
        // deparam querystring
        var deparamd = $.deparam(params),
            query = deparamd.query,
            filters = deparamd.filters || {},

            // required fields for data in bridges and relays
            fields = ['fingerprint', 'nickname', 'advertised_bandwidth', 'last_restarted', 'country', 'flags', 'or_addresses', 'dir_address', 'running', 'hashed_fingerprint'];

        // set controller filters from params
        for(var filter in filters){
            if(filters.hasOwnProperty(filter)){
                controller.set('controllers.application.advancedSearchOptions.' + filter, filters[filter]);
            }
        }

        // set search query
        controller.set('query', query);

        // update main search bar
        controller.set('controllers.application.query', query);

        // check if query is a 40 char hex and hash if it's true
        if(GLOBE.Util.is40CharHex(query)){
            query = GLOBE.Util.hashFingerprint(query);
        }

        // clear alerts for search
        GLOBE.clearAlert('search');

        GLOBE.OnionooDetail.findWithFilter({
            query: query,
            filter: filters,
            fields: fields
        }).then(function(summaries){
            // show message if there are too much results
            if(summaries.relays.length + summaries.bridges.length >= GLOBE.static.numbers.maxSearchResults){
                GLOBE.setAlert('search', 'info', GLOBE.static.messages.specifyYourSearch);
            }

            // activate bridges tab if no relays but bridges found
            if (summaries.relays.length === 0 && summaries.bridges.length > 0) {
                controller.set('active', 'bridges');
            }

            controller.set('relays.content', summaries.relays);
            controller.set('bridges.content', summaries.bridges);

        }, function () {
            // failure
            controller.set('relays.content', []);
            controller.set('bridges.content', []);
            GLOBE.setAlert('search', 'warn', GLOBE.static.messages.invalidSearchTerm);
        });
    }
});