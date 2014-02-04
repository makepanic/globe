
/**
 * Module dependencies.
 */

var express = require('express')
  , cons = require('consolidate')
  , cp = require('child_process')
  , path = require('path');

var app = express();


var distDir = '/build/dist/';
// all express settings
app.set('port', process.env.PORT || 3000);
app.engine('html', cons.handlebars);
app.set('view engine', 'html');
app.set('views', path.join(__dirname, distDir));
app.use(express.favicon(path.join(__dirname, distDir, 'favicon.ico')));
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, distDir)));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

function render(err, res, html) {
    res.render('index', {
        html: html
    });
}

app.get(/^\/($|top10|code|search|help|relay)/, function(req, res){
    if (req.headers['x-phantom']) {
       render(null, res, null);
       return;
    }
    var args = [
        path.join(__dirname, 'phantom.js'),
        req.path
    ];
    cp.execFile('phantomjs', args, function(err, stdout, stderr) {
        render(err, res, stdout);
    });
});

app.listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
