<p align="center">
  <img src="https://raw.github.com/makepanic/globe/master/res/others/logo-big.png" alt="globe"/>
</p>

JavaScript application to search and view details for Tor relays and bridges. All the data comes from the [Tor onionoo API](https://onionoo.torproject.org/). Uses [Ember.js](http://emberjs.com/) as JavaScript framework.
Inspired by the official [Tor Atlas](https://atlas.torproject.org/).

Tor Onionoo Search is not affiliated with the Tor project. "Tor" and the "Onion Logo" are registered trademarks of The Tor Project, Inc.

##Use the application [![Build Status](https://travis-ci.org/makepanic/globe.png?branch=master)](https://travis-ci.org/makepanic/globe)

To use a hosted version of Globe, [click here to open http://globe.rndm.de](http://globe.rndm.de/). 
If you want to build your own version take a look at the [grunt targets](#grunt-targets) section. 

If you can't or don't want to build the application on your own, you could download the latest archived relase from [the release page](https://github.com/makepanic/globe/releases).

##Features

- search for bridges or relays
- advanced search with country, running, flags and other filters
- details for a bridge or relay
- interactive graphs using dygraphs
- shareable links for searches or details

##License

Globe is open-sourced software licensed under the [MIT license](http://opensource.org/licenses/MIT)

Project | License
--- | ---
[Ember.js](http://emberjs.com/) | [MIT License](http://opensource.org/licenses/MIT)
[Pure](http://purecss.io/) | [Yahoo! Inc. BSD license](https://github.com/yui/pure/blob/master/LICENSE.md)
[Font Awesome - Font](http://purecss.io/) | [SIL OFL 1.1](http://scripts.sil.org/OFL)
[Font Awesome - SASS files](http://purecss.io/) | [MIT License](http://opensource.org/licenses/mit-license.html)
[Handlebars](http://handlebarsjs.com/) | [MIT License](http://opensource.org/licenses/MIT)
[dygraphs](http://dygraphs.com/) | [MIT License](http://opensource.org/licenses/MIT)
[moment](http://momentjs.com/) | [MIT License](http://opensource.org/licenses/MIT)
[jQuery](http://jquery.com/) | [MIT License](http://opensource.org/licenses/MIT)
[qTip2](http://qtip2.com/) | [MIT License](http://opensource.org/licenses/MIT)
[DataTables](https://datatables.net/) | [MIT license](http://opensource.org/licenses/MIT) [@](http://datatables.net/license_mit)
[jquery deparam](https://github.com/chrissrogers/jquery-deparam/blob/master/jquery-deparam.js) | none mentioned
[jsSHA](http://caligatio.github.io/jsSHA/) | [BSD license](https://github.com/Caligatio/jsSHA/blob/release-1.42/LICENSE)

##Installation

Globe is tested and build with nodejs (0.10.x). For an easy overview on how to install node on your distribution look at
[Installing Node.js via package manager](https://github.com/joyent/node/wiki/Installing-Node.js-via-package-manager).

To make it easier for you to build globe we provide a [vagrant](http://www.vagrantup.com/) project that bootstraps an ubuntu (12.04) virtual machine
with everything necessary for developing and building globe.
More information are available at [github.com/makepanic/globe-vagrant](https://github.com/makepanic/globe-vagrant).

###Summary:

1. `npm install`
2. `grunt`
3. `node app.js`

###Explanation

1. First you need all the npm dependencies. Run `npm install`.

2. Now you're ready to build the application and start the server. Call `grunt` and wait for it to complete the build process. Grunt precompiles the handlebars templates, combines all the different JavaScript and CSS files and minifies them. This can take a while depending on your computer.

3. If it's done start the server using `node app.js`. This will start a simple [express.js](http://expressjs.com/) server that handles the requests.

If you only want to get the required html, JavaScript and CSS files see the __Standalone grunt target__ below.

###grunt targets

#####Development target - `grunt dev`

- useful for local development
- uses not minified js and css
- uses grunt watch to update code changes

#####Standalone target - `grunt standalone`

- useful to create a minified version that is easy to deploy to your server
- minifies all the js and css files
- creates a `/build` folder that has all the required resources
- used to build the resources for the running application

#####Standalone target with archive - `grunt standalone-archive`

- same as `grunt standalone` but creates archive of the build directory
- used for to create release files on github

#####Standalone target with archive - `grunt ci`

- same targets as `grunt standalone` with additional testing of the generated files using [karma](http://karma-runner.github.io/)
- used for travis continuous integration

#####Default target - `grunt`

- same as `standalone` except it won't create a build folder with all the ressources

