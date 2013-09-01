GLOBE.Router.map(function() {
    this.resource('index', { path: '/' });
    this.resource('about', { path: '/about' });
    this.resource('summarySearch', { path: '/search/:query'});
    this.resource('relayDetail', { path: '/relay/:fingerprint'});
    this.resource('bridgeDetail', { path: '/bridge/:fingerprint'});
});
GLOBE.Router.reopen({
    location: 'hash'
});