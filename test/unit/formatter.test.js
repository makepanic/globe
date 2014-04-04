
// test module
module('formatter tests module');

test('bandwidth formatter test', function(){

    var testFn = GLOBE.Formatter.bandwidth;
    var dataEmpty = GLOBE.static.messages.dataEmpty;

    equal(testFn(-1),           dataEmpty, 'test for -1');
    equal(testFn(undefined),    dataEmpty, 'test for undefined');
    equal(testFn(null),         dataEmpty, 'test for null');
    equal(testFn(NaN),          dataEmpty, 'test for NaN');
    equal(testFn('string'),     dataEmpty, 'test for "string"');

    equal(testFn(0),        '0 B/s',    'test for 0');
    equal(testFn(1.5),      '1 B/s',    'test for 1.5');
    equal(testFn(1),        '1 B/s',    'test for 1');
    equal(testFn(1000),     '1 kB/s',   'test for 1000');
    equal(testFn(1234),     '1.23 kB/s','test for 1234');
    equal(testFn(1000000),  '1 MB/s',   'test for 1000000');

});

test('boolean formatter test', function(){

    var testFn = GLOBE.Formatter.boolean;
    var dataEmpty = GLOBE.static.messages.dataEmpty;

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

    var testFn = GLOBE.Formatter.extractPort;
    var dataEmpty = GLOBE.static.messages.dataEmpty;

    equal(testFn(undefined),        dataEmpty, 'test for undefined');
    equal(testFn(null),             dataEmpty, 'test for null');
    equal(testFn(0),                dataEmpty, 'test for 0');
    equal(testFn(1),                dataEmpty, 'test for 1');
    equal(testFn(-1),               dataEmpty, 'test for -1');
    equal(testFn(NaN),              dataEmpty, 'test for NaN');
    equal(testFn('string'),         dataEmpty, 'test for "string"');
    equal(testFn('0.0.0.0:'),       dataEmpty, 'test for "0.0.0.0:"');

    equal(testFn('0.0.0.0:80:80'),  '80', 'test for "0.0.0.0:80:80"');
    equal(testFn('0.0.0.0:80'),     '80',   'test for "0.0.0.0:80"');
    equal(testFn('0.0.0.0:9000'),   '9000', 'test for "0.0.0.0:9000"');

});

test('country flag formatter test', function(){

    var testFn = GLOBE.Formatter.countryFlag;
    var dataEmpty = '<span title="' + GLOBE.static.messages.dataEmpty + '" data-tooltip class="has-tip country-flag empty_png"></span>';

    equal(testFn(undefined),        dataEmpty, 'test for undefined');
    equal(testFn(null),             dataEmpty, 'test for null');
    equal(testFn(0),                dataEmpty, 'test for 0');
    equal(testFn(1),                dataEmpty, 'test for 1');
    equal(testFn(-1),               dataEmpty, 'test for -1');
    equal(testFn(NaN),              dataEmpty, 'test for NaN');
    equal(testFn('string'),         dataEmpty, 'test for "string"');

    equal(testFn('de'), '<span title="Germany" data-tooltip class="has-tip country-flag de_png"></span>',   'test for "de"');
    equal(testFn('kp'), '<span title="North Korea" data-tooltip class="has-tip country-flag kp_png"></span>',   'test for "de"');

});


test('onionoo flag formatter test', function(){

    var testFn = GLOBE.Formatter.propFlag;
    var dataEmpty = '';

    equal(testFn(undefined),        dataEmpty, 'test for undefined');
    equal(testFn(null),             dataEmpty, 'test for null');
    equal(testFn(0),                dataEmpty, 'test for 0');
    equal(testFn(1),                dataEmpty, 'test for 1');
    equal(testFn(-1),               dataEmpty, 'test for -1');
    equal(testFn(NaN),              dataEmpty, 'test for NaN');
    equal(testFn('string'),         dataEmpty, 'test for "string"');

    equal(testFn('Fast'),       '<span class="fa fa-bolt has-tip" data-tooltip title="Fast"></span>',         'test for "Fast"');
    equal(testFn('Running'),    '<span class="fa fa-code-fork has-tip" data-tooltip title="Running"></span>',    'test for "Running"');
    equal(testFn('BadExit'),    '<span class="fa fa-warning has-tip" data-tooltip title="BadExit"></span>',    'test for "BadExit"');
    equal(testFn('Authority'),  '<span class="fa fa-user-md has-tip" data-tooltip title="Authority"></span>',    'test for "Authority"');
    equal(testFn('Guard'),      '<span class="fa fa-shield has-tip" data-tooltip title="Guard"></span>',       'test for "Guard"');
    equal(testFn('HSDir'),      '<span class="fa fa-book has-tip" data-tooltip title="HSDir"></span>',      'test for "HSDir"');
    equal(testFn('Named'),      '<span class="fa fa-info has-tip" data-tooltip title="Named"></span>',        'test for "Named"');
    equal(testFn('Stable'),     '<span class="fa fa-anchor has-tip" data-tooltip title="Stable"></span>',     'test for "Stable"');
    equal(testFn('V2Dir'),      '<span class="fa fa-folder has-tip" data-tooltip title="V2Dir"></span>',      'test for "V2Dir"');
    equal(testFn('Valid'),      '<span class="fa fa-check has-tip" data-tooltip title="Valid"></span>',       'test for "Valid"');
    equal(testFn('Unnamed'),    '<span class="fa fa-question has-tip" data-tooltip title="Unnamed"></span>',     'test for "Unnamed"');
    equal(testFn('Exit'),       '<span class="fa fa-sign-out has-tip" data-tooltip title="Exit"></span>',        'test for "Exit"');

});

test('family to fingerprint formatter test', function(){

    var testFn = GLOBE.Formatter.familyToFingerprint;
    var dataEmpty = '';

    equal(testFn(undefined),        dataEmpty, 'test for undefined');
    equal(testFn(null),             dataEmpty, 'test for null');
    equal(testFn(0),                dataEmpty, 'test for 0');
    equal(testFn(1),                dataEmpty, 'test for 1');
    equal(testFn(-1),               dataEmpty, 'test for -1');
    equal(testFn(NaN),              dataEmpty, 'test for NaN');
    equal(testFn('string'),         dataEmpty, 'test for "string"');

    equal(testFn('$1234'), '1234', 'test for "$1234"');
});

test('anonymizeIpAddress formatter test', function(){

    var testFn = GLOBE.Formatter.anonymizeIpAddress;

    equal(testFn('128.0.0.1:9000'), 'IPv4:9000', 'test for ipv4');
    equal(testFn('128.0.0.1:80'), 'IPv4:80', 'test for ipv4');
    equal(testFn('::ffff:10.0.0.1:9000'), 'IPv6:9000', 'test for ipv6');
    equal(testFn('1:2:3:4:5:6:7:8:80'), 'IPv6:80', 'test for ipv6');
    equal(testFn('[2001:bc8:3431:101::2]:22'), 'IPv6:22', 'test for ipv6');
});


test('family to percent formatter test', function(){

    var testFn = GLOBE.Formatter.percent;
    var dataEmpty = GLOBE.static.messages.dataEmpty;

    equal(testFn(undefined),        dataEmpty, 'test for undefined');
    equal(testFn(null),             dataEmpty, 'test for null');
    equal(testFn(NaN),              dataEmpty, 'test for NaN');
    equal(testFn('string'),         dataEmpty, 'test for "string"');

    equal(testFn(0), '0.00%', 'test for "0"');
    equal(testFn(0.5), '50.00%', 'test for "0.5"');

});



