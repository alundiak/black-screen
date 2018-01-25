/*global module:false*/
module.exports = function(grunt) {
    require('load-grunt-tasks')(grunt);

    let glMapHtml = grunt.file.read('./gl_office_map.html');

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
                    src: ['index.*', 'gl_office_map.*', 'styles.css', 'intro.js', 'fonts/**', 'favicon.png'],
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
            },
            indexHtml: {
              src: ['dist/index.html'],
                dest: 'dist/index.html',
                replacements: [{
                  from: '<link rel="import" href="./gl_office_map.html">',
                  to: ''
                }, {
                  from: '<!-- DO_NOT_REMOVE_THIS -->',
                  to: glMapHtml
                }]
            }
        }
    });

    grunt.registerTask('build', ['clean', 'copy', 'replace']);
};
