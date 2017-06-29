var gulp       = require('gulp'), // Подключаем Gulp
	sass         = require('gulp-sass'), //Подключаем Sass пакет,
	browserSync  = require('browser-sync'), // Подключаем Browser Sync
	concat       = require('gulp-concat'), // Подключаем gulp-concat (для конкатенации файлов)
	uglify       = require('gulp-uglifyjs'), // Подключаем gulp-uglifyjs (для сжатия JS)
	cssnano      = require('gulp-cssnano'), // Подключаем пакет для минификации CSS
	rename       = require('gulp-rename'), // Подключаем библиотеку для переименования файлов
	del          = require('del'), // Подключаем библиотеку для удаления файлов и папок
	imagemin     = require('gulp-imagemin'), // Подключаем библиотеку для работы с изображениями
	pngquant     = require('imagemin-pngquant'), // Подключаем библиотеку для работы с png
	cache        = require('gulp-cache'), // Подключаем библиотеку кеширования
	autoprefixer = require('gulp-autoprefixer'),// Подключаем библиотеку для автоматического добавления префиксов
	jade				 = require('gulp-jade'); // Подключаем Шаблонизатор HTML Jade

gulp.task('sass', function(){ // Создаем таск Sass
	return gulp.src('app/sass/**/*.+(scss|sass)') // Берем источник
		.pipe(sass()) // Преобразуем Sass в CSS посредством gulp-sass
		.pipe(autoprefixer(['last 15 versions', '> 1%', 'ie 8'], { cascade: true })) // Создаем префиксы
		.pipe(cssnano()) // Сжимаем
		.pipe(gulp.dest('app/css')) // Выгружаем результата в папку app/css
		.pipe(browserSync.reload({stream: true})) // Обновляем CSS на странице при изменении
});

gulp.task('browser-sync', function() { // Создаем таск browser-sync
	browserSync({ // Выполняем browserSync
		server: { // Определяем параметры сервера
			baseDir: 'app' // Директория для сервера - app
		},
		notify: false // Отключаем уведомления
	});
});

gulp.task('scripts', function() {
	// return gulp.src([ // Берем все необходимые библиотеки
	// 	'app/libs/jquery/dist/jquery.min.js', // Берем jQuery
	// 	'app/libs/magnific-popup/dist/jquery.magnific-popup.min.js' // Берем Magnific Popup
	// 	])
	// 	.pipe(concat('libs.min.js')) // Собираем их в кучу в новом файле libs.min.js
	// 	.pipe(uglify()) // Сжимаем JS файл
	// 	.pipe(gulp.dest('app/js')); // Выгружаем в папку app/js
	return gulp.src(['app/js/main.js'])// сжимаем main.js
		.pipe(concat('main.js'))
		.pipe(uglify())
		.pipe(gulp.dest('dist/js'));
		
});

gulp.task('css-libs', ['sass'], function() {
	return gulp.src('app/css/libs.css') // Выбираем файл для минификации
		.pipe(cssnano()) // Сжимаем
		.pipe(rename({suffix: '.min'})) // Добавляем суффикс .min
		.pipe(gulp.dest('app/css')); // Выгружаем в папку app/css
});

gulp.task('jade', function() {
	gulp.src('app/jade/pages/**/*.jade') // Выбираем файл для компиляции
		.pipe(jade({
			pretty: '  ',
		}))
		.pipe(gulp.dest('app/')); // Компилируем в app
	gulp.src('app/jade/**/*.jade')
		.pipe(browserSync.stream()) // отслеживаем изменения
});

gulp.task('watch', ['browser-sync', 'css-libs'], function() {
	gulp.watch('app/sass/**/*.+(scss|sass)', ['sass']); // Наблюдение за sass файлами в папке sass
	gulp.watch('app/jade/**/*.jade', ['jade']); // Наблюдение за Jade
	gulp.watch('app/*.html', browserSync.reload); // Наблюдение за HTML файлами в корне проекта
	gulp.watch('app/js/**/*.js', browserSync.reload);   // Наблюдение за JS файлами в папке js
});

gulp.task('clean', function() {
	return del.sync('dist'); // Удаляем папку dist перед сборкой
});

gulp.task('img', function() {
	return gulp.src('app/img/**/*') // Берем все изображения из app
		.pipe(cache(imagemin({  // Сжимаем их с наилучшими настройками с учетом кеширования
			interlaced: true,
			progressive: true,
			svgoPlugins: [{removeViewBox: false}],
			use: [pngquant()]
		})))
		.pipe(gulp.dest('dist/img')); // Выгружаем на продакшен
});

gulp.task('build', ['clean', 'img', 'sass', 'scripts'], function() {

	var buildCss = gulp.src('app/css/**/*') // Переносим библиотеки в продакшен
	.pipe(gulp.dest('dist/css'));

	//var buildSass = gulp.src('app/sass/**/*') // Переносим Sass
	//.pipe(gulp.dest('dist/sass'));

	var buildFonts = gulp.src('app/fonts/**/*') // Переносим шрифты в продакшен
	.pipe(gulp.dest('dist/fonts'));

	var buildLibs = gulp.src('app/libs/**/*') // Переносим libs в продакшен
	.pipe(gulp.dest('dist/libs'));

	// var buildJs = gulp.src(['!app/js/main.js', 'app/js/**/*']) // Переносим JS в продакшен
	// .pipe(gulp.dest('dist/js'));

	// var buildJade = gulp.src('app/jade/**/*.jade') // Переносим Jade в продакшен
	// .pipe(gulp.dest('dist/jade'));

	var buildHtml = gulp.src('app/*.html') // Переносим HTML в продакшен
	.pipe(gulp.dest('dist'));

	var buildPhp = gulp.src('app/*.php') // Переносим PHP в продакшен
	.pipe(gulp.dest('dist'));

});

gulp.task('clear', function (callback) {
	return cache.clearAll();
})

gulp.task('default', ['watch']);
