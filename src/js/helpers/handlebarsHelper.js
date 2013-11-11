/*global GLOBE, Handlebars, Ember, moment */
/**
 * @see {@link GLOBE.Formatter.boolean()}
 */
Ember.Handlebars.helper('truefalse', function(value){
    var wrapped = GLOBE.Formatter.boolean(value);
    return new Handlebars.SafeString(wrapped);
});

/**
 * @see {@link GLOBE.Formatter.bandwidth()}
 */
Ember.Handlebars.helper('bandwidth', function(value){
    var formatted = GLOBE.Formatter.bandwidth(value);
    return new Handlebars.SafeString(formatted);
});

/**
 * Uses {@link GLOBE.static.countries} to get the full name for a country key
 */
Ember.Handlebars.registerBoundHelper('fullCountry', function(value){
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
Ember.Handlebars.registerBoundHelper('prettyCountryFlag', function(value){
    value = Handlebars.Utils.escapeExpression(value);

    var countryLabel = GLOBE.Formatter.countryFlag(value);
    return new Handlebars.SafeString(countryLabel);
});

/**
 * @see {@link GLOBE.Formatter.countryFlag()}
 */
Ember.Handlebars.registerBoundHelper('flaggifyShort', function(value){
    value = Handlebars.Utils.escapeExpression(value);
    var withImage = GLOBE.Formatter.countryFlag(value);
    return new Handlebars.SafeString(withImage);
});

/**
 * Generates HTML that displays an flag icon with flag title
 */
Ember.Handlebars.registerBoundHelper('flaggifyLong', function(value){
    var map = GLOBE.static.icons;
    value = Handlebars.Utils.escapeExpression(value);
    var withImage = value;
    if(map.hasOwnProperty(value)){
        withImage = '<i class="fa ' + map[value] + '"></i> ' + withImage;
    }
    return new Handlebars.SafeString(withImage);
});

/**
 * Uses the 'long' variant to generate an uptime string
 * @see {@title GLOBE.Util.UptimeCalculator}
 */
Ember.Handlebars.helper('uptimeFull', function(value){
    if(!value){
        return '';
    }
    value = Handlebars.Utils.escapeExpression(value);
    var uptimeArray = GLOBE.Util.UptimeCalculator(value, 'long');
    return new Handlebars.SafeString(uptimeArray.join(' '));
});

/**
 * Uses the 'short' variant to generate an uptime string
 * @see {@title GLOBE.Util.UptimeCalculator}
 */
Ember.Handlebars.helper('uptimeShort', function(value){
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
Ember.Handlebars.helper('extractPort', function(value){
    value = Handlebars.Utils.escapeExpression(value);

    var port = GLOBE.Formatter.extractPort(value);

    return new Handlebars.SafeString(port);
});

/**
 * uses {@link http://momentjs.com/docs/#/displaying/fromnow/} to display the difference from now and a given time
 */
Ember.Handlebars.helper('fromNow', function(value){
    var fromNow = '',
        valMoment = moment(value);

    if(valMoment.isValid()){
        fromNow = valMoment.fromNow();
    }

    return new Handlebars.SafeString(fromNow);
});
/**
 * @see {@link GLOBE.Formatter.familyToFingerprint()}
 */
Ember.Handlebars.helper('familyToFingerprint', function(value){
    return new Handlebars.SafeString(GLOBE.Formatter.familyToFingerprint(value));
});