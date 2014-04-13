module("ticket 11428 tests");

test('checks if a bandwidth response works without read_history and write_history fields', function () {
    var response = {
        "relays_published":"2014-04-13 12:00:00",
        "relays":[
            {
                "fingerprint":"0000000000000000000000000000000000000000"
            }
        ],
        "bridges_published":"2014-04-13 12:00:00",
        "bridges":[]
    };

    var processedResponse = GLOBE.Util.processHistoryResponse({
        readHistory: 'read_history',
        writeHistory: 'write_history'
    }, response);
    equal(Object.keys(processedResponse.relays.history.readHistory), 0, 'has empty readHistory object');
    equal(Object.keys(processedResponse.relays.history.writeHistory), 0, 'has empty writeHistory object');
    equal(processedResponse.relays.periods.length, 0, 'has empty periods array');
});
test('checks if a bridge uptime response works without uptime fields', function () {
    var response = {
        "relays_published":"2014-04-13 16:00:00",
        "relays":[],
        "bridges_published":"2014-04-13 15:37:06",
        "bridges":[{
            "fingerprint":"0BA0D0F7E2527CC107D63EFAF67FE0D9CAB881F5"
        }]};

    var processedResponse = GLOBE.Util.compute3DaysHistory(GLOBE.Util.processHistoryResponse({
        uptime: 'uptime'
    }, response));

    equal(Object.keys(processedResponse.bridges.history.uptime), 0, 'has empty uptime object');
    equal(processedResponse.bridges.periods.length, 0, 'has empty periods array');
});