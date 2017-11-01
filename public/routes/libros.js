/*
Archivos que usa :
	+
*/

var Router = Marionette.AppRouter.extend({
    routes: {
        'email/:email': 'showEmail',
        "" : "index", 
        "categoria" : "categoriaIndex",
        "autor" : "autorIndex",
        "libro" : "libroIndex",
        "libro/crear" : "libroCrear",
        "libro/editar/:id" : "libroEditar",
        "libro/ver/:id" : "libroVer",
        "*actions" : "index"
    },
    showEmail: function(email) {
        // show the email
        alert(email);
    },
    categoriaIndex: function(){
        var categoriaView = new CategoriaView({});
        categoriaView.render();
        categoriaView.mostrarTabla();
    },
    autorIndex: function(){
        var autorView = new AutorView({});
        autorView.render();
        autorView.mostrarTabla();
    },
    libroIndex: function(){
        var buscarView = new BuscarView({});
        buscarView.render();
    },
    libroCrear: function(){
        var buscarView = new BuscarView({});
        buscarView.render();
    },
    libroEditar: function(id){
        var buscarView = new BuscarView({});
        buscarView.render();
    },
    libroVer: function(id){
        var buscarView = new BuscarView({});
        buscarView.render();
    },
});
    
const App = Marionette.Application.extend({
    region: '#body-app',
    onStart() {
        var router = new Router();
        Backbone.history.start();
    }
});

const myApp = new App();
myApp.start();