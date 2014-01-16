module("ticket 10633 tests", {
    setup: function() {
        GLOBE.reset();
    }
});

test('check / route', function () {
    visit('/search/query=ec2').then(function () {
        var alertBox = $('.alert.info');
        equal(alertBox.length, 1, 'alertbox is visible');
        equal(alertBox.text(), GLOBE.static.messages.specifyYourSearch, 'specify your search text is used');
    })
});