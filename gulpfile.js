var gulp = require('gulp');

var jshint = require('gulp-jshint');
var csslint = require('gulp-csslint');
var plumber = require('gulp-plumber');
var connect = require('gulp-connect');

// Under certain circumstances jshint can cause watch
// to stop watching and cause gulp to exit. Plumber is
// designed to "Prevent pipe breaking caused by errors
// from gulp plugins".
var plumberOptions = {
  handleError: function(err) {
    console.error(err);
    this.emit('end');
  }
}
// The js task  runs the gulp-jshint plugin
// over the javascript files in the project.
// jshint can help the developer catch syntax
// errors and other problems before running in
// the browser.
gulp.task('js', function() {
  return gulp.src('app/script/**/*.js')
    .pipe(plumber(plumberOptions))
    .pipe(jshint())
    .pipe(jshint.reporter('default'))
    .pipe(connect.reload());
});
// The css task runs the css lint gulp plugin.
// csslint helps the developer identify CSS
// typos before the CSS makes it to the browser.
gulp.task('css', function() {
  return gulp.src('app/css/*.css')
    .pipe(plumber(plumberOptions))
    .pipe(csslint({
      'compatible-vendor-prefixes':false,
      'overqualified-elements':false,
      'box-sizing': false
    }))
    .pipe(csslint.reporter())
    .pipe(connect.reload());
});
// For completeness, there is a html task,
// You could add a linter or minifyer here,
// but for now, it triggers a browser reload
// if the html changes.
gulp.task('html', function(){
  return gulp.src('app/*.html')
    .pipe(plumber(plumberOptions))
    .pipe(connect.reload());
});
// The connect task spins up a simple static
// development web server to serve our website.
// We also enabled live-reload, which injects a
// small amount of script into the root page that
// triggers the browser to reload whenever we change
// a source file.
gulp.task('connect', function(){
  return connect.server({
    root: [ 'app' ],
    port: 8000,
    livereload: true
  });
});
// The watch task is configured to invoke the
// above linter tasks when source code changes
// occur, this in-turn causes the live-reload
// feature of gulp-connect to be invoked.
gulp.task('watch', function() {
    gulp.watch('app/script/*.js', ['js']);
    gulp.watch('app/css/*.css', ['css']);
    gulp.watch('app/*.html', ['html']);
});
// The default taks ties everything together,
// running a preliminary linting over the source
// code and then spinning up the dev web server and
// watching for any changes...
gulp.task('default', ['html', 'js', 'css', 'connect', 'watch']);
