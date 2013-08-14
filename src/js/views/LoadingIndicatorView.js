GLOBE.LoadingIndicatorView = Ember.View.extend({
    layoutName: 'loadingIndicator',
    message: 'loading Data...',

    isDataLoaded: function(){

        // change isDataLoaded depending on GLOBE.loading number
        return !(GLOBE.get('loading') > 0);

    }.property('GLOBE.loading')
});