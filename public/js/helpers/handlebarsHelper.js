
Ember.Handlebars.helper('truefalse', function(value, options){
    var wrapped = '';
    if(value === 'true' || value === true){
        wrapped = '<span class="truefalse-true">true</span>';
    }else{
        wrapped = '<span class="truefalse-false">false</span>';
    }
    return new Handlebars.SafeString(wrapped);
});

Ember.Handlebars.helper('bandwidth', function(value, options){
    return new Handlebars.SafeString(App.Formatter.prettyBandwidth(value));
});



Ember.Handlebars.registerBoundHelper('fullCountry', function(value, options){
    value = Handlebars.Utils.escapeExpression(value);

    var fullCountry = '';
    if(App.static.countries.hasOwnProperty(value)){
        fullCountry = App.static.countries[value];
    }

    return new Handlebars.SafeString(fullCountry);
});


Ember.Handlebars.registerBoundHelper('countryFlag', function(value, options){
    value = Handlebars.Utils.escapeExpression(value);

    var countryLabel = '';
    if(App.static.countries.hasOwnProperty(value)){
        var fullCountry = App.static.countries[value];

        countryLabel = '<span title="' + fullCountry + '" data-tooltip class="hast-tip country-flag ' + value + '_png"></span>';

    }

    return new Handlebars.SafeString(countryLabel);
});
Ember.Handlebars.registerBoundHelper('flaggifyShort', function(value, options){
    var map = App.static.icons;
    value = Handlebars.Utils.escapeExpression(value);
    var withImage = '';
    if(map.hasOwnProperty(value)){
        withImage = '<i class="entypo hast-tip" data-tooltip title="' + value + '">' + map[value] + '</i>';
    }
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
Ember.Handlebars.helper('extractPort', function(value, options){
    value = Handlebars.Utils.escapeExpression(value);

    var port = '';
    var parts = value.split(':');
    if(parts.length === 2 && parts[1].length){
        port = parts[1];
    }

    return new Handlebars.SafeString(port);
});