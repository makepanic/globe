module("Searchbar Tests", {
    setup: function() {
        GLOBE.reset();
    }
});

test('the advanced search should not be visible', function () {
    visit('/').then(function () {
        var advancedSearch = find('.advanced-search-form');

        equal(advancedSearch.length, 1, 'has advanced search form');
        equal(advancedSearch[0].classList.contains('search-filters-enabled'), false, 'advanced search form is not visible');
    })
});

test('the advanced search should appear on button click', function () {
    var advancedSearchButton = find('.toggle-advanced-search'),
        advancedSearch = find('.advanced-search-form');

    equal(advancedSearchButton.length, 1, 'has advanced search button exists');

    click('.toggle-advanced-search');

    equal(advancedSearch[0].classList.contains('search-filters-enabled'), true, 'advanced search form is visible');
});

test('the advanced search should disappear on repeated button click', function () {
    var advancedSearch = find('.advanced-search-form');

    click('.toggle-advanced-search');
    click('.toggle-advanced-search');

    equal(advancedSearch[0].classList.contains('search-filters-enabled'), false, 'advanced search form is not visible');
});

