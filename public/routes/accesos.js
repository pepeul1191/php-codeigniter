/*
Archivos que usa :
	+
*/

var Router = Marionette.AppRouter.extend({
    routes: {
        'email/:email': 'showEmail',
        "" : "index", 
        "sistema" : "sistemaIndex",
        "accesos/sistemas/menu/:sistema_id" : "showSistemaMenu",
        "accesos/sistemas/permiso/:sistema_id" : "showSistemaPermiso",
        "accesos/sistemas/rol/:sistema_id" : "showSistemaRol",
        "accesos/usuario/logs/:usuario_id" : "showUsuarioLog",
        "accesos/usuario/editar/:usuario_id" : "showUsuarioDetalle", 
        "accesos/usuario/sistemas/:usuario_id" : "showUsuarioSistemas", 
        "accesos/usuario/roles_permisos/:usuario_id" : "showUsuarioRolesPermisos", 
        "usuario" : "usuarioIndex",
        "*actions" : "index"
    },
    showEmail: function(email) {
        // show the email
        alert(email);
    },
    sistemaIndex: function(){
        var sistemaView = new SistemaView({});
        sistemaView.render();
        sistemaView.mostrarTabla();
    },
    usuarioIndex: function(){
        var usuarioView = new UsuarioView({});
        usuarioView.render();
        usuarioView.mostrarTabla();
    },
    showSistemaMenu: function(sistema_id){
        var menuView = new MenuView({});
        menuView.render();
        $("#txtIdeSistema").html(sistema_id);
        menuView.mostrarTabla(sistema_id);
    },
    showSistemaPermiso: function(sistema_id){
        var permisoView = new PermisoView({});
        permisoView.render();
        $("#txtIdeSistema").html(sistema_id);
        permisoView.mostrarTabla(sistema_id);
    },
    showSistemaRol: function(sistema_id){
        var rolView = new RolView({});
        rolView.render();
        $("#txtIdeSistema").html(sistema_id);
        rolView.mostrarTabla(sistema_id);
    },
    showUsuarioLog: function(usuario_id){
        var logView = new LogView({});
        logView.render();
        logView.mostrarTabla(usuario_id);
    },
    showUsuarioDetalle: function(usuario_id){
        var usuarioDetalleView = new UsuarioDetalleView({});
        usuarioDetalleView.render(usuario_id);
        $("#idUsuario").html(usuario_id);
    },
    showUsuarioSistemas: function(usuario_id){
        var usuarioSistemaView = new UsuarioSistemaView({});
        usuarioSistemaView.render(usuario_id);
        $("#idUsuario").html(usuario_id);
        usuarioSistemaView.mostrarTabla(usuario_id);
    },
    showUsuarioRolesPermisos: function(usuario_id){
        var usuarioRolPermisoView = new UsuarioRolPermisoView({});
        usuarioRolPermisoView.render(usuario_id);
        $("#idUsuario").html(usuario_id);
        //usuarioDetalleView.mostrarTabla(usuario_id);
    },
});
    
var App = Marionette.Application.extend({
    region: '#body-app',
    onStart() {
        var router = new Router();
        Backbone.history.start();
    }
});

var myApp = new App();
myApp.start();