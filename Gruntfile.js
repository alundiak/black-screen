/*global module:false*/
module.exports = function(grunt) {
    require('load-grunt-tasks')(grunt);

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        clean: {
            maon: {
                src: ['dist']
            }
        },

        copy: {
            main: {
                files: [{
                    src: ['index.*', 'gl_office_map.*', 'styles.css', 'intro.js', 'fonts/**'],
                    dest: 'dist/'
                }, {
                    expand: true,
                    cwd: 'al',
                    src: ['fake.json'],
                    dest: 'dist',
                    filter: 'isFile'
                }],
            }
        },

        replace: {
            main: {
                src: ['dist/index.js'],
                dest: 'dist/index.js',
                replacements: [{
                    from: '\'/fake\'',
                    to: '\'./fake.json\''
                }]
            }
        }
    });

    grunt.registerTask('build', ['clean', 'copy', 'replace']);
};
