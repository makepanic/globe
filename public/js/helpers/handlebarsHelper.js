/**
 * @see {@link App.Formatter.boolean()}
 */
Ember.Handlebars.helper('truefalse', function(value, options){
    var wrapped = App.Formatter.boolean(value);
    return new Handlebars.SafeString(wrapped);
});

/**
 * @see {@link App.Formatter.bandwidth()}
 */
Ember.Handlebars.helper('bandwidth', function(value, options){
    var formatted = App.Formatter.bandwidth(value);
    return new Handlebars.SafeString(formatted);
});

Ember.Handlebars.registerBoundHelper('fullCountry', function(value, options){
    value = Handlebars.Utils.escapeExpression(value);

    var fullCountry = '';
    if(App.static.countries.hasOwnProperty(value)){
        fullCountry = App.static.countries[value];
    }

    return new Handlebars.SafeString(fullCountry);
});

/**
 * @see {@link App.Formatter.countryFlag()}
 */
Ember.Handlebars.registerBoundHelper('prettyCountryFlag', function(value, options){
    value = Handlebars.Utils.escapeExpression(value);

    var countryLabel = App.Formatter.countryFlag(value);
    return new Handlebars.SafeString(countryLabel);
});

/**
 * @see {@link App.Formatter.countryFlag()}
 */
Ember.Handlebars.registerBoundHelper('flaggifyShort', function(value, options){
    value = Handlebars.Utils.escapeExpression(value);
    var withImage = App.Formatter.countryFlag(value);
    return new Handlebars.SafeString(withImage);
});

Ember.Handlebars.registerBoundHelper('flaggifyLong', function(value, options){
    var map = App.static.icons;
    value = Handlebars.Utils.escapeExpression(value);
    var withImage = value;
    if(map.hasOwnProperty(value)){
        withImage = '<i class="entypo">' + map[value] + '</i>' + withImage;
    }
    return new Handlebars.SafeString(withImage);
});

Ember.Handlebars.helper('uptimeFull', function(value, options){
    if(!value){
        return '';
    }
    value = Handlebars.Utils.escapeExpression(value);
    var uptimeArray = App.Util.UptimeCalculator(value, 'long');
    return new Handlebars.SafeString(uptimeArray.join(' '));
});

Ember.Handlebars.helper('uptimeShort', function(value, options){
    if(!value){
        return '';
    }
    value = Handlebars.Utils.escapeExpression(value);
    var uptimeArray = App.Util.UptimeCalculator(value, 'short');
    return new Handlebars.SafeString(uptimeArray.join(' '));
});

/**
 * @see {@link App.Formatter.extractPort()}
 */
Ember.Handlebars.helper('extractPort', function(value, options){
    value = Handlebars.Utils.escapeExpression(value);

    var port = App.Formatter.extractPort(value);

    return new Handlebars.SafeString(port);
});