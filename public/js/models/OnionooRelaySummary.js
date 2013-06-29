App.OnionooRelaySummary = Ember.Object.extend({});
App.OnionooRelaySummary.reopenClass({
    find: function(query){
        return $.getJSON('https://onionoo.torproject.org/summary?search=' + query, {}).then(function(result){
            // right now i only care about relays

            var summaries = [];

            if(result && result.relays && result.relays.length){

                for(var i = 0, max = result.relays.length; i < max; i++){
                    // create default summary object and overwrite with given results
                    var relay = $.extend({}, defaultOnionooSummary, result.relays[i]);

                    var summary = App.OnionooRelaySummary.create(relay);
                    summaries.push(summary);
                }

            }

            return summaries;
        });
    }
});