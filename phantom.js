var sys = require('system'),
	page = require('webpage').create(),
	url = 'http://localhost:3000';

if (sys.args.length > 1) {
	url += sys.args[1];
}

page.customHeaders = {'x-phantom': true};
page.viewportSize = { width: 1024, height: 800 };

page.open( url, function ( status ) {
	if ( status !== 'success' ) {
		phantom.exit(1);
	} else {
		var html = page.evaluate(function () {
            return document.getElementById('ember259').outerHTML;
		});
		console.log( html );
		phantom.exit(0);
	}
});