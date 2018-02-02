var gulp         = require('gulp');
var rename       = require('gulp-rename');
var autoprefixer = require('gulp-autoprefixer');
var cssnano      = require('gulp-cssnano');
var notify       = require('gulp-notify');
var browserSync  = require('browser-sync').create();
var sass         = require('gulp-sass');

// Compile sass into CSS & auto-inject into browsers
gulp.task('sass', function() {
    return gulp.src(['node_modules/bootstrap/scss/bootstrap.scss', 'sass/*.scss', 'sass/*.sass'])
        .pipe(sass().on("error", notify.onError()))
        .pipe(rename({suffix: '.min', prefix : ''}))
        .pipe(autoprefixer({
            browsers: ['last 12 versions'],
            cascade: false
         }))
        .pipe(cssnano())
        .pipe(gulp.dest("css"))
        .pipe(browserSync.reload({stream: true}));
});

// Move the javascript files into our /src/js folder
gulp.task('js', function() {
    return gulp.src(['node_modules/bootstrap/dist/js/bootstrap.min.js', 'node_modules/jquery/dist/jquery.min.js', 'node_modules/popper.js/dist/umd/popper.min.js'])
        .pipe(gulp.dest("js"))
        .pipe(browserSync.stream());
});

// Static Server + watching scss/html files
gulp.task('serve', ['sass'], function() {

    browserSync.init({
        server: "./"  
    });

    gulp.watch(['node_modules/bootstrap/scss/bootstrap.scss', 'sass/*.scss', 'sass/*.sass'], ['sass']);
    gulp.watch("*.html").on('change', browserSync.reload);
});

gulp.task('default', ['js','serve']);