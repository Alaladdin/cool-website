const gulp = require('gulp');
const changed = require('gulp-changed');
const uglify = require('gulp-uglify-es').default;
const chalk = require('chalk');
const imagemin = require('gulp-imagemin');
const autoprefixer = require('autoprefixer');
const postcss = require('gulp-postcss');
const clean = require('gulp-clean');
const plumber = require('gulp-plumber');
const webserver = require('gulp-server-livereload');
const pug = require('gulp-pug');
const sass = require('gulp-sass');

const rootDest = './dist';
const devRootDest = './src';

//  Server
gulp.task('webserver', () => {
  gulp.src(rootDest)
    .pipe(webserver({
      port: 3000,
      livereload: true,
      open: true,
    }));
});

// Pug compiler
gulp.task('pug', () => gulp.src(`${devRootDest}/pug/*.pug`)
  .pipe(changed(rootDest, {
    extension: '.html',
  }))
  .pipe(plumber())
  .pipe(pug())
  .on('error', (err) => console.error(chalk.bgRed(`Pug Compile Error.\n ${err}`)))
  .pipe(gulp.dest(rootDest)));

// Sass compiler
gulp.task('sass', () => gulp.src([`${devRootDest}/scss/**.scss`, `${devRootDest}//scss/**.sass`])
  .pipe(plumber())
  .pipe(sass({ outputStyle: 'compressed' }))
  .pipe(postcss([autoprefixer()]))
  .on('error', (err) => console.error(chalk.bgRed(`Sass Compile Error.\n ${err}`)))
  .pipe(gulp.dest(`${rootDest}/css/`)));

// Scripts
gulp.task('scripts', () => gulp.src([`${devRootDest}/js/**.js`])
  .pipe(plumber())
  .pipe(uglify(
    {
      parse: {
        bare_returns: true,
      },
      sourceMap: {
        filename: 'out.js',
        url: 'out.js.map',
      },
    },
  ))
  .on('error', (err) => console.error(chalk.bgRed(`JS Task Error.\n ${err}`)))
  .pipe(gulp.dest(`${rootDest}/js/`)));

//  Optimize Images
gulp.task('imagemin', () => gulp.src(`${devRootDest}/res/**`)
  .pipe(plumber())
  .pipe(changed(`${rootDest}/res/`, { extension: '.png' }))
  .pipe(changed(`${rootDest}/res/`, { extension: '.jpg' }))
  .pipe(changed(`${rootDest}/res/`, { extension: '.svg' }))
  .pipe(imagemin([
    imagemin.mozjpeg({ quality: 75, progressive: true }),
    imagemin.optipng({ optimizationLevel: 5 }),
    imagemin.svgo({
      plugins: [
        { removeViewBox: true },
        { cleanupIDs: true },
      ],
    }),
  ]))
  .pipe(gulp.dest(`${rootDest}/res/`)));

//  Watch
gulp.task('watch', () => {
  gulp.watch([`${devRootDest}/scss/**`, `${devRootDest}/scss/*.sass`], gulp.series(['sass']));
  gulp.watch(`${devRootDest}/pug/**`, gulp.series(['pug']));
  gulp.watch(`${devRootDest}/js/**`, gulp.series(['scripts']));
  gulp.watch([`${devRootDest}/res/photos/**`, `${devRootDest}/res/icons/**`],
    gulp.series(['imagemin']));
});

// Clean dist directory
gulp.task('clean', () => gulp.src(rootDest)
  .on('error', () => console.error(chalk.bgRed('Clean Error')))
  .pipe(clean()));

//  Compile All
gulp.task('compile', gulp.parallel(['pug', 'sass', 'scripts']));

gulp.task('build', gulp.series(['clean', 'compile', 'imagemin']));

// Main Task
gulp.task('default', gulp.series(['compile', 'imagemin'], gulp.parallel(['webserver', 'watch'])));
