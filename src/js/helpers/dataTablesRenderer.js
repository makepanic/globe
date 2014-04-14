/*global GLOBE, moment */
GLOBE.DataTableRenderer = {
    /**
     * @see {@link GLOBE.Util.UptimeCalculator}
     * @param {String} length 'short' or 'long'
     * @returns {Function} Formatter for length
     */
    uptime: function (length) {
        return function (data, type, context) {
            if (type === 'display') {
                if (context.running){
                    return GLOBE.Util.UptimeCalculator(data, length).join(' ');
                } else {
                    return '<span class="has-tip" title="Offline">' + GLOBE.static.messages.dataEmpty + '</span>';
                }
            }
            return moment.utc(data, 'YYYY-MM-DD HH:mm:ss').valueOf();
        };
    },
    /**
     * @see {@link GLOBE.Formatter.bandwidth}
     * @param {String|Number} data
     * @param {String} type
     * @returns {String|Number} formatted String or data if type equals 'display'
     */
    bandwidth: function (data, type) {
        if (type === 'display') {
            return GLOBE.Formatter.bandwidth(data);
        }
        return data;
    },
    /**
     * @see {@link GLOBE.Formatter.countryFlag}
     * @param {String} data
     * @param {String} type
     * @returns {String} formatted country flag or
     */
    countryFlag: function (data, type) {
        if (type === 'display') {
            return GLOBE.Formatter.countryFlag(data);
        }
        return data;
    },
    /**
     * @see {@link GLOBE.Formatter.propFlag}
     * @param {String} data
     * @param {String} type
     * @returns {String}
     */
    flags: function (data, type) {
        if (type === 'display') {
            var flagString = '';

            // create flag render
            if(!data.length){
                return '';
            }
            data.forEach(function(n){
                flagString += GLOBE.Formatter.propFlag(n);
            });
            return flagString;
        }
        return data;
    }
};