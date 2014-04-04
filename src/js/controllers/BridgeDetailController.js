/*global $, GLOBE, Em */
GLOBE.BridgeDetailController = Em.ObjectController.extend(
    GLOBE.PeriodsMixin, {
    bandwidthData: {},
    weightData: {},
    clientsData: {},
    uptimeDate: {},
    showContent: Em.computed.bool('content')
});