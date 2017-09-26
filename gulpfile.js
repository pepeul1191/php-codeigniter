var gulp = require('gulp');
var uglify = require('gulp-uglify');
var concatCss = require('gulp-concat-css');
var concatJs = require("gulp-concat");
var minifyCss = require("gulp-minify-css");
var replace = require('gulp-replace');
var plumber = require('gulp-plumber');
var watch = require('gulp-watch');
var livereload = require('gulp-livereload');
var BASE_URL = 'http://localhost/codeigniter/public/';
var DESTINO = 'public/dist/';
var MEDIA = 'public/'

// -----------------------------------
function errorLog(error){
    console.error.bind(error);
    this.emit('end');
}
// -----------------------------------------

gulp.task('fonts', function() {
    gulp.src([
        MEDIA + 'bower_components/font-awesome/fonts/*', 
        MEDIA + 'bower_components/bootstrap/fonts/*', 
        MEDIA + 'assets/fontastic/fonts/*'
    ])
    .pipe(plumber())
    .pipe(gulp.dest(DESTINO));
});

gulp.task('layout-css', function() {
    gulp.src([
        MEDIA + 'bower_components/bootstrap/dist/css/bootstrap.min.css', 
        MEDIA + 'bower_components/font-awesome/css/font-awesome.min.css', 
        MEDIA + 'assets/fontastic/styles.css', 
        MEDIA + 'assets/site/styles.css'
    ])
    .pipe(plumber())
    .pipe(concatCss('styles.min.css'))
    .pipe(minifyCss())
    .pipe(replace('../../../font-awesome/fonts/', BASE_URL + 'dist/'))
    .pipe(replace('../../../../assets/fontastic/fonts', BASE_URL + 'dist/'))
    .pipe(replace('../fonts/glyphicons', 'glyphicons'))
    .pipe(gulp.dest(DESTINO));
});

gulp.task('layout-js', function() {
    gulp.src([
        MEDIA + 'bower_components/jquery/dist/jquery.min.js', 
        MEDIA + 'bower_components/bootstrap/dist/js/bootstrap.min.js', 
        MEDIA + 'bower_components/underscore/underscore-min.js',
        MEDIA + 'bower_components/backbone/backbone-min.js', 
        MEDIA + 'bower_components/backbone.marionette/lib/backbone.marionette.min.js', 
        MEDIA + 'bower_components/handlebars/handlebars.min.js'])
    .pipe(plumber())
    .pipe(concatJs('libs.min.js'))
    .pipe(gulp.dest(DESTINO));
});

gulp.task('swp-plugins', function(){
    gulp.src([
    		MEDIA + 'bower_components/swp-plugins/assets/js/mootools-core.min.js', 
    		MEDIA + 'bower_components/swp-plugins/assets/js/mootools.min.js', 
    		MEDIA + 'bower_components/swp-plugins/assets/js/mootools-interfaces.min.js', 
    		MEDIA + 'bower_components/swp-plugins/assets/js/jquery.upload.js', 
    		MEDIA + 'bower_components/swp-plugins/assets/js/mootools.chain.js', 
    		MEDIA + 'bower_components/swp-plugins/assets/js/mootools.dao.js', 
    		MEDIA + 'bower_components/swp-plugins/assets/js/mootools.autocomplete.js', 
    		MEDIA + 'bower_components/swp-plugins/assets/js/mootools.form.js', 
    		MEDIA + 'bower_components/swp-plugins/assets/js/mootools.observer.js', 
    		MEDIA + 'bower_components/swp-plugins/assets/js/mootools.grid.js'
    		])
     .pipe(plumber())
     .pipe(concatJs('swp.js'))
     .pipe(gulp.dest(DESTINO));

     gulp.src([
    	 	MEDIA + 'bower_components/swp-plugins/assets/css/mootools.autocomplete.css', 
    	 	MEDIA + 'bower_components/swp-plugins/assets/css/mootools.grid.css', 
    	 	MEDIA + 'bower_components/swp-plugins/assets/css/mootools.validations.css'])
     .pipe(plumber())
     .pipe(concatCss('swp.css'))
     .pipe(gulp.dest(DESTINO));
});

