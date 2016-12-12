var gulp = require('gulp');
var iconfont = require('gulp-iconfont');
var iconfontCss = require('gulp-iconfont-css');
var iconfontTemplate = require('gulp-iconfont-template');
var runSequence = require('run-sequence');
var del = require('del');
var runTimestamp = Math.round(Date.now()/1000);
var brand = 'ingaia-font-icons';
var fontName = brand;
var cssClass = 'ing';


gulp.task('clean', function() {
    // Return the Promise from del() 
    return del('dist/');
});

gulp.task('iconfont-css', function(){

  return gulp.src(['svg/*.svg'])
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
	.pipe(gulp.dest('dist/fonts'));

});

gulp.task('iconfont-sass', function(){

  return gulp.src(['svg/*.svg'])
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
	  //timestamp: runTimestamp
	 }))
	.pipe(gulp.dest('dist/fonts'));

});

gulp.task('template-html', function(){

  return gulp.src(['svg/*.svg'])
	.pipe(iconfontTemplate({
		fontName: brand,
		path: 'templates/template.html',
		targetPath: '../css/template.html',
		fontPath: 'dist/fonts/',
		cssClass: cssClass
	  }))
	.pipe(iconfont({
	  fontName: fontName,
	  normalize:true,
	  formats: ['ttf', 'eot', 'woff', 'woff2', 'svg'],
	  //timestamp: runTimestamp
	 }))
	.pipe(gulp.dest('dist/fonts'));

});

gulp.task('fonts', function(){

  return gulp.src(['svg/*.svg'])
	.pipe(iconfont({
	  fontName: fontName,
	  normalize:true,
	  formats: ['ttf', 'eot', 'woff', 'woff2', 'svg'],
	  //timestamp: runTimestamp
	 }))
	.pipe(gulp.dest('dist/fonts'));

});

gulp.task('default', function(callback) {
  runSequence('clean',
              ['iconfont-css', 'iconfont-sass', 'template-html'],              
              callback);
});
