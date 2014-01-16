module("Searchbar Tests", {
    setup: function() {
        GLOBE.reset();
    }
});

test('the advanced search should not be visible', function () {
    visit('/');
    andThen(function () {
        var advancedSearch = find('.advanced-search-form');

        equal(advancedSearch.length, 1, 'has advanced search form');
        equal(advancedSearch[0].classList.contains('search-filters-enabled'), false, 'advanced search form is not visible');
    })
});

test('the advanced search should appear and disappear on button click', function () {
    var advancedSearchButton,
        advancedSearch;

    visit('/');
    andThen(function(){
        advancedSearchButton = find('.toggle-advanced-search');
        advancedSearch = find('.advanced-search-form');
        equal(advancedSearchButton.length, 1, 'advanced search button exists');
    });
    click('.toggle-advanced-search');
    andThen(function () {
        equal(advancedSearch[0].classList.contains('search-filters-enabled'), true, 'advanced search form is visible');
    });
    click('.toggle-advanced-search');
    andThen(function () {
        equal(advancedSearch[0].classList.contains('search-filters-enabled'), false, 'advanced search form is not visible');
    });
});