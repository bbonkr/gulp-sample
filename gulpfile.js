var gulp = require('gulp');
var minifyjs = require('gulp-uglify');
var concat = require('gulp-concat');
var minifycss = require('gulp-clean-css');
var minifyhtml = require('gulp-minify-html');
var browserSync = require('browser-sync').create();

// dist 디렉터리를 기본 위치로 웹서버를 실행합니다.
gulp.task('server', ['minifyjs', 'minifycss', 'minifyhtml'], function(){
    return browserSync.init({
        server: {
            baseDir: 'dist',
            startPath:'dist/html/index.html',
            index: '/html/index.html'
        }
    });
});

gulp.task('minifyhtml', function(){
    return gulp.src('src/**/*.html')
        .pipe(minifyhtml())
        .pipe(gulp.dest('dist'))
        .pipe(browserSync.reload({stream:true}));
});

gulp.task('minifyjs', function(){
    return gulp.src('src/**/*.js')     // src 디렉터리 하위의 js 파일을 
        .pipe(concat('main.js'))        // main.js로 병합하고
        .pipe(minifyjs())                 // minify 후
        .pipe(gulp.dest('dist/js'))     // dist/js/main.js로 저장
        .pipe(browserSync.reload({stream:true}));
});

gulp.task('minifycss', function(){
    return gulp.src('src/**/*.css')
        .pipe(concat('main.css'))
        .pipe(minifycss())
        .pipe(gulp.dest('dist/css'))
        .pipe(browserSync.reload({stream:true}));
});

gulp.task('watch-src', function(){
    gulp.watch('src/**/*.js', ['minifyjs']);
    gulp.watch('src/**/*.css', ['minifycss']);
    gulp.watch('src/**/*.html', ['minifyhtml']);
});

// 기본 작업을 지정
// gulp.task('default', ['uglify', 'watch']);
gulp.task('default', ['server', 'watch-src']);