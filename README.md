#ember-tor-onionoo

JacaScript application to explore and use the Tor onionoo API. Uses [Ember.js](http://emberjs.com/) as JavaScript framework.

Inspired by the official [Tor Atlas](https://atlas.torproject.org/).

Tor Onionoo Search is not affiliated with the Tor project. "Tor" and the "Onion Logo" are registered trademarks of The Tor Project, Inc.

##Demo

The application is hosted on the `gh-pages` branch of this repository. [http://makepanic.github.io/emberjs-tor-onionoo/](Click here to open the standalone application).

##License

ember-tor-onionoo is open-sourced software licensed under the [MIT license](http://opensource.org/licenses/MIT)

- Entypo pictograms by Daniel Bruce - www.entypo.com
  - The Entypo pictograms are licensed under [CC BY 3.0](http://creativecommons.org/licenses/by-sa/3.0/) and the font under [SIL Open Font License](http://scripts.sil.org/cms/scripts/page.php?site_id=nrsi&id=OFL)

- Foundation css framework by ZURB - http://foundation.zurb.com/
  - licensed under [MIT License](http://opensource.org/licenses/MIT)

- Handlebars js templating library - http://handlebarsjs.com/
  - licensed under [MIT License](http://opensource.org/licenses/MIT)

- D3.js - Data-Driven Documents - http://d3js.org/
  - licensed under [BSD 3 License](http://opensource.org/licenses/BSD-3-Clause)

- jQuery - http://jquery.com/
  - licensed under [MIT License](http://opensource.org/licenses/MIT)

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
- creates a `/build` folder that has all the required ressources

#####Default target - `grunt`

- same as `standalone` except it won't create a build folder with all the ressources

