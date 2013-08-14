
GLOBE.RelayDetailController = Ember.ObjectController.extend({
    bandwidthData: {},
    weightData: {},
    content: {},
    showContent: false,

    contentChanged: function(){

        var content = this.get('content'),
            message = '',
            title = '';

        if($.isEmptyObject(content)){

            this.set('showContent', false);
            title = GLOBE.static.messages.detailsNotFound;
            message = GLOBE.static.messages.detailsNotFound;

        }else{

            this.set('showContent', true);
            var nickname = content.nickname;
            title = 'Details for ' + nickname + ' | Relay';
            message = '<span class="subtle">details for</span> <strong>' + nickname +'</strong>';

        }

        GLOBE.set('title', title);
        GLOBE.set('message', message);


    }.observes('content')

});