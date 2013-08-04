
// test module
module('formatter tests module', {
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
});

test('bandwidth formatter test', function(){

    var testFn = App.Formatter.bandwidth;
    var dataEmpty = App.static.messages.dataEmpty;

    equal(testFn(-1),           dataEmpty);
    equal(testFn(undefined),    dataEmpty);
    equal(testFn(null),         dataEmpty);
    equal(testFn(NaN),          dataEmpty);
    equal(testFn('string'),     dataEmpty);

    equal(testFn(0),        '0 B/s');
    equal(testFn(1.5),      '1 B/s');
    equal(testFn(1),        '1 B/s');
    equal(testFn(1000),     '1 KB/s');
    equal(testFn(1234),     '1.23 KB/s');
    equal(testFn(1000000),  '1 MB/s');

});

test('boolean formatter test', function(){

    var testFn = App.Formatter.trueFalse;
    var dataEmpty = App.static.messages.dataEmpty;

    var spanInvalid =   '<span class="truefalse">' + dataEmpty + '</span>';
    var spanTrue =      '<span class="truefalse truefalse-true">true</span>';
    var spanFalse =     '<span class="truefalse truefalse-false">false</span>';

    equal(testFn(undefined),    spanInvalid);
    equal(testFn(null),         spanInvalid);
    equal(testFn(0),            spanInvalid);
    equal(testFn(1),            spanInvalid);
    equal(testFn(-1),           spanInvalid);
    equal(testFn(NaN),          spanInvalid);
    equal(testFn('string'),     spanInvalid);

    equal(testFn(true),     spanTrue);
    equal(testFn('true'),   spanTrue);
    equal(testFn(false),    spanFalse);
    equal(testFn('false'),  spanFalse);

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

