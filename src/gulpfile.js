/*
* путь к картинкам если вставлять в php файл ../../wp-content/themes/ipromo/images/.....
* картинки заружать в wp-content/themes/ipromo/src/images/....
* js файлы в wp-content/themes/ipromo/src/js/.....
*
* время от времени подчищать папку src/images командой gulp cleanImg
*
* на сервер загружать только картинки с папки wp-content/themes/ipromo/images  !!!!
* из папки src/images загружать не нужно
* */


"use strict";
const   gulp            =       require("gulp"),
        autoprefixer    =       require("autoprefixer"),
        postcss         =       require('gulp-postcss'),
        del             =       require("del"),
        sourcemaps      =       require("gulp-sourcemaps"),
        csscomb         =       require("gulp-csscomb"),
        imagemin        =       require('gulp-imagemin'),
        plumber         =       require("gulp-plumber"),
        sass            =       require("gulp-sass"),
        cssbeautify     =       require("gulp-cssbeautify"),
        uglify          =       require("gulp-uglify-es").default,
        cssnano         =       require("gulp-cssnano"),
        rename          =       require('gulp-rename'),
        watch           =       require("gulp-watch"),
        rigger          =       require('gulp-rigger'),
        run             =       require("run-sequence");

const path = {
    buildHtml: '../',
    srcHtml: 'template/**/*.html',
    scss: 'scss/**/*.scss',
    css: '../css/',
    srcJs: 'js/*.js',
    buildJs: '../js/',
    srcImages : 'images/**/*.*',
    buildImages: '../images/',
    srcFonts: 'fonts/',
    buildFonts: '../fonts/'

};
gulp.task('css', function () {
   gulp.src(path.scss)
       .pipe(plumber())
       .pipe(sourcemaps.init())
       .pipe(sass({
           sourceComments: 'normal'
       }))
       .pipe(sourcemaps.write())
       .pipe(cssbeautify())
       .pipe(csscomb())
       .pipe(postcss([ autoprefixer('last 15 versions', '> 1%', 'ie 8', 'ie 7')]))
       .pipe(gulp.dest(path.css))
       .pipe(cssnano())
       .pipe(rename({suffix: '.min'}))
       .pipe(gulp.dest(path.css))
});

gulp.task('js', function () {
    gulp.src(path.srcJs)
        .pipe(plumber())
        .pipe(uglify())
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest(path.buildJs))
});

gulp.task('img', function () {
   gulp.src(path.srcImages)
       .pipe(imagemin({
           optimizationLevel: 3,
           progressive: true,
           svgoPlugins: [{removeViewBox: false}],
           interlaced: true
       }))
       .pipe(gulp.dest(path.buildImages))
});

gulp.task('cleanImg', function () {
    return del.sync(['images/**/*', '!./images'])
});

gulp.task('html:build', function () {
    gulp.src(path.srcHtml) //Выберем файлы по нужному пути
        .pipe(rigger()) //Прогоним через rigger
        .pipe(gulp.dest(path.buildHtml)) //выгрузим их в папку build
});

gulp.task('watch', function () {
   watch([path.scss], function () {
       gulp.start('css')
   });
   watch([path.srcJs], function () {
       gulp.start('js')
   });
   watch([path.srcImages], function () {
       gulp.start('img');
   });
    watch([path.srcHtml], function () {
        gulp.start('html:build');
    })
});


gulp.task('default', function (cb) {
   run(
       'css',
       'js',
       'img',
       'watch',
       'html:build',

       cb
   )
});


