/*global GLOBE, Ember */
GLOBE.LoadingIndicatorComponent = Ember.Component.extend({
    isDataLoaded: function(){

        // change isDataLoaded depending on GLOBE.loading number
        return (GLOBE.get('loading') <= 0);

    }.property('GLOBE.loading')
});