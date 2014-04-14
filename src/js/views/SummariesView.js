/*global GLOBE, Em */
GLOBE.BaseSummariesView = Em.View.extend({
    tagName: 'table',
    dataTable: null,
    data: [],

    // datatables column definition
    columnDefinition: [],

    classNames: ['relay-summary-list'],

    didInsertElement: function(){
        var that = this;
        var $el = this.$();
        var table = $el.dataTable({
            'aaData': [],
            'aaSorting': [],

            'sDom': '<"datatables-meta"f>t',
            'sScrollY': '600px',
            'bPaginate': false,
            'bScrollCollapse': true,
            'bDeferRender': true,

            'aoColumns': this.get('columnDefinition')
        });

        $el.on('click', 'tr', function(){
            // set function scope and parameter ( == view scope )
            that.rowClickedHandler.call(this, that);
        });
        this.set('dataTable', table);

        Em.$(window).on('resize', function () {
            Em.run.throttle(null, function(){
                table.fnAdjustColumnSizing();
            }, 150);
        });
    },
    createTableDataItem: function(){return {};},
    rowClickedHandler: function(){},

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

            table.$('.has-tip').qtip(GLOBE.static.qtipConf.summary);
        }
    }.observes('data.length'),

    willDestroyElement: function(){
        this.$('.has-tip').qtip('destroy', true);
    },

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

GLOBE.RelaySummariesView = GLOBE.BaseSummariesView.extend({
    columnDefinition:  [{
        'sTitle': 'Nickname',
        'sWidth': '25%',
        'sClass': 'bold',
        'mDataProp': 'nickname',
        'sType': 'string'
    },{
        'sTitle': 'Advertised Bandwidth',
        'sWidth': '20%',
        'mRender': GLOBE.DataTableRenderer.bandwidth,
        'mDataProp': 'advertisedBandwidth',
        'sType': 'numeric'
    },{
        'sTitle': 'Uptime',
        'sWidth': '12%',
        'mRender': GLOBE.DataTableRenderer.uptime('short'),
        'mDataProp': 'uptime',
        'sType': 'numeric'
    },{
        'sTitle': 'Country',
        'sWidth': '12%',
        'mRender': GLOBE.DataTableRenderer.countryFlag,
        'mDataProp': 'country',
        'sType': 'string'
    },{
        'sTitle': 'Flags',
        'sWidth': '21%',
        'mRender': GLOBE.DataTableRenderer.flags,
        'mDataProp': 'flags',
        'sType': 'flag'
    },{
        'sTitle': 'Running',
        'sWidth': '10%',
        'sClass': 'text-center',
        'mRender': GLOBE.Formatter.boolean,
        'mDataProp': 'running'
    }],
    rowClickedHandler: function(scope){
        var item = scope.get('dataTable').fnGetData(this);
        if(item && item.hasOwnProperty('fingerprint') && item.fingerprint.length === 40){
            scope.get('controller').send('showRelayDetail', item.fingerprint);
        }
    },
    createTableDataItem: function(item){
        return {
            'running': item.running,
            'nickname': item.nickname,
            'advertisedBandwidth': item.advertised_bandwidth,
            'uptime': item.last_restarted,
            'country': item.country,
            'flags': item.flags,
            'orPort': item.or_addresses,
            'dirPort': item.dir_address,
            'fingerprint': item.fingerprint
        };
    }
});

GLOBE.BridgeSummariesView = GLOBE.BaseSummariesView.extend({
    columnDefinition:  [{
        'sTitle': 'Nickname',
        'sWidth': '25%',
        'sClass': 'bold',
        'mDataProp': 'nickname',
        'sType': 'string'
    },{
        'sTitle': 'Advertised Bandwidth',
        'sWidth': '28%',
        'mRender': GLOBE.DataTableRenderer.bandwidth,
        'mDataProp': 'advertisedBandwidth',
        'sType': 'numeric'
    },{
        'sTitle': 'Uptime',
        'sWidth': '15%',
        'mRender': GLOBE.DataTableRenderer.uptime('short'),
        'mDataProp': 'uptime',
        'sType': 'numeric'
    },{
        'sTitle': 'Flags',
        'sWidth': '19%',
        'mRender': GLOBE.DataTableRenderer.flags,
        'mDataProp': 'flags',
        'sType': 'flag'
    },{
        'sTitle': 'Running',
        'sWidth': '9%',
        'sClass': 'text-center',
        'mRender': GLOBE.Formatter.boolean,
        'mDataProp': 'running'
    }],
    rowClickedHandler: function(scope){
        var item = scope.get('dataTable').fnGetData(this);
        if(item && item.hasOwnProperty('fingerprint') && item.fingerprint.length === 40){
            scope.get('controller').send('showBridgeDetail', item.fingerprint);
        }
    },
    createTableDataItem: function(item){
        return {
            'nickname': item.nickname,
            'advertisedBandwidth': item.advertised_bandwidth,
            'uptime': item.last_restarted,
            'flags': item.flags,
            'running': item.running,
            'fingerprint': item.hashed_fingerprint
        };
    }
});

// view to hold summary view ( needed for datatables div creation outside the other summariesView )
GLOBE.SummaryHolderView = Em.View.extend({
});