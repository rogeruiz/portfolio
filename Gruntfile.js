module.exports = function (grunt) {

  // Project configuration
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    watch: {
      css: {
        files: '<%= pkg.dir.src.less %>/**/*.less',
        tasks: ['less:compile']
      },
      js: {
        files: ['<%= pkg.dir.src.data %>/**/*.json', '<%= pkg.dir.src.js %>/**/*.js', '<%= pkg.dir.src.tmp %>/**/*.hbs'],
        tasks: ['requirejs']
      }
    },
    copy: {
      init: {
        files: {
          '<%= pkg.dir.src.less %>/_main.less': 'bower_components/html5-boilerplate/css/main.css',
          '<%= pkg.dir.src.less %>/_normalize.less': 'bower_components/html5-boilerplate/css/normalize.css',
          '<%= pkg.dir.public.js %>/lib/backbone.js': 'bower_components/backbone-amd/backbone-min.js',
          '<%= pkg.dir.public.js %>/lib/backbone.map': 'bower_components/backbone-amd/backbone-min.map',
          '<%= pkg.dir.public.js %>/lib/jquery.js': 'bower_components/jquery/jquery.min.js',
          '<%= pkg.dir.public.js %>/lib/jquery.min.map': 'bower_components/jquery/jquery.min.map',
          '<%= pkg.dir.public.js %>/lib/modernizr.js': 'bower_components/modernizr/modernizr.js',
          '<%= pkg.dir.public.js %>/lib/require.js': 'bower_components/requirejs/require.js'
        }
      },
      markup: {
        files: {
          'public/page.html': 'bower_components/html5-boilerplate/index.html'
        }
      }
    },
    less: {
      compile: {
        files: {
          '<%= pkg.dir.public.css %>/app.css': '<%= pkg.dir.src.less %>/app.less'
        }
      }
    },
    requirejs: {
      compile: {
        options: {
          baseUrl: 'src/',
          name: 'js/main',
          paths: {
            'src': 'js',
            'tmp': '../<%= pkg.dir.src.tmp %>',
            'data': '../<%= pkg.dir.src.data %>',
            'jquery': '../<%= pkg.dir.public.js %>/lib/jquery',
            'underscore': '../<%= pkg.dir.public.js %>/lib/underscore',
            'backbone': '../<%= pkg.dir.public.js %>/lib/backbone',
            'handlebars': '../<%= pkg.dir.public.js %>/lib/handlebars.runtime',
            'text': '../<%= pkg.dir.public.js %>/lib/text',
            'hb': '../<%= pkg.dir.public.js %>/lib/hb'
          },
          shim: {
            underscore: {
              exports: '_'
            },
            backbone: {
              deps: ['underscore', 'jquery'],
              exports: 'Backbone'
            },
            handlebars: {
              exports: 'Handlebars'
            }
          },
          out: 'public/js/app.js',
          optimize: 'none'
        }
      }
    } 
  });

  // Load plugins
  grunt.loadNpmTasks('grunt-contrib-requirejs');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-qunit');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-imagemin');
  grunt.loadNpmTasks('grunt-express-server');

  // Tasks
  grunt.registerTask('default', ['less', 'requirejs', 'watch']);

};