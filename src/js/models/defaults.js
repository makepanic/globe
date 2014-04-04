/*global GLOBE */
/*eslint camelcase: 0 */

/**
 * default bridge detail object
 * @see {@link https://onionoo.torproject.org/#details}
 * @type {{nickname: string, hashed_fingerprint: string, or_addresses: Array, last_seen: string, first_seen: string, running: null, flags: string, last_restarted: string, advertised_bandwidth: number, platform: string, pool_assignment: string}}
 */
GLOBE.defaults.OnionooBridgeDetail = {
    nickname: 'Unnamed',
    hashed_fingerprint: '',
    or_addresses: [],
    last_seen: '',
    first_seen: '',
    running: null,
    flags: '',
    last_restarted: '',
    advertised_bandwidth: -1,
    platform: '',
    pool_assignment: ''
};

/**
 * default relay detail object
 * @see {@link https://onionoo.torproject.org/#details}
 * @type {{nickname: string, fingerprint: string, hashed_fingerprint: string, or_addresses: Array, exit_addresses: Array, dir_address: string, last_seen: string, last_changed_address_or_port: string, first_seen: string, running: null, flags: Array, country: string, country_name: string, region_name: string, city_name: string, latitude: number, longitude: number, as_number: string, as_name: string, consensus_weight: number, host_name: string, last_restarted: string, bandwidth_rate: number, bandwidth_burst: number, observed_bandwidth: number, advertised_bandwidth: number, exit_policy: Array, exit_policy_summary: Array, contact: string, platform: string, family: Array, advertised_bandwidth_fraction: number, consensus_weight_fraction: number, guard_probability: number, middle_probability: number, exit_probability: number}}
 */
GLOBE.defaults.OnionooRelayDetail = {
    nickname: 'Unnamed',
    fingerprint: '',
    hashed_fingerprint: '',
    or_addresses: [],
    exit_addresses: [],
    dir_address: '',
    last_seen: '',
    last_changed_address_or_port: '',
    first_seen: '',
    running: null,
    flags: [],
    country: '',
    country_name: '',
    region_name: '',
    city_name: '',

    latitude: -1,
    longitude: -1,

    as_number: '',
    as_name: '',
    consensus_weight: -1,
    host_name: '',
    last_restarted: '',
    bandwidth_rate: -1,
    bandwidth_burst: -1,
    observed_bandwidth: -1,
    advertised_bandwidth: -1,
    exit_policy: [],
    exit_policy_summary: [],
    contact: '',
    platform: '',
    family: [],
    advertised_bandwidth_fraction: -1,
    consensus_weight_fraction: -1,
    guard_probability: -1,
    middle_probability: -1,
    exit_probability: -1
};

/**
 * default weights object
 * @see {@link https://onionoo.torproject.org/#weights}
 * @type {{first: string, last: string, interval: number, factor: number, count: number, values: Array}}
 */
GLOBE.defaults.History = {
    first: '1970-01-01 01:00:00',
    last: '1970-01-01 01:00:00',
    interval: 1,
    factor: 1,
    count: 0,
    values: []
};