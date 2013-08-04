
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

    var testFn = App.Formatter.boolean;
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

test('country flag formatter test', function(){

    var testFn = App.Formatter.countryFlag;
    var dataEmpty = '<span title="' + App.static.messages.dataEmpty + '" data-tooltip class="hast-tip country-flag empty_png"></span>';

    equal(testFn(undefined),        dataEmpty, 'test for undefined');
    equal(testFn(null),             dataEmpty, 'test for null');
    equal(testFn(0),                dataEmpty, 'test for 0');
    equal(testFn(1),                dataEmpty, 'test for 1');
    equal(testFn(-1),               dataEmpty, 'test for -1');
    equal(testFn(NaN),              dataEmpty, 'test for NaN');
    equal(testFn('string'),         dataEmpty, 'test for "string"');

    equal(testFn('de'), '<span title="Germany" data-tooltip class="hast-tip country-flag de_png"></span>',   'test for "de"');
    equal(testFn('kp'), '<span title="North Korea" data-tooltip class="hast-tip country-flag kp_png"></span>',   'test for "de"');

});


test('onionoo flag formatter test', function(){

    var testFn = App.Formatter.propFlag;
    var dataEmpty = '';

    equal(testFn(undefined),        dataEmpty, 'test for undefined');
    equal(testFn(null),             dataEmpty, 'test for null');
    equal(testFn(0),                dataEmpty, 'test for 0');
    equal(testFn(1),                dataEmpty, 'test for 1');
    equal(testFn(-1),               dataEmpty, 'test for -1');
    equal(testFn(NaN),              dataEmpty, 'test for NaN');
    equal(testFn('string'),         dataEmpty, 'test for "string"');

    equal(testFn('Fast'),       '<i class="entypo hast-tip" data-tooltip title="Fast">&#9889;</i>',         'test for "Fast"');
    equal(testFn('Running'),    '<i class="entypo hast-tip" data-tooltip title="Running">&#128361;</i>',    'test for "Running"');
    equal(testFn('BadExit'),    '<i class="entypo hast-tip" data-tooltip title="BadExit">&#128683;</i>',    'test for "BadExit"');
    equal(testFn('Authority'),  '<i class="entypo hast-tip" data-tooltip title="Authority">&#9733;</i>',    'test for "Authority"');
    equal(testFn('Guard'),      '<i class="entypo hast-tip" data-tooltip title="Guard">&#59198;</i>',       'test for "Guard"');
    equal(testFn('HSDir'),      '<i class="entypo hast-tip" data-tooltip title="HSDir">&#128213;</i>',      'test for "HSDir"');
    equal(testFn('Named'),      '<i class="entypo hast-tip" data-tooltip title="Named">&#8505;</i>',        'test for "Named"');
    equal(testFn('Stable'),     '<i class="entypo hast-tip" data-tooltip title="Stable">&#128191;</i>',     'test for "Stable"');
    equal(testFn('V2Dir'),      '<i class="entypo hast-tip" data-tooltip title="V2Dir">&#128193;</i>',      'test for "V2Dir"');
    equal(testFn('Valid'),      '<i class="entypo hast-tip" data-tooltip title="Valid">&#10003;</i>',       'test for "Valid"');
    equal(testFn('Unnamed'),    '<i class="entypo hast-tip" data-tooltip title="Unnamed">&#10067;</i>',     'test for "Unnamed"');
    equal(testFn('Exit'),       '<i class="entypo hast-tip" data-tooltip title="Exit">&#59201;</i>',        'test for "Exit"');

});



