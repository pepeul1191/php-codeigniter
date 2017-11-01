/*
Archivos que usa :
	+ views/buscar.js
	+ views/contacto.js
	+ views/registro.js
	+ views/login.js
*/

var Router = Marionette.AppRouter.extend({
routes: {
    'email/:email': 'showEmail',
    "" : "showHome", 
	"buscar" : "showBuscar",
	"contacto" : "showContacto",
	"registro" : "showRegistro",
	"login" : "showLogin", 
	"*actions" : "showHome"
  },
  showEmail: function(email) {
    // show the email
    alert(email);
  },
  	showHome: function(){
		var homeView = new HomeView({});
		homeView.render();
	},
	showBuscar: function(){
		var buscarView = new BuscarView({});
		buscarView.render();
	},
	showContacto: function(){
		//var contactoView = new ContactoView({});
		//contactoView.render();
		$('html, body').animate({
            scrollTop: $("#contacto").offset().top
        }, 1000);
	},
	showRegistro: function(){
		var registroView = new RegistroView({});
		registroView.render();
	},
	showLogin: function(){
		var loginView = new LoginView({});
		loginView.render();
	}
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