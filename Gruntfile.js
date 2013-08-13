module.exports = function(grunt) {

    // general paths
    var resPath = 'res/',
        srcPath = 'src/',
        buildPath = 'build/',
        testPath = 'test/',
        tmpPath = buildPath + 'tmp/',
        releasePath = buildPath + 'release/',
        distPath = buildPath + 'dist/';

    // Default task(s).
    var cleanBuild = ['clean:build'];
    var defaultTasks = ['env:dev', 'clean:tmp', 'copy:tmp', 'preprocess', 'emberTemplates', 'concat:dev', 'sass', 'cssmin', 'copy:assets'];
    var standaloneTasks = ['env:prod', 'clean:tmp', 'copy:tmp', 'clean:standalone', 'preprocess', 'emberTemplates', 'concat:prod', 'uglify', 'sass', 'cssmin', 'copy:standalone'];
    var requiredWatchTasks = ['env:dev', 'clean:tmp', 'copy:tmp', 'preprocess'];

    /*
        copy everything from src to tmp and continue to use resources from there
    */

    // Grunt configuration.
    var gruntCfg = {
        pkg: grunt.file.readJSON('package.json')
    };

    // helper methods
    var prefixEach = function(array, prefix){
        for(var itemIndex = 0, max = array.length; itemIndex < max; itemIndex++){
            array[itemIndex] = prefix + array[itemIndex];
        }
        return array;
    };

    // application files
    var applicationFiles = [

        // intro
        'js/application/intro.js',

        // templates
        'js/templates/<%= pkg.name %>.templates.js',

        // helper
        'js/helpers/formatter.js',
        'js/helpers/util.js',
        'js/helpers/handlebarsHelper.js',

        // routes
        'js/routes/Router.js',
        'js/routes/IndexRoute.js',
        'js/routes/SummarySearchRoute.js',
        'js/routes/RelayDetailRoute.js',
        'js/routes/BridgeDetailRoute.js',

        // models
        'js/models/defaults.js',
        'js/models/TemporaryStore.js',
        'js/models/OnionooDetail.js',
        'js/models/OnionooSummary.js',
        'js/models/OnionooBandwidthHistory.js',
        'js/models/OnionooWeightsHistory.js',

        // controllers
        'js/controllers/ApplicationController.js',
        'js/controllers/IndexController.js',
        'js/controllers/RelayDetailController.js',
        'js/controllers/BridgeDetailController.js',
        'js/controllers/SummarySearchController.js',

        // views
        'js/views/LoadingIndicatorView.js',
        'js/views/HistoryGraphView.js',
        'js/views/ToggleEnableView.js',
        'js/views/RelaySummariesView.js',
        'js/views/AlertView.js'
    ];

    // vendor files
    var vendorFiles = {
        dev: [
            // vendor libs
            'js/vendor/modernizr-2.6.2.min.js',
            'js/vendor/sha1.js',
            'js/vendor/jquery/jquery-1.10.1.js',
            'js/vendor/jquery-deparam/jquery-deparam.js',
            'js/vendor/datatables/jquery.dataTables.js',
            'js/vendor/dygraph/dygraph-combined.js',
            'js/vendor/dygraph/dygraph-extra.js',

            // emberjs
            'js/vendor/handlebars-runtime/handlebars.runtime-1.0.0-rc.4.js',
            'js/vendor/ember/ember-1.0.0-rc.6.1.js',

            // foundation
            'js/vendor/zepto/zepto.js',
            'js/vendor/foundation/foundation.min.js',
            'js/vendor/foundation/foundation.tooltips.js'
        ],
        prod: [
            // vendor libs
            'js/vendor/modernizr-2.6.2.min.js',
            'js/vendor/sha1.js',
            'js/vendor/jquery/jquery-1.10.1.min.js',
            'js/vendor/jquery-deparam/jquery-deparam.min.js',
            'js/vendor/datatables/jquery.dataTables.min.js',
            'js/vendor/dygraph/dygraph-combined.js',
            'js/vendor/dygraph/dygraph-extra.js',

            // emberjs
            'js/vendor/handlebars-runtime/handlebars.runtime-1.0.0-rc.4.js',
            // 'public/js/vendor/ember/ember-1.0.0-rc.6.1.prod.js',
            'js/vendor/ember/ember-1.0.0-rc.6.1.js',

            // foundation
            'js/vendor/zepto/zepto.js',
            'js/vendor/foundation/foundation.min.js',
            'js/vendor/foundation/foundation.tooltips.js'
        ]
    };

    vendorFiles.dev = prefixEach(vendorFiles.dev, srcPath);
    vendorFiles.prod = prefixEach(vendorFiles.prod, tmpPath);
    applicationFiles = prefixEach(applicationFiles, tmpPath);

    // clean task
    gruntCfg['clean'] = {
        standalone: [ distPath ],
        tmp: [ tmpPath ],
        build: [ distPath, tmpPath, releasePath ]
    };

    // copy files task
    gruntCfg['copy'] = {
        standalone: {
            files: [{
                // minimized css and js
                expand: true,
                flatten: true,
                src: [ distPath + '*.min.*'],
                dest: releasePath
            },{
                // fonts
                expand: true,
                flatten: true,
                src: [ resPath + 'assets/fonts/*'],
                dest: releasePath + 'fonts/'
            },{
                // images
                expand: true,
                flatten:true,
                src: [ resPath + 'assets/img/*'],
                dest: releasePath + 'img/'
            },{
                // rootlevel files
                expand: true,
                flatten: true,
                src: [ resPath + 'assets/img/favicon.ico', distPath + 'index.html'],
                dest: releasePath
            }]
        },
        tmp: {
            expand: true,
            cwd: srcPath,
            src: ['**'],
            dest: tmpPath,
            filter: 'isFile'
        },
        assets: {
            expand: true,
            cwd: resPath + 'assets',
            src: ['**'],
            dest: distPath
        }
    };

    // watch for file changes task
    gruntCfg['watch'] = {
        js_files:{
            files: [ srcPath + 'js/**/*.js' ],
            tasks: requiredWatchTasks.concat(['concat:dev'])
        },
        hbs:{
            files: [ srcPath + 'js/templates/*.handlebars'],
            tasks: requiredWatchTasks.concat(['emberTemplates'])
        },
        css:{
            files: [ srcPath + 'css/*.css' ],
            tasks: requiredWatchTasks.concat(['cssmin'])
        }
         //enable if you have no file watchers in your ide
        /*
        ,scss:{
            files: [ srcPath + 'css/*.scss'],
            tasks: requiredWatchTasks.concat(['sass'])
        }
        */
    };

    // compile ember handlebars templates task
    gruntCfg['emberTemplates'] = {
        compile: {
            options: {
                templateName: function(sourceFile) {
                    //public/js/templates
                    var regex = new RegExp(tmpPath + "js/templates/");
                    return sourceFile.replace(regex, '');
                }
            },
            files: {}
        }
    };
    gruntCfg['emberTemplates']['compile']['files'][tmpPath+ 'js/templates/<%= pkg.name %>.templates.js'] = tmpPath + 'js/templates/*.handlebars';

    // concat files task
    gruntCfg['concat'] = {
        options: {
            separator: ';'
        },
        prod: {
            src: vendorFiles.prod.concat(applicationFiles),
            dest: distPath + '<%= pkg.name %>.js'
        },
        dev: {
            src: vendorFiles.dev.concat(applicationFiles),
            // workaround to avoid changing the script src in index.html
            dest: distPath + '<%= pkg.name %>.<%=pkg.version %>.min.js'
        }
    };

    // minify files task
    gruntCfg['uglify'] = {
        options: {
            mangle: false,
            report: 'min',
            banner: '/*! <%= pkg.name %> v<%= pkg.version %> <%= grunt.template.today("dd-mm-yyyy") %> */\n'
        },
        build: {
            files: {}
        }
    };
    gruntCfg['uglify']['build']['files'][distPath + '<%= pkg.name %>.<%= pkg.version %>.min.js'] = [ distPath + '<%= pkg.name %>.js'];

    // compile css from scss files task
    gruntCfg['sass'] = {
        dev: {
            files: {}
        }
    };
    gruntCfg['sass']['dev']['files'][tmpPath + 'css/style.css'] = tmpPath + 'css/style.scss';

    // minify css taks
    gruntCfg['cssmin'] = {
        combine: {
            files: {}
        },
        minify: {
            expand: true,
            cwd: distPath,
            src: ['<%= pkg.name %>.css'],
            dest: distPath,
            ext: '.<%= pkg.version %>.min.css'
        }
    };
    gruntCfg['cssmin']['combine']['files'][distPath + '<%= pkg.name %>.css'] = [
        tmpPath + 'css/normalize.css',
        tmpPath + 'css/foundation.min.css',
        tmpPath + 'css/style.css',
        tmpPath + 'css/country-flags.css'
    ];

    // create archive task
    gruntCfg['compress'] = {
        main: {
            options: {
                archive: '<%= pkg.name %>-<%= pkg.version %>.zip'
            },
            files: [{
                src: [ releasePath + '**' ], dest: '<%= pkg.name %>-<%= pkg.version %>/'
            }]
        }
    };

    // run karma tests task
    gruntCfg['karma'] = {
        unit: {
            configFile: testPath + 'karma.conf.js',
            singleRun: true
        }
    };

    // preprocess task
    gruntCfg['preprocess'] = {
        // TODO: group them together
        options : {
            context : {
                NAME : '<%= pkg.name %>',
                VERSION : '<%= pkg.version %>'
            }
        },
        html: {
            src : tmpPath + 'html/index.raw.html',
            dest : distPath + 'index.html'
        },
        js: {
            src : testPath + 'karma.conf.raw.js',
            dest : testPath + 'karma.conf.js'
        },
        app: {
            src: srcPath + 'js/application/intro.js',
            dest: tmpPath + 'js/application/intro.js'
        }
    };

    gruntCfg['env'] = {
        options : {
            /* Shared Options Hash */
            //globalOption : 'foo'
        },
        dev: {
            NODE_ENV : 'DEVELOPMENT'
        },
        test: {
            NODE_ENV : 'TESTING'
        },
        prod : {
            NODE_ENV : 'PRODUCTION'
        }
    };

    grunt.initConfig(gruntCfg);

    grunt.event.on('watch', function(action, filepath) {
        grunt.log.writeln('\n' + filepath + ' has ' + action);
    });

    // load grunt modules
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-ember-templates');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-sass');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-compress');
    grunt.loadNpmTasks('grunt-karma');
    grunt.loadNpmTasks('grunt-preprocess');
    grunt.loadNpmTasks('grunt-env');


    standaloneTasks= cleanBuild.concat(standaloneTasks).concat(['clean:tmp']);
    defaultTasks = cleanBuild.concat(defaultTasks).concat(['clean:tmp']);

    grunt.registerTask('default', defaultTasks);
    grunt.registerTask('dev', defaultTasks.concat(['watch']));
    grunt.registerTask('standalone', standaloneTasks);
    grunt.registerTask('standalone-archive', standaloneTasks.concat([ 'compress']));

    // ci testing target
    grunt.registerTask('ci', ['env:test', 'clean:tmp', 'copy:tmp', 'preprocess', 'emberTemplates', 'concat:prod', 'uglify', 'sass', 'cssmin', 'karma']);
};
