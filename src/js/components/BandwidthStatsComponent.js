/*global GLOBE, Em */
GLOBE.GraphStatsComponent = Em.Component.extend({
    classNames: ['graph-stats'],
    getAvgs: function(fields){
        var avgHistory = {},
            data = this.get('data'),
            period = this.get('period');

        fields.forEach(function(field){
            if (data && data[field] && data[field][period]){
                avgHistory[field + 'Avg'] = data[field][period].avg;
            }
        });

        return avgHistory;
    },
    avgShouldChange: function(){
        this.setProperties(this.getAvgs(this.get('avgFields')));
    }.observes('period', 'timePeriods')
});
GLOBE.BandwidthStatsComponent = GLOBE.GraphStatsComponent.extend({
    avgFields: [
        'writeHistory',
        'readHistory'
    ]
});
GLOBE.UptimeStatsComponent = GLOBE.GraphStatsComponent.extend({
    avgFields: [
        'uptime'
    ]
});
GLOBE.WeightStatsComponent = GLOBE.GraphStatsComponent.extend({
    avgFields: [
        'advertisedBandwidth',
        'consensusWeightFraction',
        'exitProbability',
        'guardProbability'
    ]
});
GLOBE.ClientsStatsComponent = GLOBE.GraphStatsComponent.extend({
    avgFields: [
        'averageClients'
    ]
});