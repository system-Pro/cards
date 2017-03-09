;'use strict';

var browserSync     = require('browser-sync'),
    del             = require('del'),
    gulp            = require('gulp'),
    autoprefixer    = require('gulp-autoprefixer'),
    babel           = require('gulp-babel'),
    cache           = require('gulp-cache'),
    cleancss        = require('gulp-clean-css'),
    concat          = require('gulp-concat'),
    imagemin        = require('gulp-imagemin'),
    plumber         = require('gulp-plumber'),
    rename          = require('gulp-rename'),
    rigger          = require('gulp-rigger'),
    sass            = require('gulp-sass'),
    uglify          = require('gulp-uglify'),
    pngquant        = require('imagemin-pngquant');

var path = {
    build: {
        html: 'build/',
        css: 'build/css/',
        fonts: 'build/fonts/',
        img: 'build/img/',
        js: 'build/js/'
    },
    src: {
        html: 'src/*.html',
        fonts: 'src/fonts/**/*.*',
        img: 'src/img/**/*.*',
        js: 'src/js/app.js',
        style: 'src/style/app.scss',
        es6js: 'src/js/partials/es6.js',
        es6build: 'src/js/partials',
        fontawesomefonts: 'node_modules/font-awesome/fonts/*'
    },
    watch: {
        html: 'src/**/*.html',
        fonts: 'src/fonts/**/*.*',
        img: 'src/img/**/*.*',
        js: ['src/js/**/*.js', '!src/js/partials/es6.js'],
        es6js: 'src/js/partials/es6.js',
        style: 'src/style/**/*.scss'
    },
    clean: './build'
};

var config = {
    server: {
        baseDir: "./build"
    },
    // tunnel: true,
    host: 'localhost',
    port: 9000,
    logPrefix: "LiveReload"
}

gulp.task('es6', function() {
    gulp.src(path.src.es6js)
    .pipe(babel({
        presets: ['es2015']
    }))
    .pipe(rename('main.js'))
    .pipe(gulp.dest(path.src.es6build));
});

gulp.task('html:build', function(){
    gulp.src(path.src.html)
    .pipe(plumber())
    .pipe(rigger())
    .pipe(gulp.dest(path.build.html))
    .pipe(browserSync.reload({stream: true}));
});

gulp.task('fonts:build', function(){
    gulp.src(path.src.fonts)
    .pipe(plumber())
    .pipe(gulp.dest(path.build.fonts));

    gulp.src(path.src.fontawesomefonts)
    .pipe(plumber())
    .pipe(gulp.dest(path.build.fonts));
});

gulp.task('img:build', function(){
    gulp.src(path.src.img)
    .pipe(plumber())
    .pipe(cache(imagemin({
        interlaced: true,
        progressive: true,
        svgoPlugins: [{removeViewBox: false}],
        use: [pngquant()]
    })))
    .pipe(gulp.dest(path.build.img))
    .pipe(browserSync.reload({stream: true}));
});

gulp.task('js:build', function(){
    gulp.src(path.src.js)
    .pipe(plumber())
    .pipe(rigger())
    .pipe(uglify())
    // .pipe(rename({suffix: '.min'}))
    .pipe(rename('main.min.js'))
    .pipe(gulp.dest(path.build.js))
    .pipe(browserSync.reload({stream: true}));
});

gulp.task('style:build', function(){
    gulp.src(path.src.style)
    .pipe(plumber())
    .pipe(sass())
    .pipe(autoprefixer(['last 10 versions', '> 1%'], {cascade: false}))
    .pipe(cleancss())
    // .pipe(rename({suffix: '.min'}))
    .pipe(rename('main.min.css'))
    .pipe(gulp.dest(path.build.css))
    .pipe(browserSync.reload({stream: true}));
});

gulp.task('build', [
    'clean',
    'clear',
    'es6',
    'html:build',
    'fonts:build',
    'img:build',
    'js:build',
    'style:build'
]);

gulp.task('watch', ['build'], function(){
    gulp.watch(path.watch.html, ['html:build']);
    gulp.watch(path.watch.fonts, ['fonts:build']);
    gulp.watch(path.watch.img, ['img:build']);
    gulp.watch(path.watch.js, ['js:build']);
    gulp.watch(path.watch.es6js, ['es6']);
    gulp.watch(path.watch.style, ['style:build']);
});

gulp.task('browser-sync', function(){
    browserSync(config);
});

gulp.task('clean', function(){
    return del.sync(path.clean);
});

gulp.task('clear', function(){
    return cache.clearAll();
});

gulp.task('default', ['build', 'browser-sync', 'watch']);
