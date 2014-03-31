/*global $, GLOBE, Em */
GLOBE.PeriodsMixin = Em.Mixin.create({
    selectedPeriod: '1_week',
    periods: [],
    periodsObject: {},

    updatePeriods: function(dataFields){
        var props = this.getProperties(dataFields),
            periods = this.get('periodsObject'),
            periodsArray;

        function populatePeriods(data){
            Object.keys(data).forEach(function(dataKey){
                Object.keys(data[dataKey]).forEach(function(period){
                    periods[period] = 1;
                });
            });
        }

        dataFields.forEach(function(dataField){
            populatePeriods(props[dataField]);
        });

        periodsArray = Object.keys(periods).map(function(period){
            return {
                key: period,
                title: GLOBE.static.messages[period],
                active: false,
                pos: GLOBE.static.numbers[period]
            };
        }).sort(function(a, b){
            return a.pos - b.pos;
        });

        // first period is active
        if (periodsArray.length) {
            periodsArray[0].active = true;
            this.set('selectedPeriod', periodsArray[0].key);
        }

        this.set('periodsObject', periods);
        this.set('periods', periodsArray);
    },

    actions: {
        tabActivated: function(key) {
            this.get('periods').forEach(function(period){
                if (period.key === key) {
                    Em.set(period, 'active', true);
                } else {
                    Em.set(period, 'active', false);
                }
            });
            this.set('selectedPeriod', key);
        }
    }
});