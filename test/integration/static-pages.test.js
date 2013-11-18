module("Static pages tests", {
    setup: function() {
        GLOBE.reset();
    }
});

test('check / route', function () {
    visit('/').then(function () {
        equal(find('h2')[0].innerHTML, 'Globe - A Tor relay and bridge explorer', 'has correct headline');
    })
});

test('check /code route', function () {
    visit('/code').then(function () {
        var headline = find('h2')[0];

        equal(headline.innerHTML, 'Code - Building Globe', 'has correct headline');
        ok(!!~document.title.indexOf('Code'), 'has correct substring in title');
    })
});

test('check /help route', function () {
    visit('/help').then(function () {
        var headline = find('h2')[0];

        equal(headline.innerHTML, 'Help (WIP)', 'has correct headline');
        ok(!!~document.title.indexOf('Help'), 'has correct substring in title');
    })
});