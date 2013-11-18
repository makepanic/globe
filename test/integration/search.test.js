module("Search tests", {
    setup: function() {
        GLOBE.reset();
    }
});

test('the advanced search should not be visible', function () {
    var searchQuery = "globe-integration-test-search-expecting-to-find-nothing_" + Date.now();

    visit('/').then(function () {
        return fillIn("#main-search", searchQuery);
    }).then(function () {
        var searchOption = find('.search-control');

        ok(searchOption.length > 1, 'has search controls');
        ok(searchOption[0].classList.contains('hover'), 'search control has hover class');

        return click(".search-control .fa-search");
    }).then(function () {
        var resultTabs = $('.tabbed-items');

        resultTabs.each(function (index, el) {
            equals(el.childNodes[0].innerText, '0', 'no results found');
        });

    })
});
