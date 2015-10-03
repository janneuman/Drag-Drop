'use strict';

module.exports = function(grunt) {

    grunt.initConfig({
        www: 'www',
        bower: 'www/bower',
        styles: 'www/less',
        css: 'www/css',
        js: 'www/js',
        app: 'www/app',
        test: 'www/test',

        jshint: {
            options: {
                reporter: require('jshint-stylish'),

                curly: true,
                eqeqeq: true,
                immed: true,
                latedef: true,
                freeze: true,
                newcap: true,
                noarg: true,
                sub: true,
                undef: true,
                unused: true,
                boss: true,
                eqnull: true,
                indent: 4,
                white: false,
                quotmark: 'single',
                trailing: true,
                jquery: true,
                browser: true,
                esnext: true,
                debug: false,
                devel: false,
                predef: [
                    'require',
                    'module'
                ]
            },
            gruntfile: {
                options: {
                    node: true
                },
                src: 'Gruntfile.js'
            },
            dev: {
                options: {
                    devel: true,
                    debug: true,
                    unused: false
                },
                src: [
                    '<%= app %>/*.js'
                ]
            },
            production: {
                src: [
                    '<%= js %>/app-prod.js'
                ]
            }
        },

        jscs: {
            options: {
                config: '.jscsrc',
                esnext: true
            },
            src: [
                '<%= app %>/**/*.js'
            ]
        },

        babel: {
            options: {
                sourceMap: true
            },
            dist: {
                files: {
                    '<%= js %>/app.js': '<%= app %>/application.js'
                }
            }
        },

        browserify: {
            build: {
                options: {
                    debug: true,
                    sourceMap: true,
                    transform: [ ['babelify'] ]
                },
                files: {
                    '<%= js %>/app.js': '<%= app %>/application.js'
                }
            }
        },

        less: {
            options: {
                paths: [
                    '<%= css %>',
                    '<%= bower %>'
                ],
                relativeUrls: true
            },
            dev: {
                options: {
                    sourceMap: true,
                    sourceMapFilename: '<%= css %>/style.css.map',
                    sourceMapURL: 'style.css.map',
                    sourceMapBasepath: '<%= documentRoot %>',
                    outputSourceFiles: true,
                    plugins: [
                        require('less-plugin-group-css-media-queries')
                    ]
                },
                files: {
                    '<%= css %>/style.css': '<%= styles %>/main.less'
                }
            }
        },

        watch: {
            gruntfile: {
                files: 'Gruntfile.js',
                tasks: ['jshint:gruntfile']
            },
            jshint: {
                files: [
                    '<%= app %>/application.js'
                ],
                tasks: ['jshint:dev']
            },
            browserify: {
                files: [
                    '<%= app %>/**/*.js'
                ],
                tasks: ['browserify:build']
            },
            html: {
                files: [
                    '<%= www %>/*.html'
                ]
            },
            less: {
                files: [
                    '<%= styles %>/**/*.less'
                ],
                tasks: ['less:dev']
            }
        },

        browserSync: {
            dev: {
                bsFiles: {
                    src: [
                        '<%= css %>/style.css',
                        '<%= js %>/*.js',
                        '<%= www %>/*.html'
                    ]
                },
                options: {
                    watchTask: true,
                    port: 7979,
                    open: false,
                    server: {
                        baseDir: '<%= www %>'
                    }
                }
            }
        }
    });

    require('jit-grunt')(grunt);

    grunt.registerTask('default', ['browserify', 'browserSync', 'less:dev', 'watch']);
    grunt.registerTask('jsdev', ['jshint:gruntfile', 'jshint:dev', 'browserify', 'test']);
    grunt.registerTask('js', ['jshint:gruntfile', 'jshint:production', 'jscs', 'browserify', 'test']);
    grunt.registerTask('build', ['js', 'test']);

};
