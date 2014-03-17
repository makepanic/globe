/*global $, GLOBE, Em */
GLOBE.RelayDetailController = Em.ObjectController.extend({
    bandwidthData: {},
    weightData: {},
    content: {},
    showContent: false,

    explain: {
        flags: false
    },
    extended: {
        bandwidth: false
    },

    actions: {
        /**
         * toggles explainFlags property
         */
        toggleExplain: function (what) {
            this.toggleProperty('explain.' + what);
        },
        visitFamilyMember: function (what) {
            var fingerprint = GLOBE.Formatter.familyToFingerprint(what);

            if (fingerprint.length) {
                this.transitionToRoute('relayDetail', fingerprint);
            }
        },
        toggleExtendedBandwidth: function(){
            this.toggleProperty('extended.bandwidth');
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
            // content not empty, show contnet
            this.set('showContent', true);
            title = 'Details for ' + content.nickname + ' | Relay';
        }

        GLOBE.set('title', title);

    }.observes('content')

});