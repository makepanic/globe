/*global $, moment, GLOBE, jsSHA */
GLOBE.Util = {
    /**
     * Checks if a given string is a 40 char hex string
     * @param {String} string
     * @returns {Boolean}
     */
    is40CharHex: function(string){
        var hex40CharRegex = /^[a-f0-9]{40}/i,
            result;

        result = string.match(hex40CharRegex);

        return result !== null;
    },

    /**
     * Creates an sha1 hashed string based on a given fingerprint.
     * @see {@link https://trac.torproject.org/projects/tor/ticket/6320#comment:1}
     * @param {String} fingerprint
     * @returns {String} hashed fingerprint
     */
    hashFingerprint: function(fingerprint){
        var bin = this.hex2bin(fingerprint),
            fingerBin = new jsSHA(bin, 'TEXT'),
            hashed = fingerBin.getHash('SHA-1', 'HEX');
        return hashed.toUpperCase();

    },

    /**
     * Convert hex string to binary string
     * @see {@link http://stackoverflow.com/a/7695514">http://stackoverflow.com/a/7695514}
     * @param {String} hex
     * @returns {String}
     */
    hex2bin: function(hex){

        var bin = '',
            bytes = [],
            str,
            i;

        for(i = 0; i< hex.length-1; i += 2){
            bytes.push(parseInt(hex.substr(i, 2), 16));
        }

        str = String.fromCharCode.apply(String, bytes);

        if(str.length){
            bin = str;
        }
        return bin;
    },

    /**
     * Calculates the difference from now to a given utc time.
     * @param {String} value UTC Timestamp
     * @returns {{h: Number, m: Number, s: Number, d: Number}} hour, minute, second, day
     */
    UtcDiff: function(value){
        var momentDate = moment(value, 'YYYY-MM-DD HH:mm:ss'),
            diff,
            // default result
            result = {
                h:-1,
                m:-1,
                s:-1,
                d:-1
            },
            fl = Math.floor;

        if (momentDate.isValid()) {

            diff = moment().diff(momentDate);

            result.s = Math.round(diff/ 1000);
            result.m = fl(result.s/ 60);
            result.h = fl(result.m/ 60);
            result.d = fl(result.h/ 24);

            result.s %= 60;
            result.m %= 60;
            result.h %= 24;
        }

        return result;
    },

    /**
     * Calculates the uptime (Time difference between now and given timestamp) from a UTC-timestamp.
     * Result is an array with the first 2 full time units.
     *
     * @param {String} value UTC-Timestamp
     * @param {String} type "short" or something else
     * @returns {Array} first 2 full time units from uptime
     * @example
     * if uptime < days the function returns [ hours, minutes ]
     */
    UptimeCalculator: function(value, type){
        // if not a valid length return empty data message
        if (value.length !== 19) {
            return [GLOBE.static.messages.dataEmpty];
        }

        var beforeUnit = '<span>',
            afterUnit = '</span>';

        var diff = GLOBE.Util.UtcDiff(value),
            units = [diff.d, diff.h, diff.m, diff.s],
            digits = 0,
            shortVersion = type === 'short',
            pluralize = !shortVersion,
            labels = shortVersion ? ['d', 'h', 'm', 's'] : ['day', 'hour', 'minute', 'second'],
            uptimeArray = [];

        for(var i = 0, max = units.length; i < max; i++){
            if(labels[i] && labels[i].length && units[i] > 0){
                digits += 1;
                uptimeArray[i] = units[i] + beforeUnit + (pluralize && units[i] > 1 ? labels[i] + 's' : labels[i]) + afterUnit;

                if(digits > 1){
                    break;
                }
            }else{
                labels[i] = '';
            }
        }

        return uptimeArray;
    },
    /**
     * Converts UTC-Timestamp ( YYYY-MM-DD hh:mm:ss ) to JavaScript Date-Object.
     * @param {String} timestamp UTC-Timestamp
     * @returns {Date} converted date Object
     * @throws {String} will throw an error if the parsed timestamp is invalid
     */
    utcToDate: function(timestamp){
        var timeMoment = moment(timestamp, 'YYYY-MM-DD HH:mm:ss');

        if (!timeMoment.isValid()) {
            throw 'Are you sure this is a UTC timestamp? expected: YYYY-MM-DD hh:mm:ss got:' + timestamp;
        }

        return timeMoment.toDate();
    },

    /**
     * Generates history data
     * @param {Object} historyObject
     * @throws {String} throws an error if there is no interval or there is something wrong with start and end date
     * @returns {*}
     */
    buildTimeValuePairs: function(historyObject){

        if(historyObject.first && historyObject.last && historyObject.interval){

            var startDate = this.utcToDate(historyObject.first),
                endDate = this.utcToDate(historyObject.last);


            // check if Date creation was successfull
            if(!isNaN(startDate.getTime()) && !isNaN(endDate.getTime())){
                // everything worked

                var newValues = [];
                var values = historyObject.values;

                // interval is in seconds, multiply 1000 to get millisecs
                var interval = historyObject.interval * 1000;

                var currentTime = startDate.getTime();

                for(var i = 0, max = values.length; i < max; i++){

                    newValues.push([
                        currentTime,
                        values[i] * historyObject.factor
                    ]);
                    currentTime += interval;
                }

                historyObject.values = newValues;

            }else{
                throw 'There was an error parsing the history object timestamps. Check if ' + historyObject.first + ' or ' + historyObject.last + ' are correct.';
            }

        }else{
            throw 'Cannot generate time value pairs if there is no time interval given';
        }

        return historyObject;
    },
    /**
     *
     * @param history
     * @param {Object} toBuild
     * @returns {Array}
     */
    prepareHistoryItems: function(history, toBuild){

        var periods = [];
        for (var build in toBuild) {
            if(toBuild.hasOwnProperty(build)){

                var buildHistory = toBuild[build];
                for (var buildKey in buildHistory) {

                    if (buildHistory.hasOwnProperty(buildKey)) {

                        // push buildKey to periods if not already set
                        if ($.inArray(buildKey ,periods) === -1) {
                            periods.push(buildKey);
                        }

                        var keyObj = $.extend({}, GLOBE.defaults.WeightHistory, buildHistory[buildKey]);
                        history[build][buildKey] = GLOBE.Util.buildTimeValuePairs(keyObj);
                    }

                }

            }
        }
        return periods;
    }
};