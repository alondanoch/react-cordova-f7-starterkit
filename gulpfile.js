var gulp = require('gulp');
var less = require('gulp-less');
var open = require('gulp-open');
var concatCss = require('gulp-concat-css');
var rename = require("gulp-rename");
var path = require('path');
var cordova = require("cordova-lib").cordova;

var $ = require('gulp-load-plugins')();
var del = require('del');
// set variable via $ gulp --type production
var environment = $.util.env.type || 'development';
var isProduction = environment === 'production';
var webpackConfig = require('./webpack.config.js').getConfig(environment);

var port = $.util.env.port || 3000;
var app = 'app/';
var dist = 'dist/';
var distCordova = 'cordova/app/www/';
var cordovaRoot = 'cordova/app';
var cordovaApk = 'cordova/app/platforms/android/build/outputs/apk';
var scriptsLib = app + 'lib/';

// https://github.com/ai/autoprefixer
var autoprefixerBrowsers = [
  'ie >= 9',
  'ie_mob >= 10',
  'ff >= 30',
  'chrome >= 34',
  'safari >= 6',
  'opera >= 23',
  'ios >= 6',
  'android >= 4.4',
  'bb >= 10'
];

gulp.task('scripts', function () {
  return gulp.src(webpackConfig.entry)
    .pipe($.webpack(webpackConfig))
    .pipe(isProduction ? $.uglifyjs() : $.util.noop())
    .pipe(gulp.dest(dist + 'js/'))
    .pipe(gulp.dest(distCordova + 'js/'))
    .pipe($.size({ title: 'js' }))
    .pipe($.connect.reload());
});

// copy html from app to dist
gulp.task('html', function () {
  return gulp.src(app + 'index.html')
    .pipe(gulp.dest(dist))
    .pipe(gulp.dest(distCordova))
    .pipe($.size({ title: 'html' }))
    .pipe($.connect.reload());
});

// copy libs to dist
gulp.task('lib', function () {

  gulp.src(app + '/fonts/*')
    .pipe(gulp.dest(dist + '/fonts'))
    .pipe(gulp.dest(distCordova + '/fonts'))
    .pipe($.size({ title: 'Ionicons' }));


  return gulp.src(scriptsLib + '/*')
    .pipe(gulp.dest(dist + '/lib'))
    .pipe(gulp.dest(distCordova + '/lib'))
    .pipe($.size({ title: 'Lib' }))
    .pipe($.connect.reload());
});

gulp.task('less', function () {
  return gulp.src(app + '/less/*')
    .pipe($.less())
    .pipe($.autoprefixer({ browsers: autoprefixerBrowsers }))
    .pipe(isProduction ? $.minifyCss() : $.util.noop())
    .pipe(gulp.dest(dist + 'css/'))
    .pipe(gulp.dest(distCordova + 'css/'))
    .pipe($.size({ title: 'css' }));
});

gulp.task('cssBundle', ['less'], function () {
  return gulp.src(dist + '/css/*')
    .pipe(concatCss("bundle.css"))
    .pipe(gulp.dest(dist + 'style/'))
    .pipe(gulp.dest(distCordova + 'style/'));
});

gulp.task('styles', function (cb) {
  // convert stylus to css
  return gulp.src(app + 'stylus/*')
    .pipe($.stylus({
      // only compress if we are in production
      compress: isProduction,
      // include 'normal' css into main.css
      'include css': true
    }))
    .pipe($.autoprefixer({ browsers: autoprefixerBrowsers }))
    .pipe(gulp.dest(dist + 'css/'))
    .pipe(gulp.dest(distCordova + 'css/'))
    .pipe($.size({ title: 'css' }))
    .pipe($.connect.reload());

});

// add livereload on the given port
gulp.task('serve', function () {
  $.connect.server({
    root: dist,
    port: port,
    livereload: {
      port: 35729
    }
  });
});

gulp.task('fontIcons', function () {
  return gulp.src(app + '/less/font-icons/**')
    .pipe(gulp.dest(dist + 'css/font-icons'))
    .pipe(gulp.dest(distCordova + 'css/font-icons'));
});

// copy img
gulp.task('images', function (cb) {
  return gulp.src(app + 'img/**/*.{png,jpg,jpeg,gif}')
    .pipe($.size({ title: 'images' }))
    .pipe(gulp.dest(dist + 'img/'))
    .pipe(gulp.dest(distCordova + 'img/'));
});

// build cordova
gulp.task('buildCordova', ['cleanCordova'], function (callback) {
  gulp.start(['preBuildCordova']);
});

// watch style html and js file changes
gulp.task('watch', function () {
  gulp.watch(app + 'stylus/*.styl', ['styles']);
  gulp.watch(app + 'less/*.less', ['less', 'cssBundle']);
  gulp.watch(app + 'index.html', ['html']);
  gulp.watch(app + 'scripts/**/*.js', ['scripts']);
  gulp.watch(app + 'scripts/**/*.jsx', ['scripts']);
});

// remove bundels
gulp.task('clean', function (cb) {
  del([dist, distCordova], cb);
});

gulp.task('cleanCordova', ['clean'], function (cb) {
  del([cordovaApk], cb);
});

// by default build project and then watch files in order to trigger livereload
gulp.task('default', ['build', 'serve', 'watch']);

// waits until clean is finished then builds the project
gulp.task('build', ['clean'], function () {
  gulp.start(['images', 'html', 'lib', 'scripts', 'styles', 'fontIcons', 'less', 'cssBundle'], function () {
    console.log('-----------');
    console.log('build ready');
    console.log('-----------');
  });
});

gulp.task('preBuildCordova', ['images', 'html', 'lib', 'scripts', 'styles', 'fontIcons', 'less', 'cssBundle'], function () {
  process.chdir(cordovaRoot);
  cordova.build({
    "platforms": ["android"],
    //"options": ["--debug", "--release"]
  }, function () {

    gulp.start(['copyApk'], function () {
      console.log('-----------');
      console.log('cordova ready');
      console.log('-----------');
    });

  });
});

gulp.task('buildCordovaDist', function(){
  process.chdir(cordovaRoot);
  cordova.build({
    "platforms": ["android"],
    "options": ["--debug", "--release"]
  }, function () {

    gulp.start(['copyApk'], function () {
      console.log('-----------');
      console.log('cordova ready');
      console.log('-----------');
    });

  });
});

gulp.task('copyApk', function () {
  process.chdir('../../');

  var currTime = Date.now() + "";
  currTime = currTime.substring(3, currTime.length - 3);

  return gulp.src(cordovaApk + '/*.apk')
    .pipe(rename("app-" + currTime + ".apk"))
    .pipe(gulp.dest(dist + 'apk/'));
});