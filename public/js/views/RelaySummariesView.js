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
            /*
            'bScrollInfinite': true,
            'bScrollCollapse': true,
            'sScrollY': '500px',
            */
            'aoColumns': this.get('columnDefinition')
        });
        $el.on('click', 'tr', function(event){
            var item = table.fnGetData(this);
            if(item.hasOwnProperty('fingerprint') && item['fingerprint'].length === 40){
                that.get('controller').send('showRelayDetail', item['fingerprint']);
            }
        });
        this.set('dataTable', table);
    },
    createTableDataItem: function(item){
        return {};
    },

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
    }.observes('data.length')
});

App.RelaySummariesView = App.BaseSummariesView.extend({
    columnDefinition:  [{
        'sTitle': 'Nickname',
        'sWidth': '24%',
        'sClass': 'bold',
        'mDataProp': 'nickname'
    },{
        'sTitle': 'Advertised Bandwidth',
        'sWidth': '12%',
        'mRender': App.Util.prettyBandwidth,
        'mDataProp': 'advertisedBandwidth'
    },{
        'sTitle': 'Uptime',
        'sWidth': '10%',
        'mRender': function(data){
            return App.Util.UptimeCalculator(data, 'short').join(' ');
        },
        'mDataProp': 'uptime'
    },{
        'sTitle': 'Country',
        'sWidth': '5%',
        'sClass': 'centered',
        'mRender': App.Util.prettyCountryFlag,
        'mDataProp': 'country'
    },{
        'sTitle': 'Flags',
        'sWidth': '19%',
        'mRender': function(data){

            // create flag render
            if(!data.length){ return ''; }
            var flagString = '';
            data.forEach(function(n, f){
                flagString += App.Util.prettyPropFlag(n);
            });
            return flagString;
        }                      ,
        'mDataProp': 'flags'
    },{
        'sTitle': 'OR Port',
        'sWidth': '10%',
        'sClass': 'centered',
        'mRender': function(data){
            return App.Util.extractPort(data[0]);
        }                      ,
        'mDataProp': 'orPort'
    },{
        'sTitle': 'Dir Port',
        'sWidth': '10%',
        'sClass': 'centered',
        'mRender': App.Util.extractPort,
        'mDataProp': 'dirPort'
    }],
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
        'mDataProp': 'nickname'
    },{
        'sTitle': 'Advertised Bandwidth',
        'sWidth': '33%',
        'mRender': App.Util.prettyBandwidth,
        'mDataProp': 'advertisedBandwidth'
    },{
        'sTitle': 'Uptime',
        'sWidth': '10%',
        'mRender': function(data){
            return App.Util.UptimeCalculator(data, 'short').join(' ');
        },
        'mDataProp': 'uptime'
    },{
        'sTitle': 'Flags',
        'sWidth': '19%',
        'mRender': function(data){
            // create flag render
            if(!data.length){ return ''; }
            var flagString = '';
            data.forEach(function(n, f){
                flagString += App.Util.prettyPropFlag(n);
            });
            return flagString;
        }                      ,
        'mDataProp': 'flags'
    },{
        'sTitle': 'Running',
        'sWidth': '9%',
        'sClass': 'centered',
        'mRender': App.Util.prettyYesNo,
        'mDataProp': 'running'
    }],
    createTableDataItem: function(item){
        return {
            'nickname': item['nickname'],
            'advertisedBandwidth': item['advertised_bandwidth'],
            'uptime': item['last_restarted'],
            'flags': item['flags'],
            'running': item['running']
        };
    }
});