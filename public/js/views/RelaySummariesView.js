App.BaseSummariesView = Ember.View.extend({
   tagName: 'table'
});

App.RelaySummariesView = App.BaseSummariesView.extend({
    templateName: 'relaySummaries',
    classNames: ['relay-summary-list']
});

App.BridgeSummariesView = App.BaseSummariesView.extend({
    templateName: 'bridgeSummaries',
    classNames: ['relay-summary-list']
});