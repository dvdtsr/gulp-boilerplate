const gulp = require("gulp");
const sass = require("gulp-sass");
const postcss = require("gulp-postcss");
const browserSync = require("browser-sync").create();
const autoprefixer = require("autoprefixer");
const concat = require("gulp-concat");
const jshint = require("gulp-jshint");
const browserify = require("gulp-browserify");
const stylish = require("jshint-stylish");



gulp.task("default", ["sass", "js"], () => {

  browserSync.init({
    server: {
      baseDir: "./"
    }
  });

  gulp.watch("./*.html").on("change", browserSync.reload);

  gulp.watch("./scripts/*.js", ["js"]);

  gulp.watch("./src/scss/**/*.scss", ["sass"]);
});

gulp.task("js", () => {
  return gulp.src("./scripts/*.js")
    .pipe(jshint())
    .pipe(jshint.reporter("jshint-stylish"))
    .pipe(browserify())
    .pipe(concat("bundles.js"))
    .pipe(gulp.dest("./dist/scripts/"))
    .pipe(browserSync.stream());
});

gulp.task("sass", () => {
  return gulp.src("./src/scss/**/*.scss")
    .pipe(sass().on("error", sass.logError))

    .pipe(postcss([autoprefixer({
      browsers: ["last 2 versions"]
    })]))

    .pipe(gulp.dest("./dist/css"))

    .pipe(browserSync.stream());
});
