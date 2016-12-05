var gulp = require('gulp');
var iconfont = require('gulp-iconfont');
var iconfontCss = require('gulp-iconfont-css');
var iconfontTemplate = require('gulp-iconfont-template');
var clean = require('gulp-clean');
var runTimestamp = Math.round(Date.now()/1000);

var brand = 'ingaia-font-icons';
var fontName = brand + '-' + runTimestamp;
var cssClass = 'ing';

gulp.task('iconfont', function(){

  gulp.src('dist/', {read: false})
	  .pipe(clean());

  gulp.src(['svg/*.svg'])
	.pipe(iconfontTemplate({
		fontName: brand,
		path: 'templates/template.html',
		targetPath: '../css/template.html',
		fontPath: 'dist/fonts/',
		cssClass: cssClass
	  }))
	.pipe(iconfontCss({
	  fontName: fontName,
	  targetPath: '../css/'+ brand +'.css',
	  fontPath: '../fonts/',
	  cssClass: cssClass
	}))
	.pipe(iconfont({
	  fontName: fontName,
	  normalize:true,
	  formats: ['ttf', 'eot', 'woff', 'woff2', 'svg'],
	  timestamp: runTimestamp
	 }))
	.pipe(gulp.dest('dist/fonts/'));
});

gulp.task('default', ['iconfont']);
