// File: Gulpfile.js]
'use strict';

var gulp = require('gulp'),
  gulputil= require('gulp-util'),
  connect = require('gulp-connect'),
  stylus = require('gulp-stylus'),
  nib = require('nib'),
  jshint = require('gulp-jshint'),
  stylish = require('jshint-stylish'),
  historyApiFallback = require('connect-history-api-fallback'),
  inject = require('gulp-inject'),
  wiredep = require('wiredep').stream,
  templateCache = require('gulp-angular-templatecache'),
  gulpif = require('gulp-if'),
  minifyCss = require('gulp-minify-css'),
  useref = require('gulp-useref'),
  uglify = require('gulp-uglify');


// Busca en las carpetas de estilos y javascript los archivos que hayamos creado
// para inyectarlos en el index.html
gulp.task('inject', function() {
  const sources = gulp.src(['./app/scripts/**/*.js', './app/stylesheets/**/*.css',
                            './app/modules/**/*.js'], { read: false });
  return gulp.src('index.html', { cwd: './app' })
    .pipe(inject(sources, {
      // read: false,
      ignorePath: '/app',
    }))
    .pipe(gulp.dest('./app'));
});
// Inyecta las librerias que instalemos vía Bower
gulp.task('wiredep', function() {
  gulp.src('./app/index.html')
    .pipe(wiredep({
      directory: './app/lib',
    })).pipe(gulp.dest('./app'));
});

// Servidor web de desarrollo
gulp.task('server', function() {
  connect.server({
    root: './app',
    // hostname: '0.0.0.0',
    // port: 8080,
    livereload: true,
    middleware(server, opt) {
      return [historyApiFallback()];
    },
  });
});

// Servidor de producción
gulp.task('server-dist', function() {
  connect.server({
    root: './dist',
    hostname: '0.0.0.0',
    port: 8081,
    livereload: true,
    middleware(server, opt) {
      return [historyApiFallback()];
    },
  });
});

// Busca errores en el JS y nos los muestra por pantalla
gulp.task('jshint', function() {
  return gulp.src(['./app/scripts/**/*.js', './app/modules/**/*.js'])
    .pipe(jshint('.jshintrc'))
    .pipe(jshint.reporter('jshint-stylish'))
    .pipe(jshint.reporter('fail'));
});

// Preprocesa archivos Stylus a CSS y recarga los cambios
gulp.task('css', function() {
  gulp.src('./app/stylesheets/main.styl')
    .pipe(stylus({ use: nib() }))
    .pipe(gulp.dest('./app/stylesheets'))
    .pipe(connect.reload());
});

// Recarga el navegador cuando hay cambios en el HTML
gulp.task('html', function() {
  gulp.src('./app/**/*.html')
    .pipe(connect.reload());
});

// Creates the file templates.js which concatenates and registers
// the project html templates, this task needs to be done and finished before
// 'compress' task, so template.js gets injected in index.html before
// the compress task compresses everything into vendor.min and app.min
gulp.task('templates', function (callback) {
  gulp.src('./app/modules/**/views/*.tpl.html')
    .pipe(templateCache({
      root: 'modules/',
      module: 'blog.templates',
      standalone: true,
    }))
    .pipe(gulp.dest('./app/scripts'))
    .on('end', function() {
      console.log('finished creating template.js file now injecting to index.html...');
      gulp.src('index.html', { cwd: './app' })
        .pipe(inject(gulp.src(['./app/scripts/templates.js'], { read: false }), {
          name: 'distinject',
          ignorePath: '/app',
        }))
      .pipe(gulp.dest('./app'))
        .on('end', function() {
          callback();
        });
    });
});

// When 'templates' is finished, 'compress' will begin, compress is dependent on templates
gulp.task('compress', ['templates'], function() {
  console.log('compresssss...');
  gulp.src('./app/index.html')
    // in api v3 this cannot be used
    // .pipe(useref.assets())
    .pipe(useref())
    .pipe(gulpif('*.js', uglify({ mangle: false }).on('error', gulputil.log)))
    .pipe(gulpif('*.css', minifyCss()))
    .pipe(gulp.dest('./dist'));
});

gulp.task('copy', function() {
  console.log('copy...');
  // gulp.src('./app/index.html')
    // .pipe(useref())
    // .pipe(gulp.dest('./dist'));
  gulp.src('./app/lib/font-awesome/fonts/**')
    .pipe(gulp.dest('./dist/fonts'));
});

gulp.task('build', ['templates', 'copy', 'compress']);

// Vigila cambios que se produzcan en el código
// y lanza las tareas relacionadas
gulp.task('watch', function() {
  gulp.watch(['./app/scripts/**/*.js', './app/modules/**/*.js', './Gulpfile.js'], ['jshint', 'inject']);
  gulp.watch(['./app/**/*.html'], ['html']);
  gulp.watch(['./app/stylesheets/**/*.styl'], ['css', 'inject']);
  gulp.watch(['./bower.json'], ['wiredep']);
});

gulp.task('default', ['server', 'inject', 'wiredep', 'watch']);
