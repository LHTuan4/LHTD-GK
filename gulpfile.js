var gulp = require("gulp"),
	concat = require("gulp-concat")
	nodemon = require("gulp-nodemon");

gulp.task("js", function(){
	gulp.src('./public/src/js/**/*.js')
		.pipe(concat("index.js"))
		.pipe(gulp.dest('./public/build/js'));
})

gulp.task("others", function(){
	gulp.src('./public/src/**/*.{html,css}')
		.pipe(gulp.dest('./public/build'));
})

gulp.task("watch", function(){
	gulp.watch('./public/src/js/**/*.js', ['js']);
	gulp.watch('./public/src/**/*.{html, css}', ['others']);
})

gulp.task("nodemon", ['js', 'others', 'watch'], function(){
	nodemon({
		 script: 'index.js',
		 ignore: 'public',
		 ext: 'js html',
		 env: { 'NODE_ENV': 'development' }
	})
})

gulp.task("default", ['nodemon']);