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

    /**
     * Function that is called if the controller content is changed.
     */
    contentChanged: function(){
        var content = this.get('content'),
            title = '';

        if($.isEmptyObject(content)){
            // content is empty, hide content
            this.set('showContent', false);
            title = GLOBE.static.messages.detailsNotFound;

        }else{
            // content not empty, show content
            this.set('showContent', true);
            title = 'Details for ' + content.nickname + ' | Bridge';

        }

        // set app title
        GLOBE.set('title', title);

    }.observes('content')

});