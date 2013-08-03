App.Router.map(function() {
    // put your routes here
    this.resource('index', { path: '/' });
    this.resource('about', { path: '/about' });
    this.resource('summarySearch', { path: '/search/:query'});
    this.resource('relayDetail', { path: '/relay/:fingerprint'});
    this.resource('bridgeDetail', { path: '/bridge/:fingerprint'});
});
App.Router.reopen({
    location: 'hash'
});