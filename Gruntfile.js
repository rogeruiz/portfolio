module.exports = function (grunt) {

  // Project configuration
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    watch: {
      css: {
        files: '<%= pkg.directories.source.stylesheets %>/**/*.less',
        tasks: ['less:compile']
      },
      js: {
        files: ['<%= pkg.directories.source.data %>/**/*.json', '<%= pkg.directories.source.javascripts %>/**/*.js', '<%= pkg.directories.source.templates %>/**/*.hbs'],
        tasks: ['jshint', 'requirejs']
      }
    },
    copy: {
      init: {
        files: {
          '<%= pkg.directories.source.stylesheets %>/_main.less': 'bower_components/html5-boilerplate/css/main.css',
          '<%= pkg.directories.source.stylesheets %>/_normalize.less': 'bower_components/html5-boilerplate/css/normalize.css',
          '<%= pkg.directories.public.javascripts %>/lib/jquery.js': 'bower_components/jquery/jquery.min.js',
          '<%= pkg.directories.public.javascripts %>/lib/jquery.min.map': 'bower_components/jquery/jquery.min.map',
          '<%= pkg.directories.public.javascripts %>/lib/modernizr.js': 'bower_components/modernizr/modernizr.js',
          '<%= pkg.directories.public.javascripts %>/lib/jquery.hammer.min.js': 'bower_components/jquery-hammerjs/jquery.hammer.min.js',
          '<%= pkg.directories.public.javascripts %>/lib/jquery.hammer.min.map': 'bower_components/jquery-hammerjs/jquery.hammer.min.map',
          '<%= pkg.directories.public.javascripts %>/lib/ember.js': 'bower_components/ember/ember.min.js'
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
          '<%= pkg.directories.public.stylesheets %>/app.css': '<%= pkg.directories.source.stylesheets %>/app.less'
        }
      }
    },
    jshint: {
      all: ['Gruntfile.js', 'source/json/**', 'source/javascripts/**']
    },
    requirejs: {
      compile: {
        options: {
          baseUrl: 'source/',
          name: 'javascripts/main',
          paths: {
            'source': 'javascripts',
            'templates': '../<%= pkg.directories.source.templates %>',
            'data': '../<%= pkg.directories.source.data %>',
            'jquery': '../<%= pkg.directories.public.javascripts %>/lib/jquery',
            'underscore': '../<%= pkg.directories.public.javascripts %>/lib/underscore',
            'backbone': '../<%= pkg.directories.public.javascripts %>/lib/backbone',
            'handlebars': '../<%= pkg.directories.public.javascripts %>/lib/handlebars.runtime',
            'text': '../<%= pkg.directories.public.javascripts %>/lib/text',
            'rjs-handlebars': '../<%= pkg.directories.public.javascripts %>/lib/hb'
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
          out: 'public/javascripts/app.js',
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
  grunt.loadNpmTasks('grunt-contrib-jshint');

  // Tasks
  grunt.registerTask('default', ['less', 'jshint', 'requirejs', 'watch']);

};