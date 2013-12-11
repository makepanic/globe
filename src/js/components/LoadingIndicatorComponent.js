/*global GLOBE, Em */
GLOBE.LoadingIndicatorComponent = Em.Component.extend({
    isDataLoaded: function(){

        // change isDataLoaded depending on GLOBE.loading number
        return (GLOBE.get('loading') <= 0);

    }.property('GLOBE.loading')
});