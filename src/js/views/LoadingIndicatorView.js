App.LoadingIndicatorView = Ember.View.extend({
    layoutName: 'loadingIndicator',
    message: 'loading Data...',

    isDataLoaded: function(){

        // change isDataLoaded depending on App.loading number
        return !(App.get('loading') > 0);

    }.property('App.loading')
});