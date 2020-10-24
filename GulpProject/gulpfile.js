const {src, dest, parallel, series, watch, task} = require('gulp');
const
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

task('browser-sync', function() {
	browserSync({
		server: {
			baseDir: 'app'
		},
		notify: false
	});
});

task('sassLibs', function() {
	return src('app/libs/**/**/*.css')
		.pipe(concatCss("_all-libs.scss"))
		.pipe(dest('app/sass/main'))
});

task('sassTemp', function() {
	return src('app/sass/temp/**/*.+(scss|sass)')
		.pipe(concat('_all-temp.scss'))
		.pipe(dest('app/sass/main'))
		.pipe(browserSync.reload({stream: true}))
});

task('sassPages', function() {
	return src('app/sass/pages/**/*.+(scss|sass)')
		.pipe(concat('_all-pages.scss'))
		.pipe(dest('app/sass/main'))
		.pipe(browserSync.reload({stream: true}))
});

task('sassBlocks', function() {
	return src('app/sass/blocks/**/*.+(scss|sass)')
		.pipe(concat('_all-blocks.scss'))
		.pipe(dest('app/sass/main'))
		.pipe(browserSync.reload({stream: true}))
});

task('sassMain', function() {
	return src('app/sass/main/**/*.+(scss|sass)')
		.pipe(sass())
		.pipe(autoprefixer(['last 10 versions', '> 1%', 'ie 11'], { cascade: true }))
		.pipe(dest('app/css'))
		.pipe(browserSync.reload({stream: true}))
});

task('jsLibs', function() {
	return src(['app/libs/**/**/*.js',])
		.pipe(concat('libs.min.js'))
		.pipe(babel({
			presets: ['@babel/env']
		}))
		.pipe(uglify())
		.pipe(dest('app/js'))
});

task('pug', function() {
	return src('app/pug/pages/**/*.pug')
		.pipe(pug({
			pretty: true,
		}))
		.pipe(dest('app/'))
		.pipe(browserSync.stream())
});

task('html', function() {
	return src('app/*.html')
		.pipe(browserSync.reload({ stream: true }))
});

task('svg', function() {
	return src('app/img/svg/icons/*.svg')
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
		.pipe(dest('app/img/svg'));
});


//BEGIN gulp watch
task('watch', function() {
	//watch('app/sass/tools/**/*.+(scss|sass)', {readDelay: 100}, ['sassTools', 'sassMain']);

	watch('app/sass/temp/**/*.+(scss|sass)', series('sassTemp', 'sassMain'));
	watch('app/sass/pages/**/*.+(scss|sass)', series('sassPages', 'sassMain'));
	watch('app/sass/blocks/**/*.+(scss|sass)', series('sassBlocks', 'sassMain'));

	watch('app/sass/tools/**/*.+(scss|sass)', parallel('sassMain'));
	watch('app/sass/media/**/*.+(scss|sass)', parallel('sassMain'));
	watch('app/sass/main/**/*.+(scss|sass)', parallel('sassMain'));

	watch('app/pug/**/*.pug', parallel('pug'));
	
	watch('app/img/svg/icons/*.svg', parallel('svg'));
	
	watch('app/libs/**/*{js,css,sass,scss}', series('sassLibs', 'jsLibs', 'html'));
	watch('app/js/**/*.js', parallel('html'));

});

task('default', parallel('watch', 'browser-sync', 'jsLibs', 'sassLibs', 'svg'));
//END gulp watch



//BEGIN gulp build
task('build', async function() {

	del.sync(['dist/*', '!dist/img']);

	let buildCss = src('app/css/**/*')
		.pipe(csso())
		.pipe(cssnano())
		.pipe(dest('dist/css'));

	let buildFonts = src('app/fonts/**/*')
		.pipe(dest('dist/fonts'));

	let buildDocs = src('app/docs/**/*')
		.pipe(dest('dist/docs'));

	let buildJs = src(['app/js/**/*', '!app/js/main.js'])
		.pipe(dest('dist/js'));

	let unglifyJs = src('app/js/main.js')
		.pipe(babel({
			presets: ['@babel/env']
		}))
		.pipe(uglify())
		.pipe(dest('dist/js'));

	let buildHtml = src('app/*.html')
		.pipe(dest('dist'));

	let buildPhp = src('app/*.php')
		.pipe(dest('dist'));

	let buildHtaccess = src('app/.htaccess')
		.pipe(dest('dist'));

	let buildSvg = src('app/img/svg/**/*')
		.pipe(dest('dist/img/svg'));
	
	let imgDist = 'dist/img';
	let builImg = src(['app/img/**/*', '!app/img/sprites/**/*'])
		.pipe(newer(imgDist))
		// .pipe(imagemin([
		// 	imagemin.gifsicle({interlaced: true}),
		// 	imagemin.jpegtran({progressive: true}),
		// 	imageminJR({loops: 1, quality: "low"}),
		// 	imagemin.svgo(),
		// 	imagemin.optipng({optimizationLevel: 5}),
		// 	pngquant({quality: "88-100", speed: 5})
		// ]))
		.pipe(duration('gulp build'))
		.pipe(dest(imgDist));
	
});
//END gulp build


//BEGIN gulp img
task('img', async function() {
	let builImg = src(['app/img/**/*', '!app/img/sprites/**/*'])
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
	.pipe(dest('dist/img'));
});
//END gulp img

task('zip', async function() {
	return src(['dist/**/*', 'dist/.*'])
		.pipe(zip('dist.zip'))
		.pipe(dest('./'))
});

task('clean', async function() {
	return del.sync('dist');
});

task('clear', async function () {
	return cache.clearAll();
});