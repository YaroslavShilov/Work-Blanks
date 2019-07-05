let gulp       = require('gulp'),
	sass         = require('gulp-sass'),
	browserSync  = require('browser-sync'),
	concat       = require('gulp-concat'),
	uglify       = require('gulp-uglify-es').default,
	cssnano      = require('gulp-cssnano'),
	concatCss 	 = require('gulp-concat-css'),
	csso         = require('gulp-csso'),
	del          = require('del'),
	duration     = require('gulp-duration'),
	imagemin     = require('gulp-imagemin'),
	imageminJR 	 = require('imagemin-jpeg-recompress'),
	pngquant     = require('imagemin-pngquant'),
	newer     	 = require('gulp-newer'),
	cache        = require('gulp-cache'),
	autoprefixer = require('gulp-autoprefixer'),
	babel 			 = require('gulp-babel'),
	pug					 = require('gulp-pug'),
	svgSprite    = require('gulp-svg-sprite'),
	svgmin       = require('gulp-svgmin'),
	cheerio      = require('gulp-cheerio'),
	replace      = require('gulp-replace'),
	zip 				 = require('gulp-zip');

gulp.task('browser-sync', function() {
	browserSync({
		server: {
			baseDir: 'app'
		},
		notify: false
	});
});

gulp.task('sassLibs', function() {
	return gulp.src('app/libs/**/**/*.css')
		.pipe(concatCss("_all-libs.scss"))
		.pipe(gulp.dest('app/sass/main'))
});

gulp.task('sassTemp', function() {
	return gulp.src('app/sass/temp/**/*.+(scss|sass)')
		.pipe(concat('_all-temp.scss'))
		.pipe(gulp.dest('app/sass/main'))
		.pipe(browserSync.reload({stream: true}))
});

gulp.task('sassPages', function() {
	return gulp.src('app/sass/pages/**/*.+(scss|sass)')
		.pipe(concat('_all-pages.scss'))
		.pipe(gulp.dest('app/sass/main'))
		.pipe(browserSync.reload({stream: true}))
});

gulp.task('sassBlocks', function() {
	return gulp.src('app/sass/blocks/**/*.+(scss|sass)')
		.pipe(concat('_all-blocks.scss'))
		.pipe(gulp.dest('app/sass/main'))
		.pipe(browserSync.reload({stream: true}))
});

gulp.task('sassMain', function() {
	return gulp.src('app/sass/main/**/*.+(scss|sass)')
		.pipe(sass())
		.pipe(autoprefixer(['last 10 versions', '> 1%', 'ie 11'], { cascade: true }))
		.pipe(gulp.dest('app/css'))
		.pipe(browserSync.reload({stream: true}))
});

gulp.task('jsLibs', function() {
	return gulp.src(['app/libs/**/**/*.js',])
		.pipe(concat('libs.min.js'))
		.pipe(babel())
		.pipe(uglify())
		.pipe(gulp.dest('app/js'))
});

gulp.task('pug', function() {
	return gulp.src('app/pug/pages/**/*.pug')
		.pipe(pug({
			pretty: true,
		}))
		.pipe(gulp.dest('app/'))
		.pipe(browserSync.stream())
});

gulp.task('html', function() {
	return gulp.src('app/*.html')
		.pipe(browserSync.reload({ stream: true }))
});

gulp.task('svg', function() {
	return gulp.src('app/img/svg/icons/*.svg')
		.pipe(svgmin({
			js2svg: {
				pretty: true
			}
		}))
		.pipe(cheerio({
			run: function ($) {
				$('[fill]').removeAttr('fill');
				$('[stroke]').removeAttr('stroke');
				$('[style]').removeAttr('style');
			},
			parserOptions: {xmlMode: true}
		}))
		.pipe(replace('&gt;', '>'))
		.pipe(svgSprite({
			mode: {
				symbol: {
					sprite: "sprite.svg"
				}
			}
		}))
		.pipe(gulp.dest('app/img/svg'));
});


//BEGIN gulp watch
gulp.task('watch', function() {
	//gulp.watch('app/sass/tools/**/*.+(scss|sass)', {readDelay: 100}, ['sassTools', 'sassMain']);

	gulp.watch('app/sass/temp/**/*.+(scss|sass)', gulp.series('sassTemp', 'sassMain'));
	gulp.watch('app/sass/pages/**/*.+(scss|sass)', gulp.series('sassPages', 'sassMain'));
	gulp.watch('app/sass/blocks/**/*.+(scss|sass)', gulp.series('sassBlocks', 'sassMain'));

	gulp.watch('app/sass/tools/**/*.+(scss|sass)', gulp.parallel('sassMain'));
	gulp.watch('app/sass/media/**/*.+(scss|sass)', gulp.parallel('sassMain'));
	gulp.watch('app/sass/main/**/*.+(scss|sass)', gulp.parallel('sassMain'));

	gulp.watch('app/pug/**/*.pug', gulp.parallel('pug'));
	
	gulp.watch('app/img/svg/icons/*.svg', gulp.parallel('svg'));
	
	gulp.watch('app/libs/**/*{js,css,sass,scss}', gulp.series('sassLibs', 'jsLibs', 'html'));
	gulp.watch('app/js/**/*.js', gulp.parallel('html'));

});

gulp.task('default', gulp.parallel('watch', 'browser-sync', 'jsLibs', 'sassLibs', 'svg'));
//END gulp watch



//BEGIN gulp build
gulp.task('build', async function() {

	del.sync(['dist/*', '!dist/img']);

	let buildCss = gulp.src('app/css/**/*')
		.pipe(csso())
		.pipe(cssnano())
		.pipe(gulp.dest('dist/css'));

	let buildFonts = gulp.src('app/fonts/**/*')
		.pipe(gulp.dest('dist/fonts'));

	let buildDocs = gulp.src('app/docs/**/*')
		.pipe(gulp.dest('dist/docs'));

	let buildJs = gulp.src(['app/js/**/*', '!app/js/main.js'])
		.pipe(gulp.dest('dist/js'));

	let unglifyJs = gulp.src('app/js/main.js')
		.pipe(babel())
		.pipe(uglify())
		.pipe(gulp.dest('dist/js'));

	let buildHtml = gulp.src('app/*.html')
		.pipe(gulp.dest('dist'));

	let buildPhp = gulp.src('app/*.php')
		.pipe(gulp.dest('dist'));

	let buildHtaccess = gulp.src('app/.htaccess')
		.pipe(gulp.dest('dist'));

	let buildSvg = gulp.src('app/img/svg/**/*')
		.pipe(gulp.dest('dist/img/svg'));
	
	let imgDist = 'dist/img';
	let builImg = gulp.src(['app/img/**/*', '!app/img/sprites/**/*'])
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
//END gulp build


//BEGIN gulp img
gulp.task('img', async function() {
	let builImg = gulp.src(['app/img/**/*', '!app/img/sprites/**/*'])
	/*
	.pipe(cache(imagemin({
		interlaced: true,
		progressive: true,
		svgoPlugins: [{removeViewBox: false}],
		use: [pngquant()]
	})))*/

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

gulp.task('zip', async function() {
	return gulp.src(['dist/**/*', 'dist/.*'])
		.pipe(zip('dist.zip'))
		.pipe(gulp.dest('./'))
});

gulp.task('clean', async function() {
	return del.sync('dist');
});

gulp.task('clear', async function () {
	return cache.clearAll();
});