/*global $, prepareForTesting, Ember, Em, jQuery, InstallTrigger */
'use strict';

// create ember application and set namespace
var GLOBE = Ember.Application.create();

// @if NODE_ENV == 'TESTING'
if($.isFunction(window.prepareForTesting)){
    prepareForTesting(GLOBE);
}
// @endif

// @if NODE_ENV == 'DEVELOPMENT'
GLOBE.LOG_TRANSITIONS = true;
GLOBE.LOG_TRANSITIONS_INTERNAL = true;
GLOBE.LOG_VIEW_LOOKUPS = true;
// @endif

// create Ember application with some extra methods
GLOBE = GLOBE.reopen({

    // api baseurl
    api: 'https://onionoo.torproject.org',

    // model defaults
    defaults: [],

    // <title> content
    title: '',

    // loading is for open async requests for loadingIndicator
    loading: 0,

    // application alert
    alert: Em.Object.create({
        search: null
    }),

    // Event that observes GLOBE.title and changes the document title
    titleChanged: function(){

        var title = this.get('title');
        var suffix = GLOBE.static.titleSuffix + ' ' + GLOBE.static.version;

        if(title.length){
            $(document).attr('title', title + ' | ' + suffix);
        }else{
            $(document).attr('title', suffix);
        }

    }.observes('title'),

    /**
     * Sets a message for a specific alert
     * @param {String} location Alert storage location
     * @param {String} type Alert type
     * @param {String} msg Alert message
     * @return {void}
     */
    setAlert: function(location, type, msg){
        if(this.get('alert').hasOwnProperty(location)){
            this.set('alert.' + location, Em.Object.create({
                type: type,
                msg: msg
            }));
        }
    },
    /**
     * Clears a specific alert
     * @param {String} location Alert storage location
     * @return {void}
     */
    clearAlert: function(location){
        if(this.get('alert').hasOwnProperty(location)){
            this.set('alert.' + location, null);
        }
    }
});

