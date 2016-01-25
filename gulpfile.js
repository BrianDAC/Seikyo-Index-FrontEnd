var gulp        = require('gulp'),
    browserSync = require('browser-sync'),
    sass        = require('gulp-sass'),
    reload      = browserSync.reload,
    bower       = require('gulp-bower'),
    naturalsort = require('gulp-natural-sort'),
    filesort    = require('gulp-angular-filesort'),
    inject      = require('gulp-inject'),
    merge       = require('merge-stream'),
    watch       = require('gulp-watch'),
    rename      = require('gulp-rename'),
    usemin      = require('gulp-usemin'),
    uglify      = require('gulp-uglify'),
    minifycss   = require('gulp-minify-css'),
    annotate    = require('gulp-ng-annotate'),
    rev         = require('gulp-rev'),
    plumber     = require('gulp-plumber'),
    wiredep     = require('wiredep').stream;

var globs = {
    sass: 'app/styles/**/*.scss',
    css: 'app/styles/**/*.css',
    html: 'app/**/*.html',
    js: 'app/scripts/**/*.js',
    assets: [
        'app/fonts/**/*',
        'app/images/**/*',
        'app/workers/**/*',
        'app/views/**/*'
    ]
};

var fontExts = ['eot', 'ttf', 'woff', 'woff2', 'otf'];

var compileSass = function () {
    return gulp.src(globs.sass)
        .pipe(plumber())
        .pipe(sass())
        .pipe(gulp.dest('app/styles'))
        .pipe(reload({ stream: true }));
};

gulp.task('bower-install', function () {
    return bower({ cmd: 'install', directory: 'app/bower_components' })
        .pipe(gulp.dest('app/bower_components'));
});

gulp.task('bower-update', ['bower-install'], function () {
    return bower({ cmd: 'update', directory: 'app/bower_components' })
        .pipe(gulp.dest('app/bower_components'));
});

var injectFiles = function () {
    var js = gulp.src(globs.js)
        .pipe(plumber())
        .pipe(filesort());
    var css = gulp.src(globs.css);
    return gulp.src('index.html')
        .pipe(inject(merge(js, css), {
            ignorePath: 'app',
            relative: true,
            addRootSlash: true
        }))
        .pipe(wiredep({
            directory: 'app/bower_components',
            ignorePath: 'app'
        }))
        .pipe(rename('index.html'))
        .pipe(gulp.dest('app/'));
};

gulp.task('inject-index', ['bower-install', 'sass'], injectFiles);

gulp.task('inject-sass', ['bower-install'], function () {
    return gulp.src(globs.sass)
        .pipe(wiredep({
            ignorePath: 'app',
            directory: 'app/bower_components',
            bowerJson: require('./bower.json')
        }))
        .pipe(gulp.dest('app/styles'));
});

gulp.task('sass', ['inject-sass'], compileSass);

gulp.task('inject', ['inject-sass', 'inject-index']);

gulp.task('fonts', ['bower-install'], function () {
    return gulp.src(fontExts.map(function (ext) {
        return 'app/bower_components/**/*.' + ext;
    }))
    .pipe(rename({
        dirname: ''
    }))
    .pipe(gulp.dest('app/fonts/vendor'));
});

gulp.task('serve', ['inject', 'fonts'], function () {
    browserSync({
        server: {
            baseDir: 'app'
        },
        port: 5000,
        ui: {
            port: 5001
        }
    });

    gulp.watch('bower.json', ['inject', 'fonts']);

    watch(globs.js, function (vinyl) {
        if (vinyl.event !== 'change') {
            injectFiles();
        } else {
            reload();
        }
    });

    gulp.watch(globs.sass)
        .on('change', compileSass);
    gulp.watch(globs.html)
        .on('change', reload);
    gulp.watch('index.html')
        .on('change', injectFiles);
});

gulp.task('mv', ['fonts', 'usemin'], function () {
    return gulp.src(globs.assets, { base: 'app' })
        .pipe(gulp.dest('dist/'));
});

gulp.task('install', ['inject', 'bower-install']);

gulp.task('update', ['inject', 'bower-update']);

gulp.task('usemin', ['install'], function () {
    return gulp.src('app/index.html')
        .pipe(usemin({
            css: [minifycss(), 'concat', rev()],
            app: [annotate(), uglify(), rev()],
            vendor: [uglify(), rev()]
        }))
        .pipe(gulp.dest('dist/'));
});

gulp.task('build', ['usemin', 'mv']);

gulp.task('deploy', ['build'], function () {
    browserSync({
        server: {
            baseDir: 'dist'
        },
        port: 5010,
        ui: {
            port: 5011
        }
    });
})

gulp.task('default', ['serve']);
