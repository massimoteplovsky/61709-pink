module.exports = function(grunt) {

  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-githooks');
  grunt.loadNpmTasks('grunt-lintspaces');
  grunt.loadNpmTasks('grunt-autoprefixer');
  grunt.loadNpmTasks('grunt-csscomb');
  grunt.loadNpmTasks('grunt-contrib-imagemin');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-htmlmin');

  require("load-grunt-tasks")(grunt);

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    less: {
      style: {
        files: {
          'css/style.css': 'less/style.less'
        }
      }
    },

    autoprefixer: { 
      options: { 
        browsers: ["last 2 version", "ie 10"] 
      }, 
        style: { 
          src: "build/css/style.css" 
        }
    },

    sass: {
      style: {
        files: {
          'build/css/style.css': 'source/sass/style.scss',
      
        }
      }
    },

    imagemin: { 
      images: { 
        options: { 
          optimizationLevel: 3 
        }, 
          files: [{ 
            expand: true, 
            src: ["build/img/**/*.{png,jpg,gif,svg}"] 
          }] 
        } 
    },

    lintspaces: {
      test: {
        src: [
          '*.html',
          'js/*.js',
          'less/*.less',
          'sass/*.sass'
        ],
        options: {
          editorconfig: '.editorconfig'
        }
      }
    },

    githooks: {
      test: {
        'pre-commit': 'lintspaces:test',
      }
    },

    copy: {
      build: {
        files: [{
          expand: true,
          cwd: "source",
          src: [
            '*.html',
            'css/**',
            'img/**',
            'js/**'
          ],
          dest: 'build',
        }]
      }
    },

    clean: {
        build: ["build"]
    },

    csscomb: { 
      style: { 
        expand: true, 
        src: ["sass/**/*.sass"] 
      }
    },

    cssmin: { 
      style: { 
        options: { 
          keepSpecialComments: 0, 
          report: "gzip" 
        }, 
        files: { 
          "build/css/style.min.css": ["build/css/style.css"] 
        } 
      }
    },

    htmlmin: { 
      options: { 
        removeComments: true, 
        collapseWhitespace: true, 
        collapseBooleanAttributes: true, 
        caseSensitive: true, 
        keepClosingSlash: false 
      }, 
      html: { 
      files: { 
        "build/index.min.html": "build/index.html", 
        "build/post.min.html": "build/post.html",
        "build/blog.min.html": "build/blog.html",
        "build/form.min.html": "build/form.html",
      } 
      } 
    }

  });

  grunt.registerTask('test', ['lintspaces:test']);

  if (grunt.file.exists(__dirname, 'less', 'style.less')) {
    grunt.registerTask('gosha', ['less:style', 'copy:gosha', 'clean:gosha']);
  } else if (grunt.file.exists(__dirname, 'sass', 'style.scss')) {
    grunt.registerTask('gosha', ['sass:style', 'copy:gosha', 'clean:gosha']);
  } else {
    grunt.registerTask('gosha', ['copy:gosha', 'clean:gosha']);
  }

  grunt.registerTask("build", [
    "clean",
    "copy",
    "sass",
    "autoprefixer",
    "cssmin",
    "htmlmin",
    "imagemin"
    ]);
};
