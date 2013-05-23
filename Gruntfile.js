/**
 * Created by marcellodisimone on 23.05.13.
 */
module.exports = function(grunt) {

    grunt.initConfig({
        config: {
          "pagesPath": 'gh-pages/assets/font-awesome'
        },
        pkg: grunt.file.readJSON('package.json'),
        less: {
            options: {
                compress: false
            },
            build: {
                files: {
                    "css/font-awesome.css": "less/font-awesome.less",
                    "css/font-awesome-ie7.css": "less/font-awesome-ie7.less"
                }
            },
            pages: {
                files: {
                    "<%= config.pagesPath %>/css/font-awesome.css": "<%= config.pagesPath %>/less/font-awesome.less",
                    "<%= config.pagesPath %>/css/font-awesome-ie7.css": "<%= config.pagesPath %>/less/font-awesome-ie7.less"
                }
            }
        },
        compress: {
            build: {
                options: {
                    archive: 'font-awesome.zip'
                },
                files: [{
                    src: [
                        'css/*',
                        'less/*',
                        'font/*'
                    ]
                }]
            },
            pages: {
                options: {
                    archive: 'gh-pages/assets/font-awesome.zip'
                },
                files: [{
                    src: [
                        '<%= config.pagesPath %>/css/*',
                        '<%= config.pagesPath %>/less/*',
                        '<%= config.pagesPath %>/font/*'
                    ]
                }]
            }
        },
        copy: {
            pages: {
                files: [{
                    src: [
                        'css/*',
                        'less/*',
                        'font/*'
                    ],
                    dest: '<%= config.pagesPath %>/'
                }]
            }
        },
        cssmin: {
            options: {
                keepSpecialComments: 1
            },
            build: {
                files: {
                    'css/font-awesome.min.css': 'css/font-awesome.css',
                    'css/font-awesome-ie7.min.css': 'css/font-awesome-ie7.css'
                }
            },
            pages: {
                files: {
                    '<%= config.pagesPath %>/css/font-awesome.min.css': '<%= config.pagesPath %>/css/font-awesome.css',
                    '<%= config.pagesPath %>/css/font-awesome-ie7.min.css': '<%= config.pagesPath %>/css/font-awesome.css'
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-stylus');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-compress');

    grunt.registerTask('default', ['less:build', 'cssmin:build', 'compress:build']);

    grunt.registerTask('pages', ['copy', 'less:pages', 'cssmin:pages', 'compress:pages']);

};
