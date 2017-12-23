var gulp=require('gulp')
var sass=require('gulp-sass')
var rename=require('gulp-rename')
gulp.task('styles', function (){
    gulp
        .src('index.scss')
        .pipe(sass())
        .pipe(rename('Materialize.css'))
        .pipe(gulp.dest('assets/styles'))
})

gulp.task('default',['styles'])