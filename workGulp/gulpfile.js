var gulp       = require('gulp'),
	sass         = require('gulp-sass'),
	browserSync  = require('browser-sync'),
	concat       = require('gulp-concat'),
	uglify       = require('gulp-uglifyjs'),
	cssnano      = require('gulp-cssnano'),
	rename       = require('gulp-rename'),
	concatCss 	 = require('gulp-concat-css'),
	del          = require('del'),
	imagemin     = require('gulp-imagemin'),
	pngquant     = require('imagemin-pngquant'),
	cache        = require('gulp-cache'),
	autoprefixer = require('gulp-autoprefixer'),
	jade				 = require('gulp-jade');

gulp.task('sasslibs', function() {
	return gulp.src('app/libs/**/**/*.css')
		.pipe(concatCss("_libs.scss"))
		.pipe(gulp.dest('app/sass/tools'))
		.pipe(browserSync.reload({stream: true}))
});

gulp.task('sass', function(){
	return gulp.src('app/sass/**/*.+(scss|sass)')
		.pipe(sass())
		.pipe(autoprefixer(['last 15 versions', '> 1%', 'ie 8'], { cascade: true }))
		.pipe(cssnano())
		.pipe(gulp.dest('app/css'))
		.pipe(browserSync.reload({stream: true}))
});

gulp.task('browser-sync', function() {
	browserSync({
		server: {
			baseDir: 'app'
		},
		notify: false
	});
});

gulp.task('scripts', function() {
	return gulp.src([
		'app/libs/**/**/*.js',
		])
		.pipe(concat('libs.min.js'))
		.pipe(uglify())
		.pipe(gulp.dest('app/js'));
});


gulp.task('jade', function() {
	gulp.src('app/jade/pages/**/*.jade')
		.pipe(jade({
			pretty: '  ',
		}))
		.pipe(gulp.dest('app/'));
	gulp.src('app/jade/**/*.jade')
		.pipe(browserSync.stream())
});

gulp.task('watch', ['browser-sync', 'sasslibs', 'scripts'], function() {
	gulp.watch('app/sass/**/*.+(scss|sass)', ['sass']);
	gulp.watch('app/jade/**/*.jade', ['jade']);
	gulp.watch('app/*.html', browserSync.reload);
	gulp.watch('app/js/**/*.js', browserSync.reload);
});

gulp.task('clean', function() {
	return del.sync('dist');
});

gulp.task('img', function() {
	return gulp.src('app/img/**/*')
		.pipe(cache(imagemin({
			interlaced: true,
			progressive: true,
			svgoPlugins: [{removeViewBox: false}],
			use: [pngquant()]
		})))
		.pipe(gulp.dest('dist/img'));
});

gulp.task('build', ['clean', 'img', 'sass', 'scripts'], function() {

	var buildCss = gulp.src('app/css/**/*')
	.pipe(gulp.dest('dist/css'));

	var buildFonts = gulp.src('app/fonts/**/*')
	.pipe(gulp.dest('dist/fonts'));

	var buildJs = gulp.src(['app/js/**/*', '!app/js/main.js'])
	.pipe(gulp.dest('dist/js'));

	var unglifyJs = gulp.src('app/js/main.js')
	.pipe(uglify())
	.pipe(gulp.dest('dist/js'));

	var buildHtml = gulp.src('app/*.html')
	.pipe(gulp.dest('dist'));

	var buildPhp = gulp.src('app/*.php')
	.pipe(gulp.dest('dist'));

});

gulp.task('clear', function (callback) {
	return cache.clearAll();
})

gulp.task('default', ['watch']);
