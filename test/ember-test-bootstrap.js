;(function(window){

    window.prepareForTesting = function(App){
        Ember.testing = true;

        document.write('<div id="ember-testing-container"><div id="ember-testing"></div></div>');
        document.write('<style>#ember-testing-container { position: absolute; top: 0; right: 0; bottom: 0; left: 0; width: 800px; height: 800px} #ember-testing { display: block }</style>');

        App.rootElement = '#ember-testing';
        App.setupForTesting();
        App.injectTestHelpers();

        console.log('test bootstrap loaded');
    }

})(window)

