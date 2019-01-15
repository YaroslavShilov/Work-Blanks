var gulp       = require('gulp'),
	sass         = require('gulp-sass'),
	csso         = require('gulp-csso'),
	cssnano      = require('gulp-cssnano'),
	browserSync  = require('browser-sync'),
	del          = require('del'),
	duration     = require('gulp-duration'),
	imagemin     = require('gulp-imagemin'),
	imageminJR 	 = require('imagemin-jpeg-recompress'),
	pngquant     = require('imagemin-pngquant'),
	newer     	 = require('gulp-newer'),
	cache        = require('gulp-cache'),
	autoprefixer = require('gulp-autoprefixer'),
	pug					 = require('gulp-pug'),
	gulpSync 		 = require('gulp-sync')(gulp).sync,
	inky 				 = require('inky'),
	inlineCss		 = require('gulp-inline-css'),
	inlineSource = require('gulp-inline-source');

gulp.task('browser-sync', function() {
	browserSync({
		server: {
			baseDir: 'app'
		},
		notify: false
	});
});

gulp.task('sassMain', function(){
	return gulp.src('app/sass/main.+(scss|sass)')
		.pipe(sass())
		.pipe(autoprefixer(['last 15 versions', '> 1%', 'ie 10'], { cascade: true }))
		.pipe(csso())
		.pipe(cssnano())
		.pipe(gulp.dest('app/css'))
		.pipe(browserSync.reload({stream: true}))
});

gulp.task('inky', ['sassMain'], function() {
	return gulp.src('app/*.html')
		.pipe(inky())
		.pipe(gulp.dest('app/'))
});

gulp.task('pug', function() {
	gulp.src('app/pug/pages/**/*.pug')
		.pipe(pug({
			pretty: true,
		}))
		.pipe(gulp.dest('app/'));
	gulp.src('app/pug/**/*.pug')
		.pipe(browserSync.stream())
});



gulp.task('watch', ['browser-sync'], function() {

	gulp.watch('app/sass/**/*.+(scss|sass)', ['sassMain']);
	gulp.watch('app/pug/**/*.pug', gulpSync(['pug', 'inky']));

});



gulp.task('build', function() {

	del.sync(['dist/*', '!dist/img']);

	var buildInky = gulp.src('app/*.html')
		.pipe(inlineSource())
		.pipe(inlineCss({
			preserveMediaQueries: true,
			removeLinkTags: true
		}))
		.pipe(gulp.dest('dist'));

	var imgDist = 'dist/img';
	var builImg = gulp.src('app/img/**/*')
		.pipe(newer(imgDist))
		.pipe(imagemin([
			imagemin.gifsicle({interlaced: true}),
			imagemin.jpegtran({progressive: true}),
			imageminJR({loops: 1, quality: "low"}),
			imagemin.svgo(),
			imagemin.optipng({optimizationLevel: 5}),
			pngquant({quality: "88-100", speed: 5})
		]))
		.pipe(duration('gulp build'))
		.pipe(gulp.dest(imgDist));

});


//BEGIN gulp img
gulp.task('img', function() {
	var builImg = gulp.src('app/img/**/*')
		.pipe(imagemin([
			imagemin.gifsicle({interlaced: true}),
			imagemin.jpegtran({progressive: true}),
			imageminJR({loops: 1, quality: "low"}),
			imagemin.svgo(),
			imagemin.optipng({optimizationLevel: 5}),
			pngquant({quality: "88-100", speed: 5})
		]))
		.pipe(duration('gulp img'))
		.pipe(gulp.dest('dist/img'));
});
//END gulp img

gulp.task('default', ['watch']);
