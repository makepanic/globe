App.Util = {
    /**
     * Checks if a given string is a 40 char hex string
     * @param string
     * @returns {boolean}
     */
    is40CharHex: function(string){
        var hex40CharRegex = /^[a-f0-9]{40}/i;
        var result = '';

        result = string.match(hex40CharRegex);

        return result !== null;
    },

    /**
     * Creates an sha1 hashed string based on a given fingerprint.
     * @see <a href="https://trac.torproject.org/projects/tor/ticket/6320#comment:1">comment on how to hash fingerprint</a>
     * @param fingerprint
     * @returns hashed fingerprint
     */
    hashFingerprint: function(fingerprint){

        var bin = this.hex2bin(fingerprint);
        var fingerBin = new jsSHA(bin, 'TEXT');
        var hashed = fingerBin.getHash('SHA-1', 'HEX');
        return hashed.toUpperCase();

    },

    /**
     * Convert hex string to binary string
     * @see <a href="http://stackoverflow.com/a/7695514">http://stackoverflow.com/a/7695514</a>
     * @param hex
     * @returns {string}
     */
    hex2bin: function(hex){

        var bin = '',
            bytes = [];

        for(var i=0; i< hex.length-1; i+=2){
            bytes.push(parseInt(hex.substr(i, 2), 16));
        }

        var str = String.fromCharCode.apply(String, bytes);

        if(str.length){
            bin = str;
        }
        return bin;
    },

    /**
     * Calculates the difference from now to a given utc time.
     * @param value - UTC Timestamp
     * @returns {{h: number, m: number, s: number, d: number}}
     */
    UtcDiff: function(value){
        if(!value)return {};

        var parts = value.split(' ');

        var date = parts[0],
            time = parts[1];

        var dateSplit = date.split('-'),
            timeSplit = time.split(':');

        var then = new Date(dateSplit[0], dateSplit[1] - 1, dateSplit[2], timeSplit[0], timeSplit[1], timeSplit[2]);
        var now = new Date();
        now = new Date(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate(),  now.getUTCHours(), now.getUTCMinutes(), now.getUTCSeconds());

        var diffTime = now - then;

        var diffSec = Math.round( diffTime / 1000),
            diffMin = Math.floor( diffSec / 60),
            diffHrs = Math.floor( diffMin / 60),
            diffDay = Math.floor( diffHrs / 24);

        diffSec %= 60;
        diffMin %= 60;
        diffHrs %= 24;

        return {
            h: diffHrs,
            m: diffMin,
            s: diffSec,
            d: diffDay
        }

    },

    /**
     * Calculates the uptime (Time difference between now and given timestamp) from a UTC-timestamp.
     * Result is an array with the first 2 full time units.
     * Example: if uptime < days then it returns [ hours, minutes ]
     * @param value String, UTC-Timestamp
     * @param type String, "short" or something else
     * @returns {Array} Array, first 2 full time units from uptime
     */
    UptimeCalculator: function(value, type){
        // if not a valid length return empty data message
        if(value.length != 19)return [App.static.messages.dataEmpty];

        var beforeUnit = '<span>',
            afterUnit = '</span>';

        var diff = App.Util.UtcDiff(value),
            digits = 0,
            pluralize = false,
            labels = [];

        // add short length time units
        var units = [diff.d, diff.h, diff.m, diff.s];

        if(type === 'short'){
            labels = ['d', 'h', 'm', 's'];
        }else{
            labels = ['day', 'hour', 'minute', 'second'];
            pluralize = true;
        }
        var uptimeArray = [];

        for(var i = 0, max = units.length; i < max; i++){
            if(labels[i] && labels[i].length && units[i] > 0){
                digits++;
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
     * Converts UTC-Timestamp ( YYYY-MM-DD hh:mm:ss ) to JavaScript Date-Object
     * @param timestamp String UTC-Timestamp
     * @returns {null} Date Object
     */
    utcToDate: function(timestamp){
        var utcDate = null;

        var stampSplit = timestamp.split(' ');
        if(stampSplit.length !== 2){
            throw 'Are you sure this is a UTC timestamp? expected: YYYY-MM-DD hh:mm:ss got:' + timestamp;
        }else{
            var date = stampSplit[0];
            var time = stampSplit[1];

            var dateSplit = date.split('-');
            var timeSplit = time.split(':');

            utcDate = new Date(
                dateSplit[0], dateSplit[1] - 1, dateSplit[2],
                timeSplit[0], timeSplit[1], timeSplit[2]);
        }

        return utcDate;
    },
    buildTimeValuePairs: function(historyObject){

        if(historyObject.first && historyObject.last && historyObject.interval){

            var startDate = this.utcToDate(historyObject.first),
                endDate = this.utcToDate(historyObject.last);


            // check if Date creation was successfull
            if(!isNaN(startDate) && !isNaN(endDate)){
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
    prepareHistoryItems: function(history, toBuild){

        var periods = [];
        for(var build in toBuild){
            if(toBuild.hasOwnProperty(build)){

                var buildHistory = toBuild[build];
                for(var buildKey in buildHistory){

                    if(buildHistory.hasOwnProperty(buildKey)){

                        // push buildKey to periods if not already set
                        if($.inArray(buildKey ,periods) === -1)periods.push(buildKey);

                        var keyObj = $.extend({}, defaultWeightHistory, buildHistory[buildKey]);
                        history[build][buildKey] = App.Util.buildTimeValuePairs(keyObj);
                    }

                }

            }
        }
        return periods;
    }
}