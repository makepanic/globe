
// test module
module('formatter tests module', {
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

test('bandwidth formatter test', function(){

    var testFn = App.Formatter.bandwidth;
    var dataEmpty = App.static.messages.dataEmpty;

    equal(testFn(-1),           dataEmpty, 'test for -1');
    equal(testFn(undefined),    dataEmpty, 'test for undefined');
    equal(testFn(null),         dataEmpty, 'test for null');
    equal(testFn(NaN),          dataEmpty, 'test for NaN');
    equal(testFn('string'),     dataEmpty, 'test for "string"');

    equal(testFn(0),        '0 B/s',    'test for 0');
    equal(testFn(1.5),      '1 B/s',    'test for 1.5');
    equal(testFn(1),        '1 B/s',    'test for 1');
    equal(testFn(1000),     '1 KB/s',   'test for 1000');
    equal(testFn(1234),     '1.23 KB/s','test for 1234');
    equal(testFn(1000000),  '1 MB/s',   'test for 1000000');

});

test('boolean formatter test', function(){

    var testFn = App.Formatter.trueFalse;
    var dataEmpty = App.static.messages.dataEmpty;

    var spanInvalid =   '<span class="truefalse">' + dataEmpty + '</span>';
    var spanTrue =      '<span class="truefalse truefalse-true">true</span>';
    var spanFalse =     '<span class="truefalse truefalse-false">false</span>';

    equal(testFn(undefined),    spanInvalid, 'test for undefined');
    equal(testFn(null),         spanInvalid, 'test for null');
    equal(testFn(0),            spanInvalid, 'test for 0');
    equal(testFn(1),            spanInvalid, 'test for 1');
    equal(testFn(-1),           spanInvalid, 'test for -1');
    equal(testFn(NaN),          spanInvalid, 'test for NaN');
    equal(testFn('string'),     spanInvalid, 'test for "string"');

    equal(testFn(true),     spanTrue,   'test for true');
    equal(testFn('true'),   spanTrue,   'test for "true"');
    equal(testFn(false),    spanFalse,  'test for false');
    equal(testFn('false'),  spanFalse,  'test for "false"');

});

test('port extractor formatter test', function(){

    var testFn = App.Formatter.extractPort;
    var dataEmpty = App.static.messages.dataEmpty;

    equal(testFn(undefined),        dataEmpty, 'test for undefined');
    equal(testFn(null),             dataEmpty, 'test for null');
    equal(testFn(0),                dataEmpty, 'test for 0');
    equal(testFn(1),                dataEmpty, 'test for 1');
    equal(testFn(-1),               dataEmpty, 'test for -1');
    equal(testFn(NaN),              dataEmpty, 'test for NaN');
    equal(testFn('string'),         dataEmpty, 'test for "string"');
    equal(testFn('0.0.0.0:'),       dataEmpty, 'test for "0.0.0.0:"');
    equal(testFn('0.0.0.0:80:80'),  dataEmpty, 'test for "0.0.0.0:80:80"');

    equal(testFn('0.0.0.0:80'),     '80',   'test for "0.0.0.0:80"');
    equal(testFn('0.0.0.0:9000'),   '9000', 'test for "0.0.0.0:9000"');

});

