App.BaseSummariesView = Ember.View.extend({
    tagName: 'table',
    dataTable: null,
    data: [],
    columnDefinition: [],
    classNames: ['relay-summary-list'],

    didInsertElement: function(){
        var that = this;
        var $el = this.$();
        var table = $el.dataTable({
            'aaData': [],

            "sScrollY": "600px",
            "bPaginate": false,
            "bScrollCollapse": true,
            'bDeferRender': true,

            'aoColumns': this.get('columnDefinition')
        });

        $el.on('click', 'tr', function(){
            // set function scope and parameter ( == view scope )
            that.rowClickedHandler.call(this, that);
        });
        this.set('dataTable', table);
    },
    createTableDataItem: function(item){return {};},
    rowClickedHandler: function(scope){},

    dataChanged: function(){
        var data = this.get('data');
        var table = this.get('dataTable');

        if(data){
            var tableData = [];

            for(var i = 0, max = data.length; i < max; i++){
                tableData.push(this.createTableDataItem(data[i]));
            }

            table.fnClearTable();
            table.fnAddData(tableData);
            table.fnDraw();
        }
    }.observes('data.length'),

    isVisibleChanged: function(){
        var table = this.get('dataTable');
        var visible = this.get('parentView.isVisible');
        if(visible && table){
            setTimeout(function(){
                table.fnAdjustColumnSizing();

            }, 0);
        }
    }.observes('parentView.isVisible')
});

App.RelaySummariesView = App.BaseSummariesView.extend({
    columnDefinition:  [{
        'sTitle': 'Nickname',
        'sWidth': '25%',
        'sClass': 'bold',
        'mDataProp': 'nickname',
        'sType': 'string'
    },{
        'sTitle': 'Advertised Bandwidth',
        'sWidth': '14%',
        'mRender': App.Formatter.bandwidth,
        'mDataProp': 'advertisedBandwidth'
    },{
        'sTitle': 'Uptime',
        'sWidth': '12%',
        'mRender': function(data){
            return App.Util.UptimeCalculator(data, 'short').join(' ');
        },
        'mDataProp': 'uptime',
        'sType': 'string'
    },{
        'sTitle': 'Country',
        'sWidth': '6%',
        'sClass': 'text-center',
        'mRender': App.Formatter.countryFlag,
        'mDataProp': 'country',
        'sType': 'string'
    },{
        'sTitle': 'Flags',
        'sWidth': '21%',
        'mRender': function(data){

            // create flag render
            if(!data.length){ return ''; }
            var flagString = '';
            data.forEach(function(n, f){
                flagString += App.Formatter.propFlag(n);
            });
            return flagString;
        }                      ,
        'mDataProp': 'flags',
        'sType': 'flag'
    },{
        'sTitle': 'OR Port',
        'sWidth': '11%',
        'sClass': 'text-center',
        'mRender': function(data){
            return App.Formatter.extractPort(data[0]);
        }                      ,
        'mDataProp': 'orPort',
        'sType': 'port'
    },{
        'sTitle': 'Dir Port',
        'sWidth': '11%',
        'sClass': 'text-center',
        'mRender': App.Formatter.extractPort,
        'mDataProp': 'dirPort',
        'sType': 'port'
    }],
    rowClickedHandler: function(scope){
        var item = scope.get('dataTable').fnGetData(this);
        if(item && item.hasOwnProperty('fingerprint') && item['fingerprint'].length === 40){
            scope.get('controller').send('showRelayDetail', item['fingerprint']);
        }
    },
    createTableDataItem: function(item){
        return {
            'nickname': item['nickname'],
            'advertisedBandwidth': item['advertised_bandwidth'],
            'uptime': item['last_restarted'],
            'country': item['country'],
            'flags': item['flags'],
            'orPort': item['or_addresses'],
            'dirPort': item['dir_address'],
            'fingerprint': item['fingerprint']
        };
    }
});

App.BridgeSummariesView = App.BaseSummariesView.extend({
    columnDefinition:  [{
        'sTitle': 'Nickname',
        'sWidth': '25%',
        'sClass': 'bold',
        'mDataProp': 'nickname',
        'sType': 'string'
    },{
        'sTitle': 'Advertised Bandwidth',
        'sWidth': '28%',
        'mRender': App.Formatter.bandwidth,
        'mDataProp': 'advertisedBandwidth',
        'sType': 'string'
    },{
        'sTitle': 'Uptime',
        'sWidth': '15%',
        'mRender': function(data){
            return App.Util.UptimeCalculator(data, 'short').join(' ');
        },
        'mDataProp': 'uptime',
        'sType': 'string'
    },{
        'sTitle': 'Flags',
        'sWidth': '19%',
        'mRender': function(data){
            // create flag render
            if(!data.length){ return ''; }
            var flagString = '';
            data.forEach(function(n, f){
                flagString += App.Formatter.propFlag(n);
            });
            return flagString;
        }                      ,
        'mDataProp': 'flags',
        'sType': 'flag'
    },{
        'sTitle': 'Running',
        'sWidth': '9%',
        'sClass': 'text-center',
        'mRender': App.Formatter.trueFalse,
        'mDataProp': 'running'
    }],
    rowClickedHandler: function(scope){
        var item = scope.get('dataTable').fnGetData(this);
        if(item && item.hasOwnProperty('fingerprint') && item['fingerprint'].length === 40){
            scope.get('controller').send('showBridgeDetail', item['fingerprint']);
        }
    },
    createTableDataItem: function(item){
        return {
            'nickname': item['nickname'],
            'advertisedBandwidth': item['advertised_bandwidth'],
            'uptime': item['last_restarted'],
            'flags': item['flags'],
            'running': item['running'],
            'fingerprint': item['hashed_fingerprint']
        };
    }
});

// view to hold summary view ( needed for datatables div creation outside the other summariesView )
App.SummaryHolderView = Ember.View.extend({
});