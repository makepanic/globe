
var GLOBE = Ember.Application.create();

// @if NODE_ENV == 'TESTING'
if($.isFunction(window.prepareForTesting)){
    prepareForTesting(GLOBE);
}
// @endif

// create Ember application with some extra methods
GLOBE = GLOBE.reopen({

    // <head> content
    title: '',

    // message for website message div area
    message: '',

    // loading is for open async requests for loadingIndicator
    loading: 0,

    // application alert
    alert: Ember.Object.create({
        search: null
    }),

    titleChanged: function(){

        var title = this.get('title');
        var suffix = GLOBE.static.titleSuffix + ' ' + GLOBE.static.version;

        if(title.length){
            $(document).attr('title', title + ' | ' + suffix);
        }else{
            $(document).attr('title', suffix);
        }

    }.observes('title'),

    messageChanged: function(){

        var message = this.get('message');
        if(!message.length){
            this.set('message', GLOBE.static.welcomes[0|(Math.random() * GLOBE.static.welcomes.length)]);
        }

    }.observes('message'),

    setAlert: function(location, type, msg){
        if(this.get('alert').hasOwnProperty(location)){
            this.set('alert.' + location, Ember.Object.create({
                type: type,
                msg: msg
            }));
        }
    },
    clearAlert: function(location){
        if(this.get('alert').hasOwnProperty(location)){
            this.set('alert.' + location, null);
        }
    }
});

