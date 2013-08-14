/**
 * @see {@link GLOBE.Formatter.boolean()}
 */
Ember.Handlebars.helper('truefalse', function(value, options){
    var wrapped = GLOBE.Formatter.boolean(value);
    return new Handlebars.SafeString(wrapped);
});

/**
 * @see {@link GLOBE.Formatter.bandwidth()}
 */
Ember.Handlebars.helper('bandwidth', function(value, options){
    var formatted = GLOBE.Formatter.bandwidth(value);
    return new Handlebars.SafeString(formatted);
});

Ember.Handlebars.registerBoundHelper('fullCountry', function(value, options){
    value = Handlebars.Utils.escapeExpression(value);

    var fullCountry = '';
    if(GLOBE.static.countries.hasOwnProperty(value)){
        fullCountry = GLOBE.static.countries[value];
    }

    return new Handlebars.SafeString(fullCountry);
});

/**
 * @see {@link GLOBE.Formatter.countryFlag()}
 */
Ember.Handlebars.registerBoundHelper('prettyCountryFlag', function(value, options){
    value = Handlebars.Utils.escapeExpression(value);

    var countryLabel = GLOBE.Formatter.countryFlag(value);
    return new Handlebars.SafeString(countryLabel);
});

/**
 * @see {@link GLOBE.Formatter.countryFlag()}
 */
Ember.Handlebars.registerBoundHelper('flaggifyShort', function(value, options){
    value = Handlebars.Utils.escapeExpression(value);
    var withImage = GLOBE.Formatter.countryFlag(value);
    return new Handlebars.SafeString(withImage);
});

Ember.Handlebars.registerBoundHelper('flaggifyLong', function(value, options){
    var map = GLOBE.static.icons;
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
    var uptimeArray = GLOBE.Util.UptimeCalculator(value, 'long');
    return new Handlebars.SafeString(uptimeArray.join(' '));
});

Ember.Handlebars.helper('uptimeShort', function(value, options){
    if(!value){
        return '';
    }
    value = Handlebars.Utils.escapeExpression(value);
    var uptimeArray = GLOBE.Util.UptimeCalculator(value, 'short');
    return new Handlebars.SafeString(uptimeArray.join(' '));
});

/**
 * @see {@link GLOBE.Formatter.extractPort()}
 */
Ember.Handlebars.helper('extractPort', function(value, options){
    value = Handlebars.Utils.escapeExpression(value);

    var port = GLOBE.Formatter.extractPort(value);

    return new Handlebars.SafeString(port);
});