
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
    var formatted = '';
    value = parseInt(value, 10);
    formatted = App.Util.prettyBandwidth(value);
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


Ember.Handlebars.registerBoundHelper('prettyCountryFlag', function(value, options){
    value = Handlebars.Utils.escapeExpression(value);

    var countryLabel = App.Util.prettyCountryFlag(value);
    return new Handlebars.SafeString(countryLabel);
});
Ember.Handlebars.registerBoundHelper('flaggifyShort', function(value, options){
    value = Handlebars.Utils.escapeExpression(value);
    var withImage = App.Util.prettyCountryFlag(value);
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

    var port = App.Util.extractPort(value);

    return new Handlebars.SafeString(port);
});