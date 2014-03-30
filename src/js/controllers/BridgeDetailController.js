/*global $, GLOBE, Em */
GLOBE.BridgeDetailController = Em.ObjectController.extend({
    bandwidthData: {},
    weightData: {},
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
        }
    }
});