GLOBE.static = {
    browser: {
        isFirefox: function(){
            // @see http://stackoverflow.com/a/9851769
            return typeof InstallTrigger !== 'undefined';
        }
    },
    titleSuffix: 'Globe',
    version: '/* @echo VERSION */',

    numbers: {
        maxSearchResults: 50
    },
    messages: {
        dataEmpty: 'n/a',
        detailsNotFound: 'No details found.'
    },
    welcomes: [
        'welkom',
        'مُرَحَّب بِه، مُحْتَفى بِه',
        'добре дошъл',
        'bem-vindo',
        'vítaný',
        'willkommen',
        'velkommen',
        'ευπρόσδεκτος',
        'bienvenido',
        'teretulnud',
        'خوش آمد',
        'tervetullut',
        'bienvenu',
        'רָצוּי',
        'dobrodošao',
        'szívesen látott',
        'disambut baik',
        'velkominn',
        'benvenuto',
        'laukiamas, mielas',
        'gaidīts; patīkams; vēlams',
        'dialu-alukan',
        'welkom',
        'velkommen',
        'mile widziany',
        'bem-vindo',
        'binevenit',
        'желанный',
        'vítaný',
        'dobrodošel',
        'dobrodošao',
        'välkommen',
        'hoşa giden, memnuniyet verici',
        'бажаний, приємний',
        'خوش آمدید',
        'chào mừng'
    ],
    icons: {
        'Fast': '&#9889;',
        'Running': '&#128361;',
        'BadExit': '&#128683;',
        'Authority': '&#9733;',
        'Guard': '&#59198;',
        'HSDir': '&#128213;',
        'Named': '&#8505;',
        'Stable': '&#128191;',
        'V2Dir': '&#128193;',
        'Valid': '&#10003;',
        'Unnamed': '&#10067;',
        'Exit': '&#59201;'
    },
    iconsArray: [],
    searchParams: {
        // Coming soon, for advanced search
        'type': ['relay', 'bridge'],
        'running': ['true', 'false']
    },
    countries:  {
        "ad" : "Andorra",
        "ae" : "United Arab Emirates",
        "af" : "Afghanistan",
        "ag" : "Antigua and Barbuda",
        "ai" : "Anguilla",
        "al" : "Albania",
        "am" : "Armenia",
        "an" : "Netherlands Antilles",
        "ao" : "Angola",
        "aq" : "Antarctica",
        "ar" : "Argentina",
        "as" : "American Samoa",
        "at" : "Austria",
        "au" : "Australia",
        "aw" : "Aruba",
        "ax" : "Aland Islands",
        "az" : "Azerbaijan",
        "ba" : "Bosnia and Herzegovina",
        "bb" : "Barbados",
        "bd" : "Bangladesh",
        "be" : "Belgium",
        "bf" : "Burkina Faso",
        "bg" : "Bulgaria",
        "bh" : "Bahrain",
        "bi" : "Burundi",
        "bj" : "Benin",
        "bl" : "Saint Bartelemey",
        "bm" : "Bermuda",
        "bn" : "Brunei",
        "bo" : "Bolivia",
        "br" : "Brazil",
        "bs" : "Bahamas",
        "bt" : "Bhutan",
        "bv" : "Bouvet Island",
        "bw" : "Botswana",
        "by" : "Belarus",
        "bz" : "Belize",
        "ca" : "Canada",
        "cc" : "Cocos (Keeling) Islands",
        "cd" : "Democratic Republic of the Congo",
        "cf" : "Central African Republic",
        "cg" : "Congo",
        "ch" : "Switzerland",
        "ci" : "Côte d'Ivoire",
        "ck" : "Cook Islands",
        "cl" : "Chile",
        "cm" : "Cameroon",
        "cn" : "China",
        "co" : "Colombia",
        "cr" : "Costa Rica",
        "cu" : "Cuba",
        "cv" : "Cape Verde",
        "cx" : "Christmas Island",
        "cy" : "Cyprus",
        "cz" : "Czech Republic",
        "de" : "Germany",
        "dj" : "Djibouti",
        "dk" : "Denmark",
        "dm" : "Dominica",
        "do" : "Dominican Republic",
        "dz" : "Algeria",
        "ec" : "Ecuador",
        "ee" : "Estonia",
        "eg" : "Egypt",
        "eh" : "Western Sahara",
        "er" : "Eritrea",
        "es" : "Spain",
        "et" : "Ethiopia",
        "fi" : "Finland",
        "fj" : "Fiji",
        "fk" : "Falkland Islands (Malvinas)",
        "fm" : "Federated States of Micronesia",
        "fo" : "Faroe Islands",
        "fr" : "France",
        "fx" : "Metropolitan France",
        "ga" : "Gabon",
        "gb" : "United Kingdom",
        "gd" : "Grenada",
        "ge" : "Georgia",
        "gf" : "French Guiana",
        "gg" : "Guernsey",
        "gh" : "Ghana",
        "gi" : "Gibraltar",
        "gl" : "Greenland",
        "gm" : "Gambia",
        "gn" : "Guinea",
        "gp" : "Guadeloupe",
        "gq" : "Equatorial Guinea",
        "gr" : "Greece",
        "gs" : "South Georgia and the South Sandwich Islands",
        "gt" : "Guatemala",
        "gu" : "Guam",
        "gw" : "Guinea-Bissau",
        "gy" : "Guyana",
        "hk" : "Hong Kong",
        "hm" : "Heard Island and McDonald Islands",
        "hn" : "Honduras",
        "hr" : "Croatia",
        "ht" : "Haiti",
        "hu" : "Hungary",
        "id" : "Indonesia",
        "ie" : "Ireland",
        "il" : "Israel",
        "im" : "Isle of Man",
        "in" : "India",
        "io" : "British Indian Ocean Territory",
        "iq" : "Iraq",
        "ir" : "Iran",
        "is" : "Iceland",
        "it" : "Italy",
        "je" : "Jersey",
        "jm" : "Jamaica",
        "jo" : "Jordan",
        "jp" : "Japan",
        "ke" : "Kenya",
        "kg" : "Kyrgyzstan",
        "kh" : "Cambodia",
        "ki" : "Kiribati",
        "km" : "Comoros",
        "kn" : "Saint Kitts and Nevis",
        "kp" : "North Korea",
        "kr" : "Republic of Korea",
        "kw" : "Kuwait",
        "ky" : "Cayman Islands",
        "kz" : "Kazakhstan",
        "la" : "Laos",
        "lb" : "Lebanon",
        "lc" : "Saint Lucia",
        "li" : "Liechtenstein",
        "lk" : "Sri Lanka",
        "lr" : "Liberia",
        "ls" : "Lesotho",
        "lt" : "Lithuania",
        "lu" : "Luxembourg",
        "lv" : "Latvia",
        "ly" : "Libya",
        "ma" : "Morocco",
        "mc" : "Monaco",
        "md" : "Republic of Moldova",
        "me" : "Montenegro",
        "mf" : "Saint Martin",
        "mg" : "Madagascar",
        "mh" : "Marshall Islands",
        "mk" : "Macedonia",
        "ml" : "Mali",
        "mm" : "Burma",
        "mn" : "Mongolia",
        "mo" : "Macau",
        "mp" : "Northern Mariana Islands",
        "mq" : "Martinique",
        "mr" : "Mauritania",
        "ms" : "Montserrat",
        "mt" : "Malta",
        "mu" : "Mauritius",
        "mv" : "Maldives",
        "mw" : "Malawi",
        "mx" : "Mexico",
        "my" : "Malaysia",
        "mz" : "Mozambique",
        "na" : "Namibia",
        "nc" : "New Caledonia",
        "ne" : "Niger",
        "nf" : "Norfolk Island",
        "ng" : "Nigeria",
        "ni" : "Nicaragua",
        "nl" : "Netherlands",
        "no" : "Norway",
        "np" : "Nepal",
        "nr" : "Nauru",
        "nu" : "Niue",
        "nz" : "New Zealand",
        "om" : "Oman",
        "pa" : "Panama",
        "pe" : "Peru",
        "pf" : "French Polynesia",
        "pg" : "Papua New Guinea",
        "ph" : "Philippines",
        "pk" : "Pakistan",
        "pl" : "Poland",
        "pm" : "Saint Pierre and Miquelon",
        "pn" : "Pitcairn Islands",
        "pr" : "Puerto Rico",
        "ps" : "Palestinian Territory",
        "pt" : "Portugal",
        "pw" : "Palau",
        "py" : "Paraguay",
        "qa" : "Qatar",
        "re" : "Reunion",
        "ro" : "Romania",
        "rs" : "Serbia",
        "ru" : "Russia",
        "rw" : "Rwanda",
        "sa" : "Saudi Arabia",
        "sb" : "Solomon Islands",
        "sc" : "Seychelles",
        "sd" : "Sudan",
        "se" : "Sweden",
        "sg" : "Singapore",
        "sh" : "Saint Helena",
        "si" : "Slovenia",
        "sj" : "Svalbard and Jan Mayen",
        "sk" : "Slovakia",
        "sl" : "Sierra Leone",
        "sm" : "San Marino",
        "sn" : "Senegal",
        "so" : "Somalia",
        "sr" : "Suriname",
        "st" : "São Tomé and Príncipe",
        "sv" : "El Salvador",
        "sy" : "Syrian Arab Republic",
        "sz" : "Swaziland",
        "tc" : "Turks and Caicos Islands",
        "td" : "Chad",
        "tf" : "French Southern Territories",
        "tg" : "Togo",
        "th" : "Thailand",
        "tj" : "Tajikistan",
        "tk" : "Tokelau",
        "tl" : "East Timor",
        "tm" : "Turkmenistan",
        "tn" : "Tunisia",
        "to" : "Tonga",
        "tr" : "Turkey",
        "tt" : "Trinidad and Tobago",
        "tv" : "Tuvalu",
        "tw" : "Taiwan",
        "tz" : "United Republic of Tanzania",
        "ua" : "Ukraine",
        "ug" : "Uganda",
        "um" : "United States Minor Outlying Islands",
        "us" : "United States",
        "uy" : "Uruguay",
        "uz" : "Uzbekistan",
        "va" : "Vatican City",
        "vc" : "Saint Vincent and the Grenadines",
        "ve" : "Venezuela",
        "vg" : "British Virgin Islands",
        "vi" : "United States Virgin Islands",
        "vn" : "Vietnam",
        "vu" : "Vanuatu",
        "wf" : "Wallis and Futuna",
        "ws" : "Samoa",
        "ye" : "Yemen",
        "yt" : "Mayotte",
        "za" : "South Africa",
        "zm" : "Zambia",
        "zw" : "Zimbabwe"
    },
    countriesArray: []
};

