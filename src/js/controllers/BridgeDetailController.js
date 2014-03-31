/*global $, GLOBE, Em */
GLOBE.BridgeDetailController = Em.ObjectController.extend(
    GLOBE.PeriodsMixin, {

    clientsData: {},
    bandwidthData: {},
    uptimeData: {},
    showContent: Em.computed.bool('content'),

    periodsShouldBeUpdated: function(){
        this.updatePeriods([
            'bandwidthData',
            'uptimeData',
            'clientsData'
        ]);
    }.observes(
        'bandwidthData',
        'uptimeData',
        'clientsData'
    )
});