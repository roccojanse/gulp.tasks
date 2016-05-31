module.exports = function(config, gulp, plugins) {
    gulp.task('server', function() {
        plugins.connect.server({
            root: './static/',
            livereload: true
        });
    });
};