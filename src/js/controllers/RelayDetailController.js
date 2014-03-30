/*global $, GLOBE, Em */
GLOBE.RelayDetailController = Em.ObjectController.extend({
    bandwidthData: {},
    weightData: {},
    uptimeData: {},
    showContent: Em.computed.bool('content'),

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
    }
});