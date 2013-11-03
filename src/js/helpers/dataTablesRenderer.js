/*global GLOBE, moment */
GLOBE.DataTableRenderer = {
    uptime: function (length) {
        return function (data, type) {
            if (type === 'display') {
                return GLOBE.Util.UptimeCalculator(data, length).join(' ');
            }
            return moment(data, 'YYYY-MM-DD HH:mm:ss').valueOf();
        };
    },
    bandwidth: function (data, type) {
        if (type === 'display') {
            return GLOBE.Formatter.bandwidth(data);
        }
        return data;
    },
    countryFlag: function (data, type) {
        if (type === 'display') {
            return GLOBE.Formatter.countryFlag(data);
        }
        return data;
    },
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
    },
    firstPort: function (data, type) {
        data = data[0];
        if (type === 'display') {
            return GLOBE.Formatter.extractPort(data);
        }
        return data;
    },
    port: function (data, type) {
        if (type === 'display') {
            return GLOBE.Formatter.extractPort(data);
        }
        return data;
    }
};