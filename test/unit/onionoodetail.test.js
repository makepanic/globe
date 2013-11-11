
// test module
module('OnionooDetail tests module', {
    // we do need any setup for formatter tests
    /*
     setup: function() {

     GLOBE.reset();
     Ember.run(function(){

     GLOBE.advanceReadiness();

     });
     },
     teardown: function() {
     // clean up after each test
     GLOBE.reset();
     }
     */
});


test('detail defaults test', function(){

    var testFn = GLOBE.OnionooDetail.applyDetailDefaults;

    /*
    list all property names

     var uls = document.querySelectorAll('body > ul')[2]; var titles = uls.querySelectorAll('li > ul b');for(var i=0,max=titles.length;i<max;i++){console.log(titles[i].innerHTML.slice(0,-1) + ',')}

    */

    var shouldContain = {
        relay: [
            'nickname',
            'fingerprint',
            'or_addresses',
            'exit_addresses',
            'dir_address',
            'last_seen',
            'last_changed_address_or_port',
            'first_seen',
            'running',
            'flags',
            'country',
            'country_name',
            'region_name',
            'city_name',
            'latitude',
            'longitude',
            'as_number',
            'as_name',
            'consensus_weight',
            'host_name',
            'last_restarted',
            'bandwidth_rate',
            'bandwidth_burst',
            'observed_bandwidth',
            'advertised_bandwidth',
            'exit_policy',
            'exit_policy_summary',
            'contact',
            'platform',
            'family',
            'advertised_bandwidth_fraction',
            'consensus_weight_fraction',
            'guard_probability',
            'middle_probability',
            'exit_probability'
        ],
        bridge: [
            'nickname',
            'hashed_fingerprint',
            'or_addresses',
            'last_seen',
            'first_seen',
            'running',
            'flags',
            'last_restarted',
            'advertised_bandwidth',
            'platform',
            'pool_assignment'
        ]
    };


    var objectContains = function(object, shouldContain){
        var containsAll = true;
        for(var i = 0, max = shouldContain.length; i < max && containsAll; i++){
            containsAll &= object.hasOwnProperty(shouldContain[i]);
        }
        return containsAll;
    };

    var emptyMinimum = {
        relays: [],
        bridges: []
    };

    var relayData = {
            relays: [{ fingerprint: '0000000000000000000000000000000000000000'}],
            bridges: []
        },
        bridgesData = {
            relays: [],
            bridges: [{ hashed_fingerprint: '0000000000000000000000000000000000000000'}]
        };

    // minimum tests
    deepEqual(testFn({}, {
        relay: GLOBE.defaults.OnionooRelayDetail,
        bridge: GLOBE.defaults.OnionooBridgeDetail
    }), emptyMinimum, 'test function without empty object and given defaults should should return minimum object');
    deepEqual(testFn({}), emptyMinimum, 'test function without given defaults should should return minimum object');
    deepEqual(testFn(NaN), emptyMinimum, 'test function with data NaN and without given defaults should should return minimum object');
    deepEqual(testFn(null), emptyMinimum, 'test function with data null and  without given defaults should should return minimum object');
    deepEqual(testFn(1), emptyMinimum, 'test function with data 1 and  without given defaults should should return minimum object');
    deepEqual(testFn(-1), emptyMinimum, 'test function with data -1 and  without given defaults should should return minimum object');
    deepEqual(testFn(0), emptyMinimum, 'test function with data 0 and  without given defaults should should return minimum object');
    deepEqual(testFn('string'), emptyMinimum, 'test function with data 0 and  without given defaults should should return minimum object');

    ok(objectContains(testFn(relayData, {
        relay: GLOBE.defaults.OnionooRelayDetail,
        bridge: GLOBE.defaults.OnionooBridgeDetail
    }).relays[0], shouldContain.relay), 'test function with given relayData should contain relay with default params');

    ok(objectContains(testFn(bridgesData, {
        relay: GLOBE.defaults.OnionooRelayDetail,
        bridge: GLOBE.defaults.OnionooBridgeDetail
    }).bridges[0], shouldContain.bridge), 'test function with given bridgeData should contain bridge with default params');
});