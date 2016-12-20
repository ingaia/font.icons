var gulp = require('gulp');
var iconfont = require('gulp-iconfont');
var iconfontCss = require('gulp-iconfont-css');
var iconfontTemplate = require('gulp-iconfont-template');
var runSequence = require('run-sequence');
var rename = require('gulp-rename');
var del = require('del');
var runTimestamp = Math.round(Date.now()/1000);
var brand = 'ingaia-font-icons';
var fontName = brand;
var cssClass = 'ing';

//Deleta a pasta dist
gulp.task('clean', function() {	
	return del('dist/');
});

//Cria o arquivo CSS
gulp.task('iconfont-css', function(){

  return gulp.src(['svg/*.svg'])
	.pipe(rename(function (path) {
		path.basename = path.basename.replace(/[0-9]{4}-/g, '');
	}))
	.pipe(iconfontCss({
	  fontName: fontName,
	  targetPath: '../'+ brand +'.css',
	  fontPath: 'fonts/',
	  cssClass: cssClass
	}))
	.pipe(iconfont({
	  fontName: fontName,
	  normalize:true,
	  formats: ['ttf', 'eot', 'woff', 'woff2', 'svg'],
	  timestamp: runTimestamp
	 }))
	.pipe(gulp.dest('dist/fonts'));

});

//Cria o arquivo SASS
gulp.task('iconfont-sass', function(){

  return gulp.src(['svg/*.svg'])
	.pipe(rename(function (path) {
		path.basename = path.basename.replace(/[0-9]{4}-/g, '');
	}))
	.pipe(iconfontCss({
	  fontName: fontName,
	  path: 'scss',
	  targetPath: '../scss/'+ brand +'.scss',
	  fontPath: '#{$ingaia-icons-font-path}',
	  cssClass: cssClass
	}))
	.pipe(iconfont({
	  fontName: fontName,
	  normalize:true,
	  formats: ['ttf', 'eot', 'woff', 'woff2', 'svg'],
	  timestamp: runTimestamp
	 }))
	.pipe(gulp.dest('dist/fonts'));

});

//Cria o arquivo HTML
gulp.task('template-html', function(){

  return gulp.src(['svg/*.svg'])
	.pipe(rename(function (path) {
		path.basename = path.basename.replace(/[0-9]{4}-/g, '');
	}))
	.pipe(iconfontTemplate({
		fontName: brand,
		path: 'templates/template.html',
		targetPath: '../index.html',
		fontPath: 'dist/fonts/',
		cssClass: cssClass
	  }))
	.pipe(iconfont({
	  fontName: fontName,
	  normalize:true,
	  formats: ['ttf', 'eot', 'woff', 'woff2', 'svg'],
	  timestamp: runTimestamp
	 }))
	.pipe(gulp.dest('dist/fonts'));

});

gulp.task('default', function(callback) {
  runSequence('clean',
              ['template-html','iconfont-css', 'iconfont-sass'],              
              callback);
});
