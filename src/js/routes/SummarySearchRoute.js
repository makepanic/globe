/*global $, GLOBE, Ember */
GLOBE.SummarySearchRoute = Ember.Route.extend({

    // firefox location.hash workaround
    lastPayload: null,

    model: function(params){
        return params.query;
    },
    deactivate: function(){
        // clear alerts for search
        GLOBE.clearAlert('search');
    },
    setupController: function(controller, params){

        if(GLOBE.static.browser.isFirefox()){
            /*
            TODO: workaround for location.hash escaping in Firefox
            @see firefox-bugzilla https://bugzilla.mozilla.org/show_bug.cgi?id=483304
            @see emberjs-issue https://github.com/emberjs/ember.js/issues/3000

            checks if current params equals encodeURI lastPayload
             */

            var lastPayload = this.get('lastPayload');
            if(encodeURI(params) === lastPayload){
//                console.warn('[#14 - https://github.com/makepanic/globe/issues/14] bug: firefox location.hash escaping');
                this.set('lastPayload', null);

                return;
            }
            this.set('lastPayload', params);
        }

        params = $.deparam(params);

        var query = params.query;
        var filters = params.filters || {};

        // required fields for data in bridges and relays
        var fields = ['fingerprint', 'nickname', 'advertised_bandwidth', 'last_restarted', 'country', 'flags', 'or_addresses', 'dir_address', 'running', 'hashed_fingerprint'];

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
            // success
            if(summaries.relays.length >= GLOBE.static.numbers.maxSearchResults ||
                summaries.bridges.length >= GLOBE.static.numbers.maxSearchResults){
                GLOBE.setAlert('search', 'info', GLOBE.static.messages.specifyYourSearch);
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