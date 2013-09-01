GLOBE.Formatter = {
    /**
     * Converts bandwidth to formatted bandwidth
     * @param value String
     * @returns {*} String
     */
    bandwidth: function(value){
        var formatted = GLOBE.static.messages.dataEmpty;

        value = parseInt(value, 10);
        if(value !== -1 && !isNaN(value)){
            var bandwidthKB = value / 1000;
            var bandwidthMB = bandwidthKB/1000;

            if (bandwidthMB >= 1) {
                formatted = Math.round(bandwidthMB*100)/100 + " MB/s";
            } else {
                if (bandwidthKB >= 1) {
                    formatted = Math.round(bandwidthKB*100)/100 + " KB/s";
                } else {
                    formatted = value + " B/s";
                }
            }
        }

        return formatted;
    },

    /**
     * Creates HTML that displays a boolean value as styled HTML
     * @param value boolean
     * @returns {*} String styled HTML
     */
    boolean: function(value){
        var wrapped = '';

        if(value === 'true' || value === true){
            wrapped = '<span class="truefalse truefalse-true">true</span>';
        }else if(value === 'false' || value === false){
            wrapped = '<span class="truefalse truefalse-false">false</span>';
        }else{
            wrapped = '<span class="truefalse">' + GLOBE.static.messages.dataEmpty + '</span>';
        }
        return wrapped;
    },

    /**
     * Creates HTML that displays an flag icon for a given country key
     * @param value String country string
     * @returns {*} String HTML that displays country flag icon
     */
    countryFlag: function(value){

        var fullCountry = '';

        if(GLOBE.static.countries.hasOwnProperty(value)){
            fullCountry = GLOBE.static.countries[value];
        }else{
            fullCountry = GLOBE.static.messages.dataEmpty;
            value = 'empty';
        }

        return '<span title="' + fullCountry + '" data-tooltip class="hast-tip country-flag ' + value + '_png"></span>';
    },

    /**
     * Creates HTML that displays an icon for a given flagString.
     * @see https://onionoo.torproject.org/#details
     * @param value String icon string
     * @returns {*} String HTML that displays flag icon
     */
    propFlag: function(value){
        var map = GLOBE.static.icons;
        var withImage = '';
        if(map.hasOwnProperty(value)){
            withImage = '<i class="entypo hast-tip" data-tooltip title="' + value + '">' + map[value] + '</i>';
        }
        return withImage;
    },

    /**
     * Extracts port from a given string
     * @param value String complete host + port
     * @returns {*} String port or empty string if no port found
     * @example
     * <pre>
     *     var port = NAMESPACE.Formatter.extractPort('10.10.10.1:9000');
     * </pre>
     */
    extractPort: function(value){
        var port = GLOBE.static.messages.dataEmpty;

        if(typeof value === 'string'){
            var parts = value.split(':');
            if(parts.length === 2 && parts[1].length){
                port = parts[1];
            }
        }

        return port;
    }
};