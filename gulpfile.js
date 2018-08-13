// Mówimy node-owi, żeby zajrzał do folderu node_modules i poszukał gulp-a.
var gulp = require('gulp');

// uzywamy sass
var sass = require('gulp-sass'); /* Wymagamy użycia wtyczki gulp-sass */
var sourcemaps = require('gulp-sourcemaps');

gulp.task('sass', function() {
    return gulp.src('scss/main.scss')  /* Przeszukaj wczytaj plik  main.scss */
        .pipe(sourcemaps.init()) //inicjalizacja mapy
        .pipe(sass({
            errLogToConsole: true,
            outputStyle: 'expanded'
        }))
        .pipe(sourcemaps.write())  //dalszy kod sourcemaps
        .pipe(gulp.dest('css'))
});

// watch
gulp.task('watch', function() {
    gulp.watch('scss/*.scss', ['sass']);
});
