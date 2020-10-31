const {src, dest, parallel, series, watch, task} = require('gulp')

const
	sass         = require('gulp-sass'),
	csso         = require('gulp-csso'),
	cssnano      = require('gulp-cssnano'),
	browserSync  = require('browser-sync'),
	del          = require('del'),
	autoprefixer = require('gulp-autoprefixer'),
	pug					 = require('gulp-pug'),
	inky 				 = require('inky'),
	inlineCss		 = require('gulp-inline-css'),
	inlineSource = require('gulp-inline-source');

task('browser-sync', function() {
	browserSync({
		server: {
			baseDir: 'app'
		},
		notify: false
	});
});

task('sass', function(){
	return src('app/sass/main/**/*.+(scss|sass)')
		.pipe(sass())
		.pipe(autoprefixer(['last 15 versions', '> 1%', 'ie 10'], { cascade: true }))
		.pipe(csso())
		.pipe(cssnano())
		.pipe(dest('app/css'))
		.pipe(browserSync.reload({stream: true}))
});

task('inky', series('sass', function() {
	return src('app/*.html')
		.pipe(inky())
		.pipe(dest('app/'))
}));

task('pug', function() {
	return src('app/pug/pages/**/*.pug')
		.pipe(pug({
			pretty: true,
		}))
		.pipe(dest('app/'))
		.pipe(browserSync.stream())
});



task('watch', function() {

	watch('app/sass/**/*.+(scss|sass)', series('sass'));
	watch('app/pug/**/*.pug', series('pug', 'inky'));

});



task('build', async function() {

	del.sync(['dist/*']);

	let buildInky = src('app/*.html')
		.pipe(inlineSource())
		.pipe(inlineCss({
			preserveMediaQueries: true,
			removeLinkTags: true
		}))
		.pipe(dest('dist'));

	let builImg = src('app/img/**/*')
		.pipe(dest('dist/img'));

});


task('default', parallel('watch', 'browser-sync'));
