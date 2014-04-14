/*global GLOBE */
GLOBE.Formatter = {
    /**
     * Converts bandwidth to formatted bandwidth
     *
     * @param {String} value Value to format
     * @returns {String} Bandwidth string
     * @example
     * // returns '2.05KB/s'
     * GLOBE.Formatter.bandwidth(2048)
     */
    bandwidth: function(value){
        var formatted = GLOBE.static.messages.dataEmpty;

        value = parseInt(value, 10);
        if(value !== -1 && !isNaN(value)){
            var bandwidthKB = value / 1000;
            var bandwidthMB = bandwidthKB / 1000;

            if (bandwidthMB >= 1) {
                formatted = Math.round(bandwidthMB * 100) / 100 + ' MB/s';
            } else {
                if (bandwidthKB >= 1) {
                    formatted = Math.round(bandwidthKB * 100) / 100 + ' kB/s';
                } else {
                    formatted = value + ' B/s';
                }
            }
        }

        return formatted;
    },

    /**
     * Creates HTML that displays a boolean value as styled HTML
     *
     * @param {Boolean|String} value Value to format
     * @returns {String} generated HTML
     * @example
     * // returns '"<span class="boolean true">true</span>"'
     * GLOBE.Formatter.boolean('true')
     * // returns '"<span class="boolean true">true</span>"'
     * GLOBE.Formatter.boolean(true)
     */
    boolean: function(value){
        var wrapped = '';

        if(value === 'true' || value === true){
            wrapped = '<span class="boolean true">true</span>';
        }else if(value === 'false' || value === false){
            wrapped = '<span class="boolean false">false</span>';
        }else{
            wrapped = '<span class="boolean">' + GLOBE.static.messages.dataEmpty + '</span>';
        }
        return wrapped;
    },

    /**
     * Creates HTML that displays an flag icon for a given country key
     *
     * @param {String} value country string
     * @returns {String} HTML that displays country flag icon
     * @example
     * // returns '"<span title="Germany" data-tooltip class="has-tip country-flag de_png"></span>"'
     * GLOBE.Formatter.countryFlag('de')
     */
    countryFlag: function(value){

        var fullCountry = '';

        if(GLOBE.static.countries.hasOwnProperty(value)){
            fullCountry = GLOBE.static.countries[value];
        }else{
            fullCountry = GLOBE.static.messages.dataEmpty;
            value = 'empty';
        }

        return '<span title="' + fullCountry + '" data-tooltip class="has-tip country-flag ' + value + '_png"></span>';
    },

    /**
     * Generates HTML that displays an icon (from {@link GLOBE.static.icons}) for a given value.
     *
     * @see {@link GLOBE.static.icons}
     * @see {@link https://onionoo.torproject.org/#details}
     * @param {String} value icon string
     * @returns {String} HTML that displays flag icon
     * @example
     * // return '<span class="fa fa-bolt has-tip" data-tooltip title="Fast"></span>'
     * GLOBE.Formatter.propFlag('Fast')
     */
    propFlag: function(value){
        var map = GLOBE.static.icons,
            withImage = '';

        if(map.hasOwnProperty(value)){
            withImage = '<span class="fa ' + map[value] + ' has-tip" data-tooltip title="' + value + '"></span>';
        }
        return withImage;
    },

    /**
     * Extracts a port from a given string by returning the value after the last ':'
     * @param {String} value complete host + port
     * @returns {String} port or empty string if no port found
     * @example
     * // returns '9000'
     * GLOBE.Formatter.extractPort('10.10.10.1:9000');
     */
    extractPort: function(value){
        var port = GLOBE.static.messages.dataEmpty;

        if(typeof value === 'string'){
            var parts = value.split(':'),
                part;

            if (parts.length && parts.length > 1 &&
                (part = parts[parts.length - 1]).length) {
                port = part;
            }
        }

        return port;
    },

    /**
     * Returns the fingerprint from a detail document family member
     * @see {@link https://onionoo.torproject.org/#details}
     * @param {String} val family member
     * @returns {String} empty or fingerprint
     * @example
     * // returns '0000000000000000000000000000000000000000'
     * GLOBE.Formatter.familyToFingerprint('$0000000000000000000000000000000000000000')
     */
    familyToFingerprint: function (val) {
        var fingerprint = '';

        if (val && Object.prototype.toString.call(val) === '[object String]' && val.indexOf('$') === 0) {
            fingerprint = val.slice(1);
        }
        return fingerprint;
    },

    percent: function(val, precision) {
        var fixed = GLOBE.static.messages.dataEmpty;
        precision = precision | 2;
        if (!isNaN(val) && typeof val === 'number') {
            fixed = (val * 100).toFixed(precision) + '%';
        }
        return fixed;
    },

    /**
     * Returns a string that contains the ip version and port
     * @param {String} val
     * @return {String} ip version and port
     * @example
     * // returns 'IPv4:9000'
     * Globe.Formatter.anonymizeIpAddress('128.0.0.1:9000')
     */
    anonymizeIpAddress: function(val) {
        var ipV = GLOBE.Util.looksLikeIpV(val),
            port = GLOBE.Formatter.extractPort(val);

        return 'IPv' + ipV + ':' + port;
    }
};