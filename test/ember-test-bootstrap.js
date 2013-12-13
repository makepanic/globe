;(function(window){

    window.prepareForTesting = function(App){

        document.write('<div id="ember-testing-container"><div id="ember-testing"></div></div>');
        document.write('<style>#ember-testing-container { position: absolute; top: 0; right: 0; bottom: 0; left: 0; width: 800px; height: 800px} #ember-testing { display: block }</style>');

        // Test api fixtures
        App.TESTING_FIXTURES = {
            '/details?limit=50&search=globe integration test search expecting to find nothing&fields=fingerprint,nickname,advertised_bandwidth,last_restarted,country,flags,or_addresses,dir_address,running,hashed_fingerprint': {
                'relays_published':'2013-12-11 20:00:00',
                'relays': [],
                'bridges_published':'2013-12-11 19:37:04',
                'bridges':[]
            }
        };

        App.rootElement = '#ember-testing';
        App.setupForTesting();
        App.injectTestHelpers();

        console.log('test bootstrap loaded');
    }

}(window));

