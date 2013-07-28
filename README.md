<p align="center">
  <img src="https://raw.github.com/makepanic/globe/master/misc/logo-big.png" alt="globe"/>
</p>

JavaScript application to search and view details for Tor relays and bridges. All the data comes from the [Tor onionoo API](https://onionoo.torproject.org/). Uses [Ember.js](http://emberjs.com/) as JavaScript framework.
Inspired by the official [Tor Atlas](https://atlas.torproject.org/).

Tor Onionoo Search is not affiliated with the Tor project. "Tor" and the "Onion Logo" are registered trademarks of The Tor Project, Inc.

##Use the application

To use a hosted version of Globe, [click here to open http://globe.rndm.de](http://globe.rndm.de/). If you want to build your own version take a look at the [grunt targets](#grunt-targets) section.

##Features

- search for bridges or relays
- advanced search with country, running, flags and other filters
- details for a bridge or relay
- interactive graphs using dygraphs
- shareable links for searches or details

##License

Globe is open-sourced software licensed under the [MIT license](http://opensource.org/licenses/MIT)

- Entypo pictograms by Daniel Bruce - www.entypo.com
  - The Entypo pictograms are licensed under [CC BY 3.0](http://creativecommons.org/licenses/by-sa/3.0/) and the font under [SIL Open Font License](http://scripts.sil.org/cms/scripts/page.php?site_id=nrsi&id=OFL)

- Foundation css framework by ZURB - http://foundation.zurb.com/
  - licensed under [MIT License](http://opensource.org/licenses/MIT)

- Handlebars js templating library - http://handlebarsjs.com/
  - licensed under [MIT License](http://opensource.org/licenses/MIT)

- dygraphs JavaScript Visualization Library - http://dygraphs.com/
  - licensed under [MIT License](http://opensource.org/licenses/MIT)

- jQuery - http://jquery.com/
  - licensed under [MIT License](http://opensource.org/licenses/MIT)

- DataTables - https://datatables.net/
  - licensed under [MIT license](http://opensource.org/licenses/MIT) [@](http://datatables.net/license_mit)

- jquery deparam - https://github.com/chrissrogers/jquery-deparam

##Installation

###Summary:

1. `npm install`
2. `npm install grunt-ember-templates@0.4.9 --save-dev`
3. `grunt`
4. `node app.js`

###Explanation

1. First you need all the npm dependencies. Run `npm install`.

2. __You need to downgrade__ grunt-ember-templates because it is currently incompatible with the used handlebars version. Run `npm install grunt-ember-templates@0.4.9 --save-dev`.

3. Now you're ready to build the application and start the server. Call `grunt` and wait for it to complete the build process. Grunt prerenders the handlebars templates, combines all the different JavaScript and CSS files and minifies them. This can take a while depending on your computer.

4. If it's done start the server using `node app.js`. This will start a simple [express.js](http://expressjs.com/) server that handles the requests.

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

#####Default target - `grunt`

- same as `standalone` except it won't create a build folder with all the ressources

