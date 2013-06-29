
App.HistoryGraphView = Ember.View.extend({
    title: 'GraphView',
    templateName: 'graphItem',
    timePeriod: '1_week',
    timePeriods: ['1_week'],
    legendPos: [],

    plot: function(yTickFormat){

        var selector = this.$()[0].id;
        var $selector = $('#' + selector).find('.graph-canvas');
        var data = this.get('data');
        var period = this.get('timePeriod');
        var graphs = this.get('graphs');
        var labels = this.get('labels');
        var legendPos = this.get('legendPos');

        var histories = [];
        var dataset = [];

        for(var i = 0, max = graphs.length; i < max; i++){
            var graph = graphs[i];
            if(data.hasOwnProperty(graph)){
                histories.push(data[graph]);
            }
        }
        for(var i = 0, max = histories.length; i < max; i++){
            var history = histories[i];
            if(history && history[period] && history[period].values){
                dataset.push(history[period].values);
            }
        }

        if(!history.length){
            $selector.html('<div class="missing-data">No data available :(</div>');
            return;
        }

        var w = $selector.width();
        var h = $selector.height() || 300;

        var margin = {
            top: 40,
            right: 80,
            bottom: 30,
            left: 50
        };

        w -= margin.left - margin.right;
        h -= margin.top - margin.bottom;

        var xExtents = d3.extent(d3.merge(dataset), function(d) {
            return d.tim; });
        var yExtents = d3.extent(d3.merge(dataset), function(d) {
            return d.val; });
        var xScale = d3.time.scale()
            .domain(xExtents)
            .range([0, w]);
        var yScale = d3.scale.linear()
            .domain(yExtents)
            .range([h, 0]);

        var color = d3.scale.category10();

        // axis
        var xAxis = d3.svg.axis()
            .scale(xScale)
            .orient('bottom')
            .ticks(3)
            .tickFormat(d3.time.format('%Y/%m/%d'));

        var yAxis = d3.svg.axis()
            .scale(yScale)
            .orient('left')
            .ticks(5)
            .tickSize(-w)
            .tickFormat(d3.format(yTickFormat));

        // remove old svg
        d3.select('#' + selector + ' svg').remove();

        // create svg
        var svg = d3.select('#' + selector).append('svg')
            .attr('width', w - margin.left)
            .attr('height', h + margin.top + margin.bottom)
            .append('g')
            .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

        // create x axis
        svg.append('g')
            .attr('class', 'axis')
            .attr('transform', 'translate(0,' + h + ')')
            .call(xAxis);

        // create y axis
        svg.append('g')
            .attr('class', 'axis')
            .attr('transform', 'translate(0, 0)')
            .call(yAxis);

        var lineContainers = svg.selectAll("g.line")
            .data(dataset)
            .enter().append("svg:g")
            .attr("class", "line")
            .style("stroke-width", 2)
            .style("stroke", function(d){
                return color(dataset.indexOf(d));
            });

        /* Add path between all line values. */
        var line = d3.svg.line()
            .defined(function(d) { return d.val != null; })
            .x(function (d) { return xScale(d.tim); })
            .y(function (d) { return yScale(d.val); });

        lineContainers.append("svg:path")
            .attr("d", line)
            .style("fill", "none");


        // create legend
        var legend = svg.append("g")
            .attr("class", "legend")
            .attr("x", w - 65)
            .attr("y", 25);
        legend.selectAll("g").data(dataset)
            .enter().append("g")
            .each(function(d, i) {
                var g = d3.select(this);
                g.append("svg:text")
                    .attr("x", legendPos[i].x - margin.left)
                    .attr("y", legendPos[i].y - margin.top)
                    .attr("height", 30)
                    .attr("width", 100)
                    .style("fill", color(i))
                    .style("font-family", "Helvetica")
                    .text(labels[i]);
            });

    },
    dataChanged: function(){

        this.plot('s');

    }.observes('data'),
    timePeriodChanged: function(){

        var selectedTimePeriod = this.get('timePeriodSelect.value');
        if(selectedTimePeriod != null){
            this.set('timePeriod', selectedTimePeriod);
            this.plot('s');
        }

    }.observes('timePeriodSelect.value')

});

App.RelayWeightView = App.HistoryGraphView.extend({
    title: 'Weights',
    graphs: ['advertisedBandwidth', 'consensusWeightFraction', 'exitProbability', 'guardProbability'],
    labels: ['advertised bandwidth fraction', 'consensus weight fraction','guard probability', 'exit probability'],
    legendPos: [{x:80,y:30},{x:80,y:10},{x:270,y:10}, {x:270,y:30}]
});

App.RelayBandwidthView = App.HistoryGraphView.extend({
    title: 'Bandwidth',
    graphs: ['readHistory', 'writeHistory'],
    labels: ['written bytes per second', 'read bytes per second'],
    legendPos: [{x:60,y:10}, {x:270,y:10}]
});