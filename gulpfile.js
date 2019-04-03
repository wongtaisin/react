/**
 * 初始化
 * npm install gulp-watch gulp-imagemin gulp-sass gulp-cssmin gulp-uglify gulp-rename gulp-concat gulp-clean gulp-px3rem gulp.spritesmith merge-stream gulp-css-base64 gulp-babel gulp-rev gulp-rev-collector gulp-rev-del gulp-autoprefixer gulp-notify gulp-plumber --save-dev
 */

// 引入 gulp及组件
var gulp = require('gulp'), //基础库
    watch = require('gulp-watch'), //改善watch
    imagemin = require('gulp-imagemin'), //图片压缩
    sass = require('gulp-sass'), //sass
    cssmin = require('gulp-cssmin'), //css压缩
    // jshint = require('gulp-jshint'), //js检查
    uglify = require('gulp-uglify'), //js压缩
    rename = require('gulp-rename'), //重命名
    concat = require('gulp-concat'), //合并文件
    clean = require('gulp-clean'), //清空文件夹
    px2rem = require('gulp-px3rem'), //px自动转rem
    spritesmith = require('gulp.spritesmith'), //自动雪碧图
    merge = require('merge-stream'), //合并管道流
    cssBase64 = require('gulp-css-base64'),
    babel = require('gulp-babel'), //ES6 转换
    rev = require('gulp-rev'), //生成hash
    revCollector = require('gulp-rev-collector'), //替换路径
    revDel = require('gulp-rev-del'), //清理旧的资源文件
    autoprefixer = require('gulp-autoprefixer');

//当发生异常时提示错误 确保本地安装gulp-notify和gulp-plumber
var notify = require('gulp-notify'),
    plumber = require('gulp-plumber');

// browserSync自动刷新
// var browserSync = require('browser-sync').create();

// 静态服务器
// gulp.task('bsc', function () {
//     browserSync.init({
//         server: {
//             baseDir: "./backend/web/static/wap"
//         }
//     });
// });

// 代理
// gulp.task('browser-sync', function () {
//     browserSync.init({
//         proxy: "你的域名或IP"
//     });
// });

// 图片合并
gulp.task('image', function () {
    var timestamp = new Date().getTime();
    var spriteData = gulp.src('resources/images/sprites/*.png').pipe(spritesmith({
        imgName: 'sprite.png',
        cssName: '_sprite.scss',
        imgPath: '../images/wap/sprite.png?' + timestamp,
        padding: 10,
        cssVarMap: function (sprite) {
            sprite.name = 'ico-' + sprite.name;
        }
    }));
    var imgStream = spriteData.img.pipe(gulp.dest('public/statics/images/wap'))
        .pipe(gulp.dest('resources/react/src/images/wap'));
    var cssStream = spriteData.css.pipe(gulp.dest('resources/sass/global/common'));
    return merge(imgStream, cssStream);
});

// css
gulp.task('new_css', function () {
    return gulp.src('resources/scss/main.scss')
        .pipe(plumber(function (error) {
            console.log(error);
            this.emit('end');
        }))
        .pipe(sass())
        .pipe(
            px2rem({
                baseDpr: 2, // base device pixel ratio (default: 2)
                threeVersion: false, // whether to generate @1x, @2x and @3x version (default: false)
                remVersion: true, // whether to generate rem version (default: true)
                remUnit: 75, // rem unit value (default: 75)
                remPrecision: 6 // rem precision (default: 6)
            }))
        .pipe(concat('youxuan_react.css'))
        .pipe(autoprefixer())
        .pipe(cssmin())
        .pipe(rename({
            suffix: '.min'
        }))
        // .pipe(gulp.dest('./backend/web/dist/')) //正式打包
        .pipe(gulp.dest('./resources/react/public/')) //测试的
});

// js
gulp.task('new_js', function () {
    return gulp.src('./resources/js/*.js')
        .pipe(concat('mobile.js'))
        .pipe(babel({
            presets: ['env']
        }))
        .pipe(uglify())
        .pipe(rename({
            suffix: '.min'
        }))
        // .pipe(gulp.dest('./backend/web/static/wap/js'))
        .pipe(gulp.dest('./resources/react/public/'))
});

// 默认任务 清空图片、样式、js并重建 运行语句 gulp
gulp.task('default', ['watch'], function () {
    gulp.start('css', 'lib', 'font', 'scripts');
});

// 监听任务 运行语句 gulp watch
gulp.task('watch', function () {
    gulp.watch(['resources/js/*.js'], ['new_js']);
    gulp.watch(['resources/scss/**/*.scss', '!resources/scss/energy/**/*.scss'], ['new_css']);
});