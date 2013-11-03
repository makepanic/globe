/*global $, GLOBE, Ember */
GLOBE.RelayDetailController = Ember.ObjectController.extend({
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
        },
        visitFamilyMember: function (what) {
            var fingerprint = GLOBE.Formatter.familyToFingerprint(what);

            if (fingerprint.length) {
                this.transitionToRoute('relayDetail', fingerprint);
            }
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
            title = 'Details for ' + nickname + ' | Relay';

        }

        GLOBE.set('title', title);

    }.observes('content')

});