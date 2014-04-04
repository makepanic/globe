
// test module
module('util tests module');

test('looksLikeIpV function test', function(){

    var testFn = GLOBE.Util.looksLikeIpV;

    equal(testFn('1:2:3:4:5:6:7:8'), '6', 'test for 6');
    equal(testFn('::ffff:10.0.0.1'), '6', 'test for 6');
    equal(testFn('::ffff:1.2.3.4'), '6', 'test for 6');
    equal(testFn('1:2:3:4:5:6:77:88'), '6', 'test for 6');
    equal(testFn('ffff:ffff:ffff:ffff:ffff:ffff:ffff:ffff'), '6', 'test for 6');

    equal(testFn('127.0.0.1'), '4', 'test for 4');
    equal(testFn('192.168.1.1'), '4', 'test for 4');
    equal(testFn('255.255.255.255'), '4', 'test for 4');
    equal(testFn('0.0.0.0'), '4', 'test for 4');
});

