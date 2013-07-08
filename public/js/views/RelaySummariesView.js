App.BaseSummariesView = Ember.View.extend({
    tagName: 'table',
    dataTable: null,
    columnDefinition: [],

    didInsertElement: function(){
        var $el = this.$();
        var table = $el.dataTable({
            'aaData': [],
            'aoColumns': this.get('columnDefinition')
        });
        this.set('dataTable', table);
    }
});

App.RelaySummariesView = App.BaseSummariesView.extend({
    //templateName: 'relaySummaries',
    classNames: ['relay-summary-list'],
    columnDefinition:  [{
        'sTitle': 'Nickname',
        'sWidth': '25%',
        'sClass': 'bold'
    },{
        'sTitle': 'Advertised Bandwidth',
        'sWidth': '13%',
        'mRender': App.Util.prettyBandwidth
    },{
        'sTitle': 'Uptime',
        'sWidth': '10%',
        'mRender': function(data){
            console.log('utptime', data);
            return App.Util.UptimeCalculator(data, 'short').join(' ');
        }
    },{
        'sTitle': 'Country',
        'sWidth': '5%',
        'sClass': 'centered',
        'mRender': App.Util.prettyCountryFlag
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
        }
    },{
        'sTitle': 'OR Port',
        'sWidth': '9%',
        'sClass': 'centered',
        'mRender': function(data){
            return App.Util.extractPort(data[0]);
        }
    },{
        'sTitle': 'Dir Port',
        'sWidth': '9%',
        'sClass': 'centered',
        'mRender': App.Util.extractPort
    }],


    dataChanged: function(){
        var content = this.get('controller.content');
        var table = this.get('dataTable');

        console.log('content', content);

        // check if table is initialized
        if(!table){
            console.error('table not initialized');
            return;
        }


        for(var i = 0, max = content.length; i < max; i++){
            var item = content[i];

            console.log('table adding data', item);

            // check if summary content, skip
            if(item['f'].length && item['n'].length){
                continue;
            }


            table.fnAddData([
                item['nickname'],
                item['advertised_bandwidth'],
                item['last_restarted'],
                item['country'],
                item['flags'],
                item['or_addresses'],
                item['dir_address']
            ]);
        }
    }.observes('controller.content')
});

App.BridgeSummariesView = App.BaseSummariesView.extend({
    //templateName: 'bridgeSummaries',
    classNames: ['relay-summary-list'],

    dataChanged: function(){
        var content = this.get('controller.content');
        var table = this.get('dataTable');

        if(!table){
            console.error('table not initialized');
            return;
        }
        for(var i = 0, max = content.length; i < max; i++){
            var item = content[i];
            table.fnAddData([
                item['nickname'],
                item['advertised_bandwidth'],
                item['last_restarted'],
                item['country'],
                item['flags'],
                item['or_addresses'],
                item['dir_address']
            ]);
        }
    }.observes('controller.content')
});