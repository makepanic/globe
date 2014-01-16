module.exports = function(grunt) {

    // load all grunt tasks
    require('load-grunt-tasks')(grunt);

    // general paths
    var resPath = 'res/',
        srcPath = 'src/',
        buildPath = 'build/',
        testPath = 'test/',
        tmpPath = buildPath + 'tmp/',
        releasePath = buildPath + 'release/',
        distPath = buildPath + 'dist/';

    var globeConf = {
        res: resPath,
        src: srcPath,
        build: buildPath,
        tmp: tmpPath,
        release: releasePath,
        dist: distPath,
        test: testPath
    };

    // Default task(s).
    var cleanBuild = ['clean:build'];
    var defaultTasks = ['env:dev', 'clean:tmp', 'copy:tmp', 'eslint', 'preprocess', 'regex-replace', 'emberTemplates', 'concat:dev', 'sass', 'cssmin', 'copy:assets'];
    var standaloneTasks = ['env:prod', 'clean:tmp', 'eslint', 'copy:tmp', 'clean:standalone', 'preprocess', 'regex-replace', 'emberTemplates', 'concat:prod', 'uglify', 'sass', 'cssmin', 'copy:standalone'];
    var requiredWatchTasks = ['env:dev', 'clean:tmp', 'copy:tmp', 'preprocess', 'regex-replace', 'emberTemplates'];
    var testingTasks;

    // helper methods
    var prefixEach = function(array, prefix){
        return array.map(function (item) {
            return prefix + item;
        });
    };

    // application files
    var applicationFiles = [],
        theApplicationFiles = [

            // intro
            'js/application/intro.js',

            // templates
            'js/templates/<%= pkg.name %>.templates.js',

            // helper
            'js/helpers/formatter.js',
            'js/helpers/util.js',
            'js/helpers/ajax.js',
            'js/helpers/handlebarsHelper.js',
            'js/helpers/dataTablesRenderer.js',

            // controllers
            'js/controllers/ApplicationController.js',
            'js/controllers/Top10Controller.js',
            'js/controllers/RelayDetailController.js',
            'js/controllers/BridgeDetailController.js',
            'js/controllers/SummarySearchController.js',

            // routes
            'js/routes/Router.js',
            'js/routes/Top10Route.js',
            'js/routes/SummarySearchRoute.js',
            'js/routes/RelayDetailRoute.js',
            'js/routes/BridgeDetailRoute.js',
            'js/routes/StaticRoutes.js',

            // models
            'js/models/defaults.js',
            'js/models/TemporaryStore.js',
            'js/models/OnionooDetail.js',
            'js/models/OnionooSummary.js',
            'js/models/OnionooBandwidthHistory.js',
            'js/models/OnionooWeightsHistory.js',

            // components
            'js/components/AlertBoxComponent.js',
            'js/components/LoadingIndicatorComponent.js',

            // views
            'js/views/HistoryGraphView.js',
            'js/views/SummariesView.js'
        ];

    // vendor files
    var vendorFiles = {
        dev: [
            // vendor libs
            'js/vendor/modernizr-2.6.2.min.js',
            'js/vendor/sha1.js',
            'js/vendor/moment/moment.min.js',
            'js/vendor/jquery/jquery-1.10.2.js',
            'js/vendor/jquery-deparam/jquery-deparam.js',
            'js/vendor/datatables/jquery.dataTables.js',
            'js/vendor/dygraph/dygraph-combined.js',
            'js/vendor/dygraph/dygraph-extra.js',

            // emberjs
            'js/vendor/handlebars-runtime/handlebars.runtime-v1.1.2.js',
            'js/vendor/ember/ember-1.3.1.js',

            // qtip2
            'js/vendor/qtip2/jquery.qtip.min.js'
        ],
        prod: [
            // vendor libs
            'js/vendor/modernizr-2.6.2.min.js',
            'js/vendor/sha1.js',
            'js/vendor/moment/moment.min.js',
            'js/vendor/jquery/jquery-1.10.2.min.js',
            'js/vendor/jquery-deparam/jquery-deparam.min.js',
            'js/vendor/datatables/jquery.dataTables.min.js',
            'js/vendor/dygraph/dygraph-combined.js',
            'js/vendor/dygraph/dygraph-extra.js',

            // emberjs
            'js/vendor/handlebars-runtime/handlebars.runtime-v1.1.2.js',
            'js/vendor/ember/ember-1.3.1.min.js',

            // qtip2
            'js/vendor/qtip2/jquery.qtip.min.js'
        ]
    };

    vendorFiles.dev = prefixEach(vendorFiles.dev, srcPath);
    vendorFiles.prod = prefixEach(vendorFiles.prod, tmpPath);
    applicationFiles = prefixEach(theApplicationFiles, tmpPath);

    // Grunt configuration.
    var gruntCfg = {
        globe: globeConf,
        pkg: grunt.file.readJSON('package.json'),

        clean: {
            standalone: ['<%= globe.dist %>'],
            tmp: ['<%= globe.tmp %>'],
            build: [ '<%= globe.tmp %>', '<%= globe.dist %>', '<%= globe.release%>' ]
        },

        eslint: {
            target:  prefixEach(theApplicationFiles, srcPath),
            options: {
                config: 'eslint.json'
            }
        },

        copy: {
            standalone: {
                files: [{
                    // minimized css and js
                    expand: true,
                    flatten: true,
                    src: ['<%= globe.dist %>*.min.*'],
                    dest: '<%= globe.release %>'
                },{
                    // fonts
                    expand: true,
                    flatten: true,
                    src: [ '<%= globe.res %>assets/fonts/*'],
                    dest: '<%= globe.release %>fonts/'
                },{
                    // images
                    expand: true,
                    flatten:true,
                    src: [ '<%= globe.res %>assets/img/*'],
                    dest: '<%= globe.release %>img/'
                },{
                    // rootlevel files
                    expand: true,
                    flatten: true,
                    src: [ '<%= globe.res %>assets/favicon.ico', '<%= globe.res %>assets/robots.txt', '<%= globe.dist %>index.html'],
                    dest: '<%= globe.release %>'
                }]
            },
            tmp: {
                expand: true,
                cwd: '<%= globe.src %>',
                src: ['**'],
                dest: '<%= globe.tmp %>',
                filter: 'isFile'
            },
            assets: {
                expand: true,
                cwd: '<%= globe.res %>assets',
                src: ['**'],
                dest: '<%= globe.dist %>'
            }

        },

        watch: {
            js_files:{
                files: [ '<%= globe.src %>js/**/*.js' ],
                tasks: requiredWatchTasks.concat(['concat:dev'])
            },
            hbs:{
                files: [ '<%= globe.src %>js/templates/*.handlebars'],
                tasks: requiredWatchTasks.concat(['emberTemplates', 'concat:dev'])
            },
            css:{
                files: [ '<%= globe.src %>css/*.css' ],
                tasks: requiredWatchTasks.concat(['cssmin'])
            }
            //enable if you have no file watchers in your ide
            /*
             ,scss:{
             files: [ srcPath + 'css/*.scss'],
             tasks: requiredWatchTasks.concat(['sass'])
             }
             */
        },

        emberTemplates: {
            compile: {
                options: {
                    templateName: function(sourceFile) {
                        //public/js/templates
                        var regex = new RegExp(tmpPath + "js/templates/");
                        return sourceFile.replace(regex, '');
                    }
                },
                files: {
                    '<%= globe.tmp %>js/templates/<%= pkg.name %>.templates.js': '<%= globe.tmp %>js/templates/**/*.handlebars'
                }
            }
        },

        concat: {
            options: {
                separator: ';'
            },
            prod: {
                src: vendorFiles.prod.concat(applicationFiles),
                dest: '<%= globe.dist %><%= pkg.name %>.js'
            },
            dev: {
                src: vendorFiles.dev.concat(applicationFiles),
                // workaround to avoid changing the script src in index.html
                dest: '<%= globe.dist %><%= pkg.name %>.<%=pkg.version %>.min.js'
            }
        },

        uglify: {
            options: {
                mangle: true,
                report: 'min',
                banner: '/*! <%= pkg.name %> v<%= pkg.version %> <%= grunt.template.today("dd-mm-yyyy") %> */\n'
            },
            build: {
                files: {
                    '<%= globe.dist %><%= pkg.name %>.<%= pkg.version %>.min.js': ['<%= globe.dist %><%= pkg.name %>.js']
                }
            }
        },

        sass: {
            dev: {
                files: {
                    '<%= globe.tmp%>css/style.css': '<%= globe.tmp %>css/new-style.scss'
                }
            }
        },

        cssmin: {
            combine: {
                files: {
                    '<%= globe.dist %><%= pkg.name %>.css': [
                        '<%= globe.tmp %>css/pure-min.css',
                        '<%= globe.tmp %>css/new-style.css',
                        '<%= globe.tmp %>css/country-flags.css',
                        '<%= globe.tmp %>css/jquery.qtip.min.css'
                    ]
                }
            },
            minify: {
                expand: true,
                cwd: '<%= globe.dist %>',
                src: ['<%= pkg.name %>.css'],
                dest: '<%= globe.dist %>',
                ext: '.<%= pkg.version %>.min.css'
            }
        },

        compress: {
            main: {
                options: {
                    archive: '<%= pkg.name %>-<%= pkg.version %>.zip'
                },
                files: [{
                    src: [ '<%= globe.release %>**' ], dest: '<%= pkg.name %>-<%= pkg.version %>/'
                }]
            }
        },

        karma: {
            unit: {
                configFile: '<%= globe.test %>karma.conf.js',
                singleRun: true
            }
        },

        preprocess: {
            // TODO: group them together
            options : {
                context : {
                    NAME : '<%= pkg.name %>',
                    VERSION : '<%= pkg.version %>'
                }
            },
            html: {
                src : '<%= globe.tmp %>html/index.raw.html',
                dest : '<%= globe.dist %>index.html'
            },
            js: {
                src : '<%= globe.test %>karma.conf.raw.js',
                dest : '<%= globe.test %>karma.conf.js'
            },
            app: {
                files: {
                    '<%= globe.tmp %>js/application/intro.js': '<%= globe.src %>js/application/intro.js',
                    '<%= globe.tmp %>js/helpers/ajax.js': '<%= globe.src %>js/helpers/ajax.js'
                }
            }
        },

        env: {
            dev: {
                NODE_ENV : 'DEVELOPMENT'
            },
            test: {
                NODE_ENV : 'TESTING'
            },
            prod : {
                NODE_ENV : 'PRODUCTION'
            }
        },

        'regex-replace': {
            handlebars: {
                src: '<%= globe.tmp %>js/templates/*.handlebars',
                actions: [{
                    name: 'remove beginning whitespace',
                    search: /^[ ]*/gm,
                    replace: ''
                },{
                    name: 'replace empty lines',
                    search: /^\n/gm,
                    replace: ''
                },{
                    name: 'replace newlines after tags',
                    search: /([>\}])\n/gm,
                    replace: '$1'
                }]
            }
        }
    };

    grunt.initConfig(gruntCfg);

    grunt.event.on('watch', function(action, filepath) {
        grunt.log.writeln('\n' + filepath + ' has ' + action);
    });

    standaloneTasks= cleanBuild.concat(standaloneTasks).concat(['clean:tmp']);
    defaultTasks = cleanBuild.concat(defaultTasks).concat(['clean:tmp']);

    grunt.registerTask('default', defaultTasks);
    grunt.registerTask('dev', defaultTasks.concat(['watch']));
    grunt.registerTask('standalone', standaloneTasks);
    grunt.registerTask('standalone-archive', standaloneTasks.concat([ 'compress']));

    // ci testing target
    testingTasks = defaultTasks.slice();
    // remove env:prod from tasks
    testingTasks.splice(1,1);
    grunt.registerTask('ci', ['env:test'].concat(testingTasks).concat(['karma']));
};