gulp.task('layout', ['fonts', 'layout-css', 'layout-js']);

// -----------------------------------------

gulp.task('error-css', function() {
    gulp.src([
        MEDIA + 'bower_components/bootstrap/dist/css/bootstrap.min.css',
        MEDIA + 'bower_components/font-awesome/css/font-awesome.min.css', 
        MEDIA + 'assets/fontastic/styles.css', 
        MEDIA + 'assets/error/index.css'])
    .pipe(plumber())
    .pipe(concatCss('error.min.css'))
    .pipe(minifyCss())
    .pipe(replace('../../../font-awesome/fonts/', BASE_URL + 'dist/assets/'))
    .pipe(replace('../../../assets/fontastic/fonts/', 'assets/'))
    .pipe(gulp.dest(DESTINO));
});

gulp.task('login', function(){
    gulp.start('fonts', 'layout-css', 'layout-js');

    gulp.src([
        MEDIA + 'bower_components/jquery/dist/jquery.min.js', 
        MEDIA + 'bower_components/handlebars/handlebars.min.js',
        MEDIA + 'layouts/blank.js'])
    //.pipe(uglify())
    .pipe(plumber())
    .pipe(concatJs('login.min.js'))
    .pipe(gulp.dest(DESTINO))//.pipe(gulp.dest(DESTINO + 'home'))
    .pipe(livereload());

    gulp.src([
        DESTINO + 'styles.min.css',
        MEDIA + 'assets/login/index.css'])
    .pipe(plumber())
    .pipe(concatCss('login.min.css'))
    //.pipe(minifyCss())
    .pipe(gulp.dest(DESTINO));
});

gulp.task('app', function(){
    gulp.start('fonts', 'layout-css', 'layout-js');
    gulp.src([
        DESTINO + 'libs.min.js',  
        MEDIA + 'layouts/site.js',  
        MEDIA + 'models/usuario.js', 
        MEDIA + 'views/home.js', 
        MEDIA + 'views/buscar.js', 
        MEDIA + 'views/contacto.js',  
        MEDIA + 'views/registro.js', 
        MEDIA + 'views/_form_registro.js', 
        MEDIA + 'views/login.js', 
        MEDIA + 'views/_form_login.js' , 
        MEDIA + 'views/_form_contrasenia.js' ,
        MEDIA + 'routes/router.js'])
    //.pipe(uglify())
    .pipe(plumber())
    .pipe(concatJs('app.min.js'))
    .pipe(gulp.dest(DESTINO))//.pipe(gulp.dest(DESTINO + 'home'))
    .pipe(livereload());
});

gulp.task('libros', function(){
    gulp.start('fonts', 'layout-css', 'layout-js', 'swp-plugins');
    gulp.src([
        DESTINO + 'libs.min.js',  
        DESTINO + 'swp.js',
        MEDIA + 'layouts/app.js',  
        //MEDIA + 'views/libros/_table_libro.js', 
        MEDIA + 'views/libros/_table_autor.js', 
        MEDIA + 'views/libros/_table_categoria.js', 
        //MEDIA + 'views/libros/libro.js',  
        MEDIA + 'views/libros/autor.js', 
        MEDIA + 'views/libros/categoria.js', 
        MEDIA + 'routes/libros.js'
    ])
    //.pipe(uglify())
    .pipe(plumber())
    .pipe(concatJs('libros.min.js'))
    .pipe(gulp.dest(DESTINO))//.pipe(gulp.dest(DESTINO + 'home'))
    .pipe(livereload());

    gulp.src([
        DESTINO + 'styles.min.css', 
        DESTINO + 'swp.css'
    ])
    .pipe(plumber())
    .pipe(concatCss('libros.min.css'))
    .pipe(gulp.dest(DESTINO));
  });