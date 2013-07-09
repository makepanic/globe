
App.SummarySearchRoute = Ember.Route.extend({
    model: function(params){
        return params.query;
    },
    setupController: function(controller, query){
        controller.set('query', query);

        // update main search bar
        controller.set('controllers.application.query', query);

        if(App.Util.is40CharHex(query)){
            console.log('is 40 char hex string, hashing...');
            query = App.Util.hashFingerprint(query);
        }

        App.OnionooSummary.find(query).then(function(summaries){
            controller.set('relays.summaries', summaries.relays);
            controller.set('bridges.summaries', summaries.bridges);

            /*

            var oldActive = controller.get('active');
            oldActive = oldActive ? oldActive : 'relays';

            // get old content and check if undefined
            var oldContent = controller.get(oldActive + '.content');
            if(oldContent === undefined){
                // set default content
                oldContent = controller.get('active.content');
            }

            // set initial content
            controller.set('active', oldActive);
            controller.set('content', oldContent);

             */
        });
    }
});