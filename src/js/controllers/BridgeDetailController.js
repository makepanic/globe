/*global $, GLOBE, Em */
GLOBE.BridgeDetailController = Em.ObjectController.extend(
    Em.Evented,
    GLOBE.ContentReadyTriggerableMixin,
    GLOBE.PeriodsMixin, {
    bandwidthData: {},
    weightData: {},
    clientsData: {},
    uptimeDate: {},
    showContent: Em.computed.bool('content')
});