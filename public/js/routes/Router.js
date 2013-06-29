App.Router.map(function() {
    // put your routes here
    this.resource('index', { path: '/' });
    this.resource('relaySearch', { path: '/rsearch/:query'});
    this.resource('relayDetail', { path: '/rdetail/:fingerprint'});
});
App.Router.reopen({
    location: 'hash'
});