/*global GLOBE, Em */
GLOBE.SummarySearchController = Em.ArrayController.extend({
    needs: 'application',
    content: [],
    active: 'relays',
    offset: 0,
    limit: 50,
    showContent: false,
    query: '',

    summaries: {},
    relays: Em.ArrayController.create({
        content: Em.A([]),
        summaries: Em.A([])
    }),
    bridges: Em.ArrayController.create({
        content: Em.A([]),
        summaries: Em.A([])
    }),

    relaysActive: function () {
        return this.get('active') === 'relays';
    }.property('active'),

    bridgesActive: function () {
        return this.get('active') === 'bridges';
    }.property('active'),

    /**
     * function that observes bridges, relays and sets the app title using the query
     */
    resultChanged: function () {
        GLOBE.set('title', 'Results for ' + this.get('query'));
    }.observes('bridges.content.length', 'relays.content.length'),

    actions: {
        activateSummaries: function (what) {
            switch (what) {
            case 'relays':
                this.set('active', 'relays');
                break;
            case 'bridges':
                this.set('active', 'bridges');
                break;
            }
        },

        showBridgeDetail: function (fingerprint) {
            this.transitionToRoute('bridgeDetail', fingerprint);
        },
        showRelayDetail: function (fingerprint) {
            this.transitionToRoute('relayDetail', fingerprint);
        }
    }
});