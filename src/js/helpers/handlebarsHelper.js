/*global GLOBE, Handlebars, Em, moment */
/**
 * @see {@link GLOBE.Formatter.boolean()}
 */
Em.Handlebars.helper('truefalse', function(value){
    var wrapped = GLOBE.Formatter.boolean(value);
    return new Handlebars.SafeString(wrapped);
});

/**
 * @see {@link GLOBE.Formatter.bandwidth()}
 */
Em.Handlebars.helper('bandwidth', function(value){
    var formatted = GLOBE.Formatter.bandwidth(value);
    return new Handlebars.SafeString(formatted);
});

/**
 * Uses {@link GLOBE.static.countries} to get the full name for a country key
 */
Em.Handlebars.registerBoundHelper('fullCountry', function(value){
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
Em.Handlebars.registerBoundHelper('prettyCountryFlag', function(value){
    value = Handlebars.Utils.escapeExpression(value);

    var countryLabel = GLOBE.Formatter.countryFlag(value);
    return new Handlebars.SafeString(countryLabel);
});

/**
 * @see {@link GLOBE.Formatter.countryFlag()}
 */
Em.Handlebars.registerBoundHelper('flaggifyShort', function(value){
    value = Handlebars.Utils.escapeExpression(value);
    var withImage = GLOBE.Formatter.countryFlag(value);
    return new Handlebars.SafeString(withImage);
});

/**
 * Generates HTML that displays an flag icon with flag title
 */
Em.Handlebars.registerBoundHelper('flaggifyLong', function(value){
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
Em.Handlebars.helper('uptimeFull', function(value){
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
Em.Handlebars.helper('uptimeShort', function(value){
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
Em.Handlebars.helper('extractPort', function(value){
    value = Handlebars.Utils.escapeExpression(value);

    var port = GLOBE.Formatter.extractPort(value);

    return new Handlebars.SafeString(port);
});

/**
 * uses {@link http://momentjs.com/docs/#/displaying/fromnow/} to display the difference from now and a given time
 */
Em.Handlebars.helper('fromNow', function(value){
    var fromNow = '',
        valMoment = moment.utc(value);

    if(valMoment.isValid()){
        fromNow = valMoment.fromNow();
    }

    return new Handlebars.SafeString(fromNow);
});
/**
 * @see {@link GLOBE.Formatter.familyToFingerprint()}
 */
Em.Handlebars.helper('familyToFingerprint', function(value){
    return new Handlebars.SafeString(GLOBE.Formatter.familyToFingerprint(value));
});
/**
 * @see {@link GLOBE.Formatter.familyToFingerprint()}
 */
Em.Handlebars.helper('percent', function(value, precision){
    return new Handlebars.SafeString(GLOBE.Formatter.percent(value, precision));
});
/**
 * @see {@link GLOBE.Formatter.familyToFingerprint()}
 */
Em.Handlebars.helper('anonIpAdress', function(value){
    return new Handlebars.SafeString(GLOBE.Formatter.anonymizeIpAddress(value));
});