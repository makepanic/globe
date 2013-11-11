/*global GLOBE */


GLOBE.Router.map(function() {
    this.route('code', { path: '/code' });
    this.route('help', { path: '/help' });
    this.route('top10', { path: '/top10' });
    this.route('summarySearch', { path: '/search/:query'});
    this.route('relayDetail', { path: '/relay/:fingerprint'});
    this.route('bridgeDetail', { path: '/bridge/:fingerprint'});
});
GLOBE.Router.reopen({
    location: 'hash'
});