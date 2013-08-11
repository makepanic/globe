module.exports = function(grunt) {

    // general paths
    var resPath = 'res/',
        srcPath = 'src/',
        runPath = 'run/',
        testPath = 'test/',
        devPath = runPath + 'dev/',
        buildPath = runPath + 'build/';

    // Grunt configuration.
    var gruntCfg = {
        pkg: grunt.file.readJSON('package.json')
    };

    // helper methods
    var prefixEach = function(array, prefix){
        for(var itemIndex = 0, max = array.length; itemIndex < max; itemIndex++){
            array[itemIndex] = prefix + array[itemIndex];
        }
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

    vendorFiles.dev = prefixEach(applicationFiles, srcPath);
    vendorFiles.prod = prefixEach(applicationFiles, srcPath);
    applicationFiles = prefixEach(applicationFiles, srcPath);

    var copyOpts = function(targetDir){
        return [{
            // minimized css and js
            expand: true,
            flatten: true,
            src: ['dev/*.min.*'],
            dest: targetDir + '/dev/'
        },{
            // fonts
            expand: true,
            flatten: true,
            src: [ resPath + '/assets/fonts/*'],
            dest: targetDir + '/fonts/'
        },{
            // images
            expand: true,
            flatten:true,
            src: [ resPath + '/assets/img/*'],
            dest: targetDir + '/img/'
        },{
            // rootlevel files
            expand: true,
            flatten: true,
            src: [ resPath + '/assets/img/favicon.ico', 'src/html/index.html'],
            dest: targetDir + '/'
        }];
    };


    // clean task
    gruntCfg['clean'] = {
        standalone: [ buildPath ]
    };

    // copy files task
    gruntCfg['copy'] = {
        standalone: {
            files: copyOpts(buildPath)
        }
    };

    // watch for file changes task
    gruntCfg['watch'] = {
        js_files:{
            files: [ srcPath + 'js/**/*.js' ],
            tasks: ['concat:dev']
        },
        hbs:{
            files: [ srcPath + 'js/templates/*.handlebars'],
            tasks: ['emberTemplates']
        },
        css:{
            files: [ srcPath + 'css/*.css' ],
            tasks: ['cssmin']
        }
         //enable if you have no file watchers in your ide
        /*
        ,scss:{
            files: ['public/css/*.scss'],
            tasks: ['sass']
        }
        */
    };

    // compile ember handlebars templates task
    gruntCfg['emberTemplates'] = {
        compile: {
            options: {
                templateName: function(sourceFile) {
                    //public/js/templates
                    return sourceFile.replace(/src\/js\/templates\//, '');
                }
            },
            files: {}
        }
    };
    gruntCfg['emberTemplates']['compile']['files'][srcPath + 'js/templates/<%= pkg.name %>.templates.js'] = srcPath + 'js/templates/*.handlebars';

    // concat files task
    gruntCfg['concat'] = {
        options: {
            separator: ';'
        },
        prod: {
            src: vendorFiles.prod.concat(applicationFiles),
            dest: devPath + '<%= pkg.name %>.js'
        },
        dev: {
            src: vendorFiles.dev.concat(applicationFiles),
            // workaround to avoid changing the script src in index.html
            dest: devPath + '<%= pkg.name %>.<%=pkg.version %>.min.js'
        }
    };

    // minify files task
    gruntCfg['uglify'] = {
        options: {
            mangle: false,
            report: 'min',
            banner: '/*! <%= pkg.name %> v<%= pkg.version %> <%= grunt.template.today("dd-mm-yyyy") %> */\n'
        },
        dev: {
            files: {}
        }
    };
    gruntCfg['uglify']['dev']['files'][devPath + '<%= pkg.name %>.<%= pkg.version %>.min.js']  = [ devPath + '<%= pkg.name %>.js'];

    // compile css from scss files task
    gruntCfg['sass'] = {
        dev: {
            files: {}
        }
    };
    gruntCfg['sass']['dev']['files'][srcPath + 'css/style.css'] = srcPath + 'css/style.scss';

    // minify css taks
    gruntCfg['cssmin'] = {
        combine: {
            files: {}
        },
        minify: {
            expand: true,
            cwd: devPath,
            src: ['<%= pkg.name %>.css'],
            dest: devPath,
            ext: '.<%= pkg.version %>.min.css'
        }
    };
    gruntCfg['cssmin']['combine']['files'][devPath + '<%= pkg.name %>.css'] = [
        srcPath + 'css/normalize.css',
        srcPath + 'css/foundation.min.css',
        srcPath + 'css/style.css',
        srcPath + 'css/country-flags.css'
    ];

    // create archive task
    gruntCfg['compress'] = {
        main: {
            options: {
                archive: '<%= pkg.name %>-<%= pkg.version %>.zip'
            },
            files: [{
                src: [ buildPath + '**' ], dest: '<%= pkg.name %>-<%= pkg.version %>/'
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
        options : {
            context : {
                name : '<%= pkg.name %>',
                version : '<%= pkg.version %>'
            }
        },
        html: {
            src : srcPath + 'html/index.raw.html',
            dest : devPath + 'index.html'
        },
        js : {
            src : testPath + 'karma.conf.raw.js',
            dest : testPath + 'karma.conf.js'
        }
    };

    grunt.initConfig(gruntCfg);

    grunt.event.on('watch', function(action, filepath) {
        grunt.log.writeln('\n' + filepath + ' has ' + action);
    });

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

    // Default task(s).
    grunt.registerTask('default', ['preprocess', 'emberTemplates', 'concat:prod', 'uglify', 'sass', 'cssmin']);
    grunt.registerTask('dev', ['preprocess', 'emberTemplates', 'concat:dev', 'sass', 'cssmin', 'watch']);
    grunt.registerTask('standalone', ['clean', 'preprocess', 'emberTemplates', 'concat:prod', 'uglify', 'sass', 'cssmin', 'copy:standalone']);
    grunt.registerTask('standalone-archive', ['clean', 'preprocess', 'emberTemplates', 'concat:prod', 'uglify', 'sass', 'cssmin', 'copy:standalone', 'compress']);

    // ci testing target
    grunt.registerTask('ci', ['preprocess', 'emberTemplates', 'concat:prod', 'uglify', 'sass', 'cssmin', 'karma']);
};