GLOBE.static = {
    browser: {
        // check if the current browser is firefox
        isFirefox: function(){
            // @see http://stackoverflow.com/a/9851769
            return typeof InstallTrigger !== 'undefined';
        }
    },

    // qtip configuration
    qtipConf: {
        summary: {
            style: {
                classes: 'qtip-dark'
            },
            content: {
                attr: 'title'
            },
            overwrite: false
        },
        detail: {
            style: {
                classes: 'qtip-dark'
            },
            content: {
                attr: 'data-description',
                title: function() {
                    // Retrieve content from ALT attribute of the $('.selector') element
                    return this.attr('title');
                }
            },
            position: {
                my: 'top left',
                at: 'bottom left'
            }
        }
    },

    // suffix for <title>
    titleSuffix: 'Globe',

    // app version
    version: '/* @echo VERSION */',

    // global numbers
    numbers: {
        DAY: 86400000, // 60 * 60 * 24 * 1000
        WEEK: 604800000, // 60 * 60 * 24 * 7 * 1000
        maxSearchResults: 50,
        // for tab sorting
        '3_days': 1,
        '1_week': 2,
        '1_month': 3,
        '3_months': 4,
        '1_year': 5,
        '5_years': 6
    },

    // global strings
    messages: {
        '3_days': '3 days',
        '1_week': '1 week',
        '1_month': '1 month',
        '3_months': '3 months',
        '1_year': '1 year',
        '5_years': '5 years',

        dataEmpty: 'n/a',
        detailsNotFound: 'No details found.',

        // from atlas error message
        invalidSearchTerm: 'The API replied with an error to your query. This probably means that you did not properly format your query.'
    },

    periodObject: {
        '3_days': ['d', 3],
        '1_week': ['w', 1],
        '1_month': ['M', 1],
        '3_months': ['M', 3],
        '1_year': ['y', 1],
        '5_years': ['y', 5]
    },

    errors: {
        INVALID_SEARCH_TERM: 1
    },

    // map to convert given string to a character
    icons: {
        'Fast': 'fa-bolt',
        'Running': 'fa-code-fork',
        'BadExit': 'fa-warning',
        'Authority': 'fa-user-md',
        'Guard': 'fa-shield',
        'HSDir': 'fa-book',
        'Named': 'fa-info',
        'Stable': 'fa-anchor',
        'V2Dir': 'fa-folder',
        'Valid': 'fa-check',
        'Unnamed': 'fa-question',
        'Exit': 'fa-sign-out'
    },
    iconsArray: [],

    searchParams: {
        'type': ['relay', 'bridge'],
        'running': ['true', 'false']
    },

    // list of countries with their full name
    countries:  {
        'ad' : 'Andorra',
        'ae' : 'United Arab Emirates',
        'af' : 'Afghanistan',
        'ag' : 'Antigua and Barbuda',
        'ai' : 'Anguilla',
        'al' : 'Albania',
        'am' : 'Armenia',
        'an' : 'Netherlands Antilles',
        'ao' : 'Angola',
        'aq' : 'Antarctica',
        'ar' : 'Argentina',
        'as' : 'American Samoa',
        'at' : 'Austria',
        'au' : 'Australia',
        'aw' : 'Aruba',
        'ax' : 'Aland Islands',
        'az' : 'Azerbaijan',
        'ba' : 'Bosnia and Herzegovina',
        'bb' : 'Barbados',
        'bd' : 'Bangladesh',
        'be' : 'Belgium',
        'bf' : 'Burkina Faso',
        'bg' : 'Bulgaria',
        'bh' : 'Bahrain',
        'bi' : 'Burundi',
        'bj' : 'Benin',
        'bl' : 'Saint Bartelemey',
        'bm' : 'Bermuda',
        'bn' : 'Brunei',
        'bo' : 'Bolivia',
        'br' : 'Brazil',
        'bs' : 'Bahamas',
        'bt' : 'Bhutan',
        'bv' : 'Bouvet Island',
        'bw' : 'Botswana',
        'by' : 'Belarus',
        'bz' : 'Belize',
        'ca' : 'Canada',
        'cc' : 'Cocos (Keeling) Islands',
        'cd' : 'Democratic Republic of the Congo',
        'cf' : 'Central African Republic',
        'cg' : 'Congo',
        'ch' : 'Switzerland',
        'ci' : 'Côte d Ivoire',
        'ck' : 'Cook Islands',
        'cl' : 'Chile',
        'cm' : 'Cameroon',
        'cn' : 'China',
        'co' : 'Colombia',
        'cr' : 'Costa Rica',
        'cu' : 'Cuba',
        'cv' : 'Cape Verde',
        'cx' : 'Christmas Island',
        'cy' : 'Cyprus',
        'cz' : 'Czech Republic',
        'de' : 'Germany',
        'dj' : 'Djibouti',
        'dk' : 'Denmark',
        'dm' : 'Dominica',
        'do' : 'Dominican Republic',
        'dz' : 'Algeria',
        'ec' : 'Ecuador',
        'ee' : 'Estonia',
        'eg' : 'Egypt',
        'eh' : 'Western Sahara',
        'er' : 'Eritrea',
        'es' : 'Spain',
        'et' : 'Ethiopia',
        'fi' : 'Finland',
        'fj' : 'Fiji',
        'fk' : 'Falkland Islands (Malvinas)',
        'fm' : 'Federated States of Micronesia',
        'fo' : 'Faroe Islands',
        'fr' : 'France',
        'fx' : 'Metropolitan France',
        'ga' : 'Gabon',
        'gb' : 'United Kingdom',
        'gd' : 'Grenada',
        'ge' : 'Georgia',
        'gf' : 'French Guiana',
        'gg' : 'Guernsey',
        'gh' : 'Ghana',
        'gi' : 'Gibraltar',
        'gl' : 'Greenland',
        'gm' : 'Gambia',
        'gn' : 'Guinea',
        'gp' : 'Guadeloupe',
        'gq' : 'Equatorial Guinea',
        'gr' : 'Greece',
        'gs' : 'South Georgia and the South Sandwich Islands',
        'gt' : 'Guatemala',
        'gu' : 'Guam',
        'gw' : 'Guinea-Bissau',
        'gy' : 'Guyana',
        'hk' : 'Hong Kong',
        'hm' : 'Heard Island and McDonald Islands',
        'hn' : 'Honduras',
        'hr' : 'Croatia',
        'ht' : 'Haiti',
        'hu' : 'Hungary',
        'id' : 'Indonesia',
        'ie' : 'Ireland',
        'il' : 'Israel',
        'im' : 'Isle of Man',
        'in' : 'India',
        'io' : 'British Indian Ocean Territory',
        'iq' : 'Iraq',
        'ir' : 'Iran',
        'is' : 'Iceland',
        'it' : 'Italy',
        'je' : 'Jersey',
        'jm' : 'Jamaica',
        'jo' : 'Jordan',
        'jp' : 'Japan',
        'ke' : 'Kenya',
        'kg' : 'Kyrgyzstan',
        'kh' : 'Cambodia',
        'ki' : 'Kiribati',
        'km' : 'Comoros',
        'kn' : 'Saint Kitts and Nevis',
        'kp' : 'North Korea',
        'kr' : 'Republic of Korea',
        'kw' : 'Kuwait',
        'ky' : 'Cayman Islands',
        'kz' : 'Kazakhstan',
        'la' : 'Laos',
        'lb' : 'Lebanon',
        'lc' : 'Saint Lucia',
        'li' : 'Liechtenstein',
        'lk' : 'Sri Lanka',
        'lr' : 'Liberia',
        'ls' : 'Lesotho',
        'lt' : 'Lithuania',
        'lu' : 'Luxembourg',
        'lv' : 'Latvia',
        'ly' : 'Libya',
        'ma' : 'Morocco',
        'mc' : 'Monaco',
        'md' : 'Republic of Moldova',
        'me' : 'Montenegro',
        'mf' : 'Saint Martin',
        'mg' : 'Madagascar',
        'mh' : 'Marshall Islands',
        'mk' : 'Macedonia',
        'ml' : 'Mali',
        'mm' : 'Burma',
        'mn' : 'Mongolia',
        'mo' : 'Macau',
        'mp' : 'Northern Mariana Islands',
        'mq' : 'Martinique',
        'mr' : 'Mauritania',
        'ms' : 'Montserrat',
        'mt' : 'Malta',
        'mu' : 'Mauritius',
        'mv' : 'Maldives',
        'mw' : 'Malawi',
        'mx' : 'Mexico',
        'my' : 'Malaysia',
        'mz' : 'Mozambique',
        'na' : 'Namibia',
        'nc' : 'New Caledonia',
        'ne' : 'Niger',
        'nf' : 'Norfolk Island',
        'ng' : 'Nigeria',
        'ni' : 'Nicaragua',
        'nl' : 'Netherlands',
        'no' : 'Norway',
        'np' : 'Nepal',
        'nr' : 'Nauru',
        'nu' : 'Niue',
        'nz' : 'New Zealand',
        'om' : 'Oman',
        'pa' : 'Panama',
        'pe' : 'Peru',
        'pf' : 'French Polynesia',
        'pg' : 'Papua New Guinea',
        'ph' : 'Philippines',
        'pk' : 'Pakistan',
        'pl' : 'Poland',
        'pm' : 'Saint Pierre and Miquelon',
        'pn' : 'Pitcairn Islands',
        'pr' : 'Puerto Rico',
        'ps' : 'Palestinian Territory',
        'pt' : 'Portugal',
        'pw' : 'Palau',
        'py' : 'Paraguay',
        'qa' : 'Qatar',
        're' : 'Reunion',
        'ro' : 'Romania',
        'rs' : 'Serbia',
        'ru' : 'Russia',
        'rw' : 'Rwanda',
        'sa' : 'Saudi Arabia',
        'sb' : 'Solomon Islands',
        'sc' : 'Seychelles',
        'sd' : 'Sudan',
        'se' : 'Sweden',
        'sg' : 'Singapore',
        'sh' : 'Saint Helena',
        'si' : 'Slovenia',
        'sj' : 'Svalbard and Jan Mayen',
        'sk' : 'Slovakia',
        'sl' : 'Sierra Leone',
        'sm' : 'San Marino',
        'sn' : 'Senegal',
        'so' : 'Somalia',
        'sr' : 'Suriname',
        'st' : 'São Tomé and Príncipe',
        'sv' : 'El Salvador',
        'sy' : 'Syrian Arab Republic',
        'sz' : 'Swaziland',
        'tc' : 'Turks and Caicos Islands',
        'td' : 'Chad',
        'tf' : 'French Southern Territories',
        'tg' : 'Togo',
        'th' : 'Thailand',
        'tj' : 'Tajikistan',
        'tk' : 'Tokelau',
        'tl' : 'East Timor',
        'tm' : 'Turkmenistan',
        'tn' : 'Tunisia',
        'to' : 'Tonga',
        'tr' : 'Turkey',
        'tt' : 'Trinidad and Tobago',
        'tv' : 'Tuvalu',
        'tw' : 'Taiwan',
        'tz' : 'United Republic of Tanzania',
        'ua' : 'Ukraine',
        'ug' : 'Uganda',
        'um' : 'United States Minor Outlying Islands',
        'us' : 'United States',
        'uy' : 'Uruguay',
        'uz' : 'Uzbekistan',
        'va' : 'Vatican City',
        'vc' : 'Saint Vincent and the Grenadines',
        've' : 'Venezuela',
        'vg' : 'British Virgin Islands',
        'vi' : 'United States Virgin Islands',
        'vn' : 'Vietnam',
        'vu' : 'Vanuatu',
        'wf' : 'Wallis and Futuna',
        'ws' : 'Samoa',
        'ye' : 'Yemen',
        'yt' : 'Mayotte',
        'za' : 'South Africa',
        'zm' : 'Zambia',
        'zw' : 'Zimbabwe'
    },
    countriesArray: []
};

// build string for messages.specifyYourSearch
GLOBE.static.messages.specifyYourSearch = 'To avoid too many requests, we limit our results to ' + GLOBE.static.numbers.maxSearchResults + ' items. If you want better results, try to use a search word or apply some filters.';


// fill flag array
for(var icon in GLOBE.static.icons){
    if(GLOBE.static.icons.hasOwnProperty(icon)){
        GLOBE.static.iconsArray.push({
            key: icon,
            value: GLOBE.static.icons[icon]
        });
    }
}

// fill countries array
for(var country in GLOBE.static.countries){
    if(GLOBE.static.countries.hasOwnProperty(country)){
        GLOBE.static.countriesArray.push({
            key: country,
            value: GLOBE.static.countries[country]
        });
    }
}
// sort by country names
GLOBE.static.countriesArray.sort(function(a, b){
    // is a less than b ? -1 else if a greater than b ? 1 otherwise 0 (a==b)
    return a.value < b.value ? -1 : a.value > b.value ? 1 : 0;
});

// datatables flag sort asc (sorting by length of flag array)
jQuery.fn.dataTableExt.oSort['flag-asc']  = function(x,y) {
    return x.length > y.length ? 1 : x.length < y.length ? -1 : 0;
};

// datatables flag sort desc
jQuery.fn.dataTableExt.oSort['flag-desc']  = function(x,y) {
    return x.length > y.length ? -1 : x.length < y.length ? 1 : 0;
};

// datatabled port sort (check if .dataEmpty otherwhise compare integer values)
jQuery.fn.dataTableExt.oSort['port-desc']  = function(x,y) {
    var xInt,
        yInt;

    x = GLOBE.Formatter.extractPort(x);
    y = GLOBE.Formatter.extractPort(y);

    if(x === GLOBE.static.messages.dataEmpty &&
        y !== GLOBE.static.messages.dataEmpty){
        return -1;
    }
    if(y === GLOBE.static.messages.dataEmpty &&
        x !== GLOBE.static.messages.dataEmpty){
        return 1;
    }
    if(x === y){
        return 0;
    }

    xInt = parseInt(x, 10);
    yInt = parseInt(y, 10);

    return xInt > yInt ? -1 : xInt < yInt ? 1 : 0;
};
jQuery.fn.dataTableExt.oSort['port-asc']  = function(x,y) {
    var xInt,
        yInt;

    x = GLOBE.Formatter.extractPort(x);
    y = GLOBE.Formatter.extractPort(y);

    if(x === GLOBE.static.messages.dataEmpty &&
        y !== GLOBE.static.messages.dataEmpty){
        return 1;
    }
    if(y === GLOBE.static.messages.dataEmpty &&
        x !== GLOBE.static.messages.dataEmpty){
        return -1;
    }
    if(x === y){
        return 0;
    }

    xInt = parseInt(x, 10);
    yInt = parseInt(y, 10);

    return xInt > yInt ? 1 : xInt < yInt ? -1 : 0;
};

GLOBE.TextField = Em.TextField.extend({
    attributeBindings: ['accept', 'autocomplete', 'autofocus', 'name', 'required']
});