
// test module
module('OnionooDetail tests module', {
    // we do need any setup for formatter tests
    /*
     setup: function() {

     App.reset();
     Ember.run(function(){

     App.advanceReadiness();

     });
     },
     teardown: function() {
     // clean up after each test
     App.reset();
     }
     */
});

test('detail defaults test', function(){

    var testFn = App.OnionooDetail.applyDetailDefaults;

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
    }

    throws(testFn({relays: [1, 2]}), 'if more than 1 detail object exists, throw an error');

    ok(objectContains(testFn({}).relay, shouldContain.relay), 'relay should contain all the properties');
    ok(objectContains(testFn({}).bridge, shouldContain.bridge), 'bridge should contain all the properties');

    ok(objectContains(testFn(NaN).bridge, shouldContain.bridge), 'bridge should contain all the properties');
    ok(objectContains(testFn(null).bridge, shouldContain.bridge), 'bridge should contain all the properties');
    ok(objectContains(testFn(undefined).bridge, shouldContain.bridge), 'bridge should contain all the properties');
    ok(objectContains(testFn(1).bridge, shouldContain.bridge), 'bridge should contain all the properties');
    ok(objectContains(testFn(-1).bridge, shouldContain.bridge), 'bridge should contain all the properties');
    ok(objectContains(testFn(0).bridge, shouldContain.bridge), 'bridge should contain all the properties');

});