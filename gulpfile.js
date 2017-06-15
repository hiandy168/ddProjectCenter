/*
* @Author: Administrator
* @Date:   2017-03-28 15:18:55
* @Last Modified by:   Administrator
* @Last Modified time: 2017-05-10 16:50:31
*/

'use strict';
var gulp = require("gulp");
var browserSync = require('browser-sync');

//browserSync
gulp.task("browserSync",function(){
	browserSync({
        server: {
            //指定服务器启动根目录
            baseDir: "./"
        }
    });
    //监听任何文件变化，实时刷新页面
    gulp.watch("./*.*").on('change', browserSync.reload);
    gulp.watch("./src/**/*.*").on('change', browserSync.reload);
    gulp.watch("./src/base/**/*.*").on('change', browserSync.reload);
});

// gulp-babel
// var babel = require("gulp-babel");

// gulp.task("default", function () {
//   return gulp.src("src/babeljs.js")
//     .pipe(babel())
//     .pipe(gulp.dest("dist"));
// });

var uglify = require("gulp-uglify");
var stripDebug = require('gulp-strip-debug');
gulp.task('minijs', function () {
    gulp.src('src/js/*.js') // 要压缩的js文件
    .pipe(stripDebug()) //去除debug信息
    .pipe(uglify())  //使用uglify进行压缩,更多配置请参考：
    .pipe(gulp.dest('dist/js')); //压缩后的路径
});

var minify = require('gulp-minify-css');
gulp.task('cssmini', function () {
    gulp.src(['src/css/*.css', '!css/*.min.css'])  //要压缩的css
        .pipe(minify())
        .pipe(gulp.dest('dist/css/'));
});
