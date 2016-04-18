var gulp 				 = require('gulp');
var postcss 		 = require('gulp-postcss');
var sourcemaps   = require('gulp-sourcemaps');
var precss       = require('precss');
var lost 				 = require('lost');
var rucksack     = require('rucksack-css');
var flexboxFixes = require('postcss-flexbugs-fixes');
var imagemin		 = require('gulp-imagemin');
var slim 				 = require('gulp-slim');
var ghPages 		 = require('gulp-gh-pages');

var browserSync  = require('browser-sync');
var reload 			 = browserSync.reload;

// Styles - PostCSS, Lost, Rucksack, sourcemaps
gulp.task('styles', function () {
	return gulp.src('./src/css/*.css')
		.pipe(sourcemaps.init())
		.pipe(postcss([
			precss(),
			lost(),
			rucksack({
				autoprefixer: true
			}),
			flexboxFixes()
		]))
		.pipe(sourcemaps.write())
		.pipe(gulp.dest('./dist/css'))
		.pipe(reload({stream: true}));
});

// Start static server and watch files
gulp.task('browser-sync', function () {
	browserSync({
		server: {
			baseDir: './dist'
		}
	});
});

// Watch
gulp.task('watch', function () {

	// Watch css files
	gulp.watch('./src/**/*.css', ['styles', reload]);

	// Watch slim files
	gulp.watch('./src/views/*.slim', ['markup', reload]);

	// Watch image files
	gulp.watch('./src/img/*', ['images', reload]);
});

// Images
gulp.task('images', function () {
	return gulp.src('src/img/*')
		.pipe(imagemin({
			progressive: true,
			svgoPlugins: [{removeViewBox: false}]
		}))
		.pipe(gulp.dest('dist/img'));
});

// Minify
gulp.task('markup', function () {
	return gulp.src('src/views/*.slim')
		.pipe(slim({
			require: 'slim/include',
			options: 'include_dirs=["./src/views/includes"]'
    }))
    .pipe(gulp.dest('dist/'));
});

// Build
gulp.task('build', ['styles', 'markup', 'images']);

// Deploy
gulp.task('deploy', ['build'], function () {
	return gulp.src('./dist/**/*')
		.pipe(ghPages({
				branch: 'master',
				force: true
			}))
})

// Default
gulp.task('default', ['browser-sync', 'watch', 'styles', 'images', 'markup']);
