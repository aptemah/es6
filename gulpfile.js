(function(){
		'use strict';

		var gulp = require('gulp');
		var sourcemaps = require('gulp-sourcemaps');
		var sass = require('gulp-sass');

		var sassLint = require('gulp-sass-lint');
		var jslint = require('gulp-jslint');
		var csslint = require('gulp-csslint');

		var autoprefixer = require('gulp-autoprefixer');
		var concat = require('gulp-concat');
		var gcmq = require('gulp-group-css-media-queries');
		var concatCss = require('gulp-concat-css');
		var uglify = require('gulp-uglify');
		var del = require('del');
		var nano = require('gulp-cssnano');
		var order = require("gulp-order");
		var purify = require('gulp-purifycss');
		const babel = require('gulp-babel');

		var paths = {
			src: {
				css: './src/css/*',
				js: './src/js/*.js'
			},
			build: {
				css: './css',
				js: './js'
			}
		};

		var options = {
				concatCss: {
						rebaseUrls: false
				},
				sass: {
					errLogToConsole: true,
					// outputStyle: 'compressed'
				},
				autoprefixer: {
					browsers: ['last 5 versions']
				},
				nano : {
					zindex: false
				},
				sassLint : {
					rules: {
						'indentation' : [1, {'size' : 'tab'}],
						'class-name-format' : [1, {'convention' : 'hyphenatedbem'}],
						'property-sort-order' : 0,
						'no-color-literals' : 0,
						'no-mergeable-selectors': 0,
					},
				},
				jslint : {
					'white' : true,
					'global' : ['$'],
					'browser' : true
				},
				csslint : {
					'compatible-vendor-prefixes' : false,
					'adjoining-classes' : false,
					'order-alphabetical' : false,
					'box-model' : false,
				}
		};

		function cleanCSSTask(){
				return del(['./css/style.min.css']);
		}
		function cssTask(){
			gulp.src(paths.src.css)
				.pipe(order([
					'vendor/*'
				]))
				.pipe(sourcemaps.init())
				.pipe(sass(options.sass).on('error', sass.logError))
				.pipe(autoprefixer(options.autoprefixer))
				.pipe(concat('style.min.css'))
				.pipe(gcmq())
				.pipe(nano(options.nano))
				//.pipe(purify(['index.php', 'new_js/*.js']),paths.src.css,{info: true})
				.pipe(sourcemaps.write('/'))
				.pipe(gulp.dest(paths.build.css));
		}

		function cssPost(){
			gulp.src('./css/style.min.css')
				.pipe(gcmq())
				.pipe(gulp.dest('./css/post'));
		}

		function cleanJSTask(){
				return del(['./js/main.min.js']);
		}

		function jsTask(){
			gulp.src(['src/js/**', './node_modules/babel-polyfill/dist/polyfill.js'])
				.pipe(order([
					'vendor/*js'
				]))
				.pipe(concat('main.min.js'))
				.pipe(babel({
					presets: ['es2015']
				}))
				//.pipe(uglify().on('error', function(e){
				//	console.log(e);
				//}))
				.pipe(gulp.dest(paths.build.js));
		}

		function defaultTask(){
			gulp.watch(paths.src.css, ['css', 'sasslint']);
			gulp.watch(paths.src.js, ['js']);
		}

		function cssLint(){
			gulp.src('./css/*.css')
				.pipe(csslint(options.csslint))
				.pipe(csslint.formatter());
		}

		function sassTask(){
			gulp.src(['Sources/css/**', '!Sources/css/Vendors/*', '!Sources/css/Base/_typography.scss'])
				.pipe(sassLint(options.sassLint))
				.pipe(sassLint.format())
				.pipe(sassLint.failOnError())
		}

		gulp.task('clean-css', cleanCSSTask);
		gulp.task('postCss', cssPost);
		gulp.task('css', ['clean-css'], cssTask);
		gulp.task('clean-js', cleanJSTask);
		gulp.task('js', ['clean-js'], jsTask);
		gulp.task('default', ['css', 'js', 'sasslint'], defaultTask);
		//gulp.task('default', ['css', 'sasslint'], defaultTask);

		gulp.task('sasslint', sassTask);
		gulp.task('csslint', cssLint);
})();
