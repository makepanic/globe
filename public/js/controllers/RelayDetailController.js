
App.RelayDetailController = Ember.ObjectController.extend({
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
            title = App.static.messages.detailsNotFound;
            message = App.static.messages.detailsNotFound;

        }else{

            this.set('showContent', true);
            var nickname = content.nickname;
            title = 'Details for ' + nickname;
            message = '<span class="subtle">details for</span> <strong>' + nickname +'</strong>';

        }

        App.set('title', title);
        App.set('message', message);


    }.observes('content')

});