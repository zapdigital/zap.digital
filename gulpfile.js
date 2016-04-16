var gulp 				 = require('gulp'),
    postcss 		 = require('gulp-postcss'),
    sourcemaps   = require('gulp-sourcemaps'),
    precss       = require('precss'),
    lost 				 = require('lost'),
    rucksack     = require('rucksack-css'),
    flexboxFixes = require('postcss-flexbugs-fixes');
    imagemin		 = require('gulp-imagemin'),
    htmlmin 		 = require('gulp-htmlmin');

var browserSync  = require('browser-sync');
var reload 			 = browserSync.reload;

// Styles - PostCSS, Lost, Rucksack, sourcemaps
gulp.task('styles', function() {
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
gulp.task('browser-sync', function() {
	browserSync({
		server: {
			baseDir: './dist'
		}
	});
});

// Watch
gulp.task('watch', function() {

	// Watch css files
	gulp.watch('./src/**/*.css', ['styles', reload]);

	// Watch html files
	gulp.watch('./src/*.html', ['minify', reload]);

	// Watch image files
	gulp.watch('./src/img/*', ['images', reload]);
});

// Images
gulp.task('images', function() {
	return gulp.src('src/img/*')
		.pipe(imagemin({
			progressive: true,
			svgoPlugins: [{removeViewBox: false}]
		}))
		.pipe(gulp.dest('dist/img'));
});

// Minify
gulp.task('markup', function() {
	return gulp.src('src/*.html')
		.pipe(htmlmin({collapseWhitespace: true}))
		.pipe(gulp.dest('dist'))
});

// Build
gulp.task('build', ['styles', 'markup', 'images']);

// Default
gulp.task('default', ['browser-sync', 'watch', 'styles', 'images', 'markup']);
