/**
 * Created by marcellodisimone on 23.05.13.
 */
module.exports = function(grunt) {

    grunt.initConfig({
        config: {
          "gh-page-path": 'gh-pages/assets/font-awesome/'
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
            "gh-pages": {
                files: {
                    "<%= config.gh-page-path %>/css/font-awesome.css": "<%= config.gh-page-path %>/less/font-awesome.less",
                    "<%= config.gh-page-path %>/css/font-awesome-ie7.css": "<%= config.gh-page-path %>/less/font-awesome-ie7.less"
                }
            }
        },
        compress: {
            options: {
                archive: 'font-awesome.zip'
            },
            build: {
                files: [{
                    src: [
                        'css/*',
                        'less/*',
                        'font/*'
                    ],
                    dest: './'
                }]
            },
            "gh-pages": {
                files: [{
                    src: [
                        '<%= config.gh-page-path %>/css/*',
                        '<%= config.gh-page-path %>/less/*',
                        '<%= config.gh-page-path %>/font/*'
                    ],
                    dest: '<%= config.gh-page-path %>'
                }]
            }
        },
        copy: {
            "gh-pages": {
                files: [{
                    src: [
                        'css/*',
                        'less/*',
                        'font/*'
                    ],
                    dest: '<%= config.gh-page-path %>'
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
            "gh-pages": {
                files: {
                    '<%= config.gh-page-path %>/css/font-awesome.min.css': '<%= config.gh-page-path %>/css/font-awesome.css',
                    '<%= config.gh-page-path %>/css/font-awesome-ie7.min.css': '<%= config.gh-page-path %>/css/font-awesome.css'
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-stylus');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-compress');

    grunt.registerTask('default', ['less:build', 'cssmin:build', 'compress:build']);

    grunt.registerTask('gh-pages', ['copy', 'less:gh-pages', 'cssmin:gh-pages', 'compress:gh-pages']);

};
