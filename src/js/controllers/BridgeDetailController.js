/*global $, GLOBE, Ember */
GLOBE.BridgeDetailController = Ember.ObjectController.extend({
    bandwidthData: {},
    weightData: {},
    content: {},
    showContent: false,

    explain: {
        flags: false
    },

    actions: {
        /**
         * toggles explainFlags property
         */
        toggleExplain: function (what) {
            this.toggleProperty('explain.' + what);
        }
    },

    contentChanged: function(){

        var content = this.get('content'),
            title = '';

        if($.isEmptyObject(content)){

            this.set('showContent', false);
            title = GLOBE.static.messages.detailsNotFound;

        }else{

            this.set('showContent', true);
            var nickname = content.nickname;
            title = 'Details for ' + nickname + ' | Bridge';

        }

        GLOBE.set('title', title);


    }.observes('content')

});