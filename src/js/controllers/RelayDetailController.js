/*global $, GLOBE, Em */
GLOBE.RelayDetailController = Em.ObjectController.extend(
    GLOBE.PeriodsMixin, {

    bandwidthData: {},
    weightData: {},
    uptimeData: {},
    showContent: Em.computed.bool('content'),

    actions: {
        visitFamilyMember: function (what) {
            var fingerprint = GLOBE.Formatter.familyToFingerprint(what);

            if (fingerprint.length) {
                this.transitionToRoute('relayDetail', fingerprint);
            }
        }
    }
});