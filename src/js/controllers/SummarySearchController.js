/*global GLOBE, Em */
GLOBE.SummarySearchController = Em.ArrayController.extend({
    needs: 'application',
    active: 'relays',
    offset: 0,
    limit: 50,
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

    relaysActive: Em.computed.equal('active', 'relays'),
    bridgesActive: Em.computed.equal('active', 'bridges'),

    /**
     * function that observes bridges, relays and sets the app title using the query
     */
    resultChanged: function () {
        GLOBE.set('title', 'Results for ' + this.get('query'));
    }.observes('bridges.content.length', 'relays.content.length'),

    actions: {
        activateSummaries: function (what) {
            this.set('active', what);
        },
        showBridgeDetail: function (fingerprint) {
            this.transitionToRoute('bridgeDetail', fingerprint);
        },
        showRelayDetail: function (fingerprint) {
            this.transitionToRoute('relayDetail', fingerprint);
        }
    }
});