GLOBE.static.messages.specifyYourSearch = 'To avoid too many requests, we limit our results to ' + GLOBE.static.numbers.maxSearchResults + ' items. If you want better results, try to use a search word or apply some filters.';

GLOBE.set('message', GLOBE.static.welcomes[0|(Math.random() * GLOBE.static.welcomes.length)]);

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


// datatables flag sort (sorting by number of flags)
var flagRegex = /title="[a-zA-Z]+"/g;
jQuery.fn.dataTableExt.oSort['flag-asc']  = function(x,y) {
    var xMatch = x.match(flagRegex),
        yMatch = y.match(flagRegex);

    return xMatch.length > yMatch.length ? 1 : xMatch.length < yMatch.length ? -1 : 0;
};
jQuery.fn.dataTableExt.oSort['flag-desc']  = function(x,y) {
    var xMatch = x.match(flagRegex),
        yMatch = y.match(flagRegex);

    return xMatch.length > yMatch.length ? -1 : xMatch.length < yMatch.length ? 1 : 0;
};
// datatabled port sort (check if .dataEmpty otherwhise compare integer values)
jQuery.fn.dataTableExt.oSort['port-desc']  = function(x,y) {
    if(x === GLOBE.static.messages.dataEmpty &&
        y !== GLOBE.static.messages.dataEmpty){
        return -1;
    }
    if(y === GLOBE.static.messages.dataEmpty &&
        y !== GLOBE.static.messages.dataEmpty){
        return 1;
    }
    if(x === y){
        return 0;
    }

    var xInt = parseInt(x, 10);
    var yInt = parseInt(y, 10);

    return xInt > yInt ? -1 : xInt < yInt ? 1 : 0;
};
jQuery.fn.dataTableExt.oSort['port-asc']  = function(x,y) {
    if(x === GLOBE.static.messages.dataEmpty &&
        y !== GLOBE.static.messages.dataEmpty){
        return 1;
    }
    if(y === GLOBE.static.messages.dataEmpty &&
        y !== GLOBE.static.messages.dataEmpty){
        return -1;
    }
    if(x === y){
        return 0;
    }

    var xInt = parseInt(x, 10);
    var yInt = parseInt(y, 10);

    return xInt > yInt ? 1 : xInt < yInt ? -1 : 0;
};

$(document).ready(function(){

    // initialize foundation for tooltips
    $(document).foundation();
});
