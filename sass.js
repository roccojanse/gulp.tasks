module.exports = function(config, gulp, plugins) {
    
    gulp.task('sass', function() {
        var sassFiles = plugins.rubySass(config.paths.css.src + '**/*.scss', {
                style: 'expanded',
                defaultEncoding: 'utf-8',
                unixNewlines: false,
                stopOnError: true,
                cacheLocation: config.srcRoot + '.sass-cache/',
                precision: 4,
                sourcemap: true,
                compass: true
            })
            .on('error', function(err) {
                new plugins.gutil.PluginError('CSS', err, { showStack: true });
            })    
            .pipe(plugins.autoprefixer('last 3 version'))
            .pipe(gulp.dest(config.paths.css.dest));
        
        return plugins.es.pipe(sassFiles)
            .pipe(plugins.sourcemaps.init({ loadMaps: true, includeContent: false, sourceRoot: config.paths.css.src }))
            .pipe(plugins.rename({ suffix: '.min' }))
            .pipe(plugins.cssnano({ zindex: false }))
            .pipe(plugins.sourcemaps.write('.'))
            .pipe(gulp.dest(config.paths.css.dest));
    });
};