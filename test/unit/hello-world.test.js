
// test module
module('Hello world test module', {
    setup: function() {

        Ember.run(function(){

            App.reset();
            App.advanceReadiness();

        });
    },
    teardown: function() {
        // clean up after each test
        Ember.run(App, App.reset);
    }
});

test('test 1', function(){

    visit('/about').then(function(){

        console.log('is on /about');

        ok(find('.outlet'));

    });

});