var gulp       = require('gulp'),
	sass         = require('gulp-sass'),
	browserSync  = require('browser-sync'),
	concat       = require('gulp-concat'),
	uglify       = require('gulp-uglify-es').default,
	rename       = require('gulp-rename'),
	cssnano      = require('gulp-cssnano'),
	concatCss 	 = require('gulp-concat-css'),
	csso         = require('gulp-csso'),
	del          = require('del'),
	duration     = require('gulp-duration'),
	imagemin     = require('gulp-imagemin'),
	imageminJR 	 = require('imagemin-jpeg-recompress'),
	pngquant     = require('imagemin-pngquant'),
	newer     	 = require('gulp-newer'),
	webp 				 = require('gulp-webp'),
	cache        = require('gulp-cache'),
	autoprefixer = require('gulp-autoprefixer'),
	babel 			 = require('gulp-babel'),
	pug					 = require('gulp-pug'),
	gulpSync 		 = require('gulp-sync')(gulp).sync,
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
		//.pipe(browserSync.reload({stream: true}))
});

gulp.task('sassTemp', function() {
	return gulp.src('app/sass/temp/**/*.+(scss|sass)')
		.pipe(concat('_all-temp.scss'))
		.pipe(gulp.dest('app/sass/main'))
		.pipe(browserSync.reload({stream: true}))
})

gulp.task('sassPages', function() {
	return gulp.src('app/sass/pages/**/*.+(scss|sass)')
		.pipe(concat('_all-pages.scss'))
		.pipe(gulp.dest('app/sass/main'))
		.pipe(browserSync.reload({stream: true}))
})

gulp.task('sassBlocks', function() {
	return gulp.src('app/sass/blocks/**/*.+(scss|sass)')
		.pipe(concat('_all-blocks.scss'))
		.pipe(gulp.dest('app/sass/main'))
		.pipe(browserSync.reload({stream: true}))
})

gulp.task('sassMain', function(){
	return gulp.src('app/sass/main/**/*.+(scss|sass)')
		.pipe(sass())
		.pipe(autoprefixer(['last 15 versions', '> 1%', 'ie 10'], { cascade: true }))
		.pipe(gulp.dest('app/css'))
		.pipe(browserSync.reload({stream: true}))
});


gulp.task('scripts', function() {
	return gulp.src([
		'app/libs/**/**/*.js',
		])
		.pipe(concat('libs.min.js'))
		.pipe(babel())
		.pipe(uglify())
		.pipe(gulp.dest('app/js'))
});


gulp.task('pug', function() {
	gulp.src('app/pug/pages/**/*.pug')
		.pipe(pug({
			pretty: false,
		}))
		.pipe(gulp.dest('app/'))
		.pipe(browserSync.stream())

	//gulp.src('app/pug/**/*.pug')
		// .on('data', function(file) {
		// 	console.log(file);
		// })
		
});


//BEGIN gulp watch
gulp.task('watch', ['browser-sync', 'scripts', 'sassLibs'], function() {
	//gulp.watch('app/sass/tools/**/*.+(scss|sass)', {readDelay: 100}, ['sassTools', 'sassMain']);

	gulp.watch('app/sass/temp/**/*.+(scss|sass)', gulpSync(['sassTemp', 'sassMain']));
	gulp.watch('app/sass/pages/**/*.+(scss|sass)', gulpSync(['sassPages', 'sassMain']));
	gulp.watch('app/sass/blocks/**/*.+(scss|sass)', gulpSync(['sassBlocks', 'sassMain']));

	gulp.watch('app/sass/tools/**/*.+(scss|sass)', ['sassMain']);
	gulp.watch('app/sass/media/**/*.+(scss|sass)', ['sassMain']);
	gulp.watch('app/sass/main/**/*.+(scss|sass)', ['sassMain']);

	gulp.watch('app/pug/**/*.pug', ['pug']);
	//gulp.watch('app/*.html', browserSync.reload);

	gulp.watch('app/js/**/*.js', browserSync.reload);

});
//END gulp watch


//BEGIN gulp build
gulp.task('build', function() {

	del.sync(['dist/*', '!dist/img']);

	var buildCss = gulp.src('app/css/**/*')
		.pipe(csso())
		.pipe(cssnano())
		.pipe(gulp.dest('dist/css'));

	var buildFonts = gulp.src('app/fonts/**/*')
		.pipe(gulp.dest('dist/fonts'));

	var buildDocs = gulp.src('app/docs/**/*')
		.pipe(gulp.dest('dist/docs'));

	var buildJs = gulp.src(['app/js/**/*', '!app/js/main.js'])
		.pipe(gulp.dest('dist/js'));

	var unglifyJs = gulp.src('app/js/main.js')
		.pipe(babel())
		.pipe(uglify())
		.pipe(gulp.dest('dist/js'));

	var buildHtml = gulp.src('app/*.html')
		.pipe(gulp.dest('dist'));

	var buildPhp = gulp.src('app/*.php')
		.pipe(gulp.dest('dist'));

	var buildHtaccess = gulp.src('app/.htaccess')
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
//END gulp build


//BEGIN gulp img
gulp.task('img', function() {
	var builImg = gulp.src('app/img/**/*')
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

	// var buldWebp = gulp.src('dist/img/**/*')
	// 	.pipe(webp())
	// 	.pipe(gulp.dest(imgDist))
});
//END gulp img

gulp.task('zip', function() {
	var buildZip = gulp.src(['dist/**/*', 'dist/.*'])
		.pipe(zip('dist.zip'))
		.pipe(gulp.dest(''))
});

gulp.task('clean', function() {
	return del.sync('dist');
});

gulp.task('clear', function (callback) {
	return cache.clearAll();
})

gulp.task('default', ['watch']);
