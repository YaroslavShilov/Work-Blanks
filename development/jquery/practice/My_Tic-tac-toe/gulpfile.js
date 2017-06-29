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

gulp.task('jade', function() {
	gulp.src('app/jade/*.jade') // Выбираем файл для компиляции
		.pipe(jade({
			pretty: '  ',
		}))
		.pipe(gulp.dest('app/')); // Компилируем в app
	gulp.src('app/jade/**/*.jade')
		.pipe(browserSync.stream()) // отслеживаем изменения
});

gulp.task('watch', ['browser-sync'], function() {
	gulp.watch('app/sass/**/*.+(scss|sass)', ['sass']); // Наблюдение за sass файлами в папке sass
	gulp.watch('app/jade/**/*.jade', ['jade']); // Наблюдение за Jade
	gulp.watch('app/*.html', browserSync.reload); // Наблюдение за HTML файлами в корне проекта
	gulp.watch('app/js/**/*.js', browserSync.reload);   // Наблюдение за JS файлами в папке js
});

// Begin Build
gulp.task('clean', function() {
	return del.sync('dist'); // Удаляем папку dist перед сборкой
});

gulp.task('build', ['clean'], function() {
	var buildCss = gulp.src('app/css/**/*') // Переносим библиотеки в продакшен
		.pipe(cssnano()) // Сжимаем
		.pipe(gulp.dest('dist/css'));

	var buildJs = gulp.src(['app/js/**/*.js']) // Переносим JS в продакшен
	.pipe(concat('main.js'))
	.pipe(uglify())
	.pipe(gulp.dest('dist/js'));

	var buildHtml = gulp.src('app/*.html') // Переносим HTML в продакшен
	.pipe(gulp.dest('dist'));

});

gulp.task('clear', function (callback) {
	return cache.clearAll();
})

gulp.task('default', ['watch']